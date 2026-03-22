// lib/prompts/index.ts
// Visionari Prompt System — Main Export
// Orchestrates detection + profile + frame into a complete API call

export { DETECTION_PROMPT, type DetectionResult, type PrimaryFrame, type SessionMode } from './detection'
export { buildBasePrompt } from './base'
export { buildVisionBlock } from './vision'
export { buildFoundersBlock } from './founders'
export { buildMcKinseyBlock } from './mckinsey'
export { buildScorecardBlock } from './scorecard'
export { buildBusinessProfile, type BusinessProfile } from './profile-builder'

// ─── HOW TO USE ───────────────────────────────────────────────────────────────
//
// STEP 1: On user's first message → run detection
//
// const detectionResponse = await fetch('https://api.anthropic.com/v1/messages', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     model: 'claude-sonnet-4-20250514',
//     max_tokens: 100,
//     messages: [{ role: 'user', content: DETECTION_PROMPT + '\n\nUser message: ' + userMessage }]
//   })
// })
// const { primaryFrame, visionFlag, sessionMode } = JSON.parse(detectionResponse.content[0].text)
//
// STEP 2: Build business profile from Supabase
//
// const profileData = await supabase.from('user_profiles').select('*').eq('id', userId).single()
// const businessProfile = buildBusinessProfile(profileData)
//
// STEP 3: Build the complete system prompt
//
// const systemPrompt = buildBasePrompt(
//   businessProfile,
//   primaryFrame,
//   sessionMode,
//   getLanguageName(locale),
//   visionFlag,
//   profileData.current_vision
// )
//
// STEP 4: Call Claude API with complete prompt + conversation history
//
// const response = await fetch('https://api.anthropic.com/v1/messages', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     model: 'claude-sonnet-4-20250514',
//     max_tokens: 1000,
//     system: systemPrompt,
//     messages: buildConversationHistory(userMessage, conversationHistory)
//   })
// })
//
// ─── LANGUAGE MAPPING ─────────────────────────────────────────────────────────

export function getLanguageName(locale: string): string {
  const names: Record<string, string> = {
    'es': 'Spanish',
    'en': 'English',
    'pt': 'Portuguese',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'nl': 'Dutch',
    'pl': 'Polish',
    'no': 'Norwegian',
    'sv': 'Swedish',
    'ja': 'Japanese',
    'ko': 'Korean',
    'hi': 'Hindi',
    'id': 'Indonesian',
    'ru': 'Russian',
    'tr': 'Turkish'
  }
  return names[locale] || 'English'
}

// ─── CONVERSATION HISTORY BUILDER ─────────────────────────────────────────────
// Keeps last 10 exchanges (20 messages) to manage context window cost
// Older context is preserved in the business profile, not the conversation history

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
}

export function buildConversationHistory(
  currentMessage: string,
  history: Message[]
): Array<{ role: string; content: string }> {
  const recentHistory = history.slice(-20) // last 10 exchanges
  return [
    ...recentHistory.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: currentMessage }
  ]
}
