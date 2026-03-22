// app/api/assistant/session/route.ts
// Opens and closes sessions, saves summaries and insights

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// ── POST: close a session and save summary ────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { sessionId, summary, rootCauseIdentified, frameworkConceptApplied, actionAssigned } =
      await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Count messages in this session for duration estimate
    const { count: messageCount } = await supabase
      .from('conversation_messages')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', sessionId)

    // Close the session
    const { error } = await supabase
      .from('sessions')
      .update({
        ended_at:                   new Date().toISOString(),
        session_summary:            summary ?? null,
        root_cause_identified:      rootCauseIdentified ?? null,
        framework_concept_applied:  frameworkConceptApplied ?? null,
        action_assigned:            actionAssigned ?? null,
        insights_count:             messageCount ? Math.floor(messageCount / 4) : 0,
      })
      .eq('id', sessionId)
      .eq('user_id', user.id)

    if (error) throw new Error(`Failed to close session: ${error.message}`)

    return NextResponse.json({ success: true })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Session close error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// ── PATCH: save an insight detected during a session ──────────────────────────
export async function PATCH(request: NextRequest) {
  try {
    const { sessionId, frame, insightType, content } = await request.json()

    if (!sessionId || !frame || !insightType || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('insights')
      .insert({
        user_id:      user.id,
        session_id:   sessionId,
        frame,
        insight_type: insightType,
        content,
        is_active:    true,
      })

    if (error) throw new Error(`Failed to save insight: ${error.message}`)

    return NextResponse.json({ success: true })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Insight save error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// ── PUT: save a commitment made during a session ──────────────────────────────
export async function PUT(request: NextRequest) {
  try {
    const { sessionId, action, frame, dueWithinHours } = await request.json()

    if (!sessionId || !action || !frame) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('commitments')
      .insert({
        user_id:          user.id,
        session_id:       sessionId,
        action,
        frame,
        due_within_hours: dueWithinHours ?? 72,
        status:           'pending',
      })

    if (error) throw new Error(`Failed to save commitment: ${error.message}`)

    return NextResponse.json({ success: true })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Commitment save error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
