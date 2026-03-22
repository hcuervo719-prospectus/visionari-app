// app/api/assistant/chat/route.ts
// Main chat endpoint for Visionari assistant
// Handles detection (first message), prompt building, Claude API call, and message persistence

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  DETECTION_PROMPT,
  buildBasePrompt,
  buildBusinessProfile,
  getLanguageName,
  buildConversationHistory,
  type DetectionResult,
  type PrimaryFrame,
  type SessionMode,
  type BusinessProfile,
} from '@/lib/prompts'

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-20250514'

// ─── HELPERS ──────────────────────────────────────────────────────────────────

async function callClaude(
  system: string,
  messages: Array<{ role: string; content: string }>,
  maxTokens = 1000
): Promise<string> {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Claude API error: ${error.error?.message || response.statusText}`)
  }

  const data = await response.json()
  return data.content[0].text
}

async function detectFrame(userMessage: string): Promise<DetectionResult> {
  const detectionMessages = [{
    role: 'user',
    content: `${DETECTION_PROMPT}\n\nUser's opening message:\n"${userMessage}"`
  }]

  const raw = await callClaude('', detectionMessages, 150)

  try {
    // Strip any accidental markdown fences
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean) as DetectionResult
  } catch {
    // Fallback if detection parsing fails
    return {
      primaryFrame: 'founders_mentality',
      visionFlag: false,
      sessionMode: 'diagnostic',
    }
  }
}

async function loadBusinessContext(
  userId: string,
  supabase: any
): Promise<BusinessProfile | null> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, locale')
    .eq('id', userId)
    .single()

  const { data: ctx } = await supabase
    .from('business_context')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!profile) return null

  // Load last 5 active insights
  const { data: insights } = await supabase
    .from('insights')
    .select('content')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(5)

  // Load open commitments
  const { data: commitments } = await supabase
    .from('commitments')
    .select('action')
    .eq('user_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(3)

  // Days since last session
  const { data: lastSession } = await supabase
    .from('sessions')
    .select('started_at')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
    .limit(1)
    .single()

  const daysSinceLastSession = lastSession
    ? Math.floor((Date.now() - new Date(lastSession.started_at).getTime()) / 86400000)
    : undefined

  return {
    userId,
    name: profile.full_name?.split(' ')[0] || 'there',
    language: profile.locale || 'en',
    companyName:              ctx?.company_name ?? undefined,
    sector:                   ctx?.sector ?? undefined,
    teamSize:                 ctx?.team_size ?? undefined,
    annualRevenue:            ctx?.annual_revenue_range ?? undefined,
    yearsOperating:           ctx?.years_operating ?? undefined,
    currentVision:            ctx?.current_vision ?? undefined,
    visionScore:              ctx?.vision_score ?? undefined,
    visionWeakAttributes:     ctx?.vision_weak_attributes ?? [],
    detectedCrisis:           ctx?.detected_crisis ?? null,
    primaryErodedTrait:       ctx?.primary_eroded_trait ?? null,
    absentBehaviors:          ctx?.absent_behaviors ?? [],
    primaryInfluencerLever:   ctx?.primary_influence_lever ?? null,
    hasLeadingIndicators:     ctx?.has_leading_indicators ?? false,
    scorecardBuilt:           ctx?.scorecard_built ?? false,
    reviewCadenceEstablished: ctx?.review_cadence_established ?? false,
    sessionCount:             ctx?.total_sessions ?? 0,
    daysSinceLastSession,
    lastSessionDate:          lastSession?.started_at ?? undefined,
    previousInsights:         insights?.map((i: any) => i.content) ?? [],
    openCommitments:          commitments?.map((c: any) => c.action) ?? [],
    completedDeliverables:    ctx?.completed_deliverables ?? [],
  }
}

async function loadConversationHistory(
  sessionId: string,
  supabase: any
): Promise<Array<{ role: 'user' | 'assistant'; content: string }>> {
  const { data: messages } = await supabase
    .from('conversation_messages')
    .select('role, content')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(20) // last 10 exchanges

  return messages ?? []
}

// ─── MAIN HANDLER ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, isFirstMessage } = await request.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── STEP 1: Detection (first message only) ───────────────────────────────
    let detection: DetectionResult

    if (isFirstMessage) {
      detection = await detectFrame(message)
    } else {
      // Subsequent messages — read detection from session record
      const { data: session } = await supabase
        .from('sessions')
        .select('mode, primary_frame')
        .eq('id', sessionId)
        .single()

      detection = {
        primaryFrame: (session?.primary_frame ?? 'founders_mentality') as PrimaryFrame,
        visionFlag: false,
        sessionMode: (session?.mode ?? 'diagnostic') as SessionMode,
      }
    }

    // ── STEP 2: Load business context ────────────────────────────────────────
    const businessProfile = await loadBusinessContext(user.id, supabase)

    if (!businessProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // ── STEP 3: Build system prompt ──────────────────────────────────────────
    const profileString = buildBusinessProfile(businessProfile)
    const systemPrompt = buildBasePrompt(
      profileString,
      detection.primaryFrame,
      detection.sessionMode,
      getLanguageName(businessProfile.language),
      detection.visionFlag,
      businessProfile.currentVision
    )

    // ── STEP 4: Build conversation history ───────────────────────────────────
    let currentSessionId = sessionId
    let conversationHistory: Array<{ role: string; content: string }> = []

    if (isFirstMessage) {
      // Create new session record
      const { data: newSession, error: sessionError } = await supabase
        .from('sessions')
        .insert({
          user_id:               user.id,
          mode:                  detection.sessionMode,
          primary_frame:         detection.primaryFrame,
          vision_flag_triggered: detection.visionFlag,
          frame_pivots:          [detection.primaryFrame],
          started_at:            new Date().toISOString(),
        })
        .select('id')
        .single()

      if (sessionError || !newSession) {
        throw new Error(`Failed to create session: ${sessionError?.message}`)
      }

      currentSessionId = newSession.id
    } else {
      conversationHistory = await loadConversationHistory(currentSessionId, supabase)
    }

    // ── STEP 5: Call Claude ───────────────────────────────────────────────────
    const messages = buildConversationHistory(message, conversationHistory)
    const assistantResponse = await callClaude(systemPrompt, messages)

    // ── STEP 6: Persist messages ──────────────────────────────────────────────
    await supabase.from('conversation_messages').insert([
      {
        session_id: currentSessionId,
        user_id:    user.id,
        role:       'user',
        content:    message,
      },
      {
        session_id: currentSessionId,
        user_id:    user.id,
        role:       'assistant',
        content:    assistantResponse,
      },
    ])

    // ── STEP 7: Update business_context session counter ───────────────────────
    if (isFirstMessage) {
      const counterField = `${detection.sessionMode}_sessions`
      await supabase.rpc('increment_session_counters', {
        p_user_id:      user.id,
        p_mode_column:  counterField,
      })
    }

    return NextResponse.json({
      response:        assistantResponse,
      sessionId:       currentSessionId,
      primaryFrame:    detection.primaryFrame,
      sessionMode:     detection.sessionMode,
    })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Chat API error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
