// lib/prompts/profile-builder.ts
// Builds the BUSINESS_PROFILE string injected into base.ts Block 3
// Called server-side before each API request
// Data sourced from Supabase: user_profiles + session_history + insights

export interface BusinessProfile {
  // Core identity
  userId: string
  name: string
  companyName?: string
  sector?: string
  teamSize?: number
  annualRevenue?: string         // e.g. "$300K-$500K"
  yearsOperating?: number
  language: string               // BCP-47 locale code

  // Vision state
  currentVision?: string         // The validated vision statement if established
  visionScore?: number           // How many of Kantabutra's 7 attributes are present (0-7)
  visionWeakAttributes?: string[] // Which attributes need work

  // Founder's Mentality state
  detectedCrisis?: 'overload' | 'stall_out' | 'free_fall' | null
  primaryErodedTrait?: 'insurgent_mission' | 'frontline_obsession' | 'owners_mindset' | null

  // McKinsey state
  absentBehaviors?: string[]     // Which of the 5 behaviors are absent
  primaryInfluencerLever?: 'tell_me' | 'show_me' | 'guide_me' | 'teach_me' | null

  // Balanced Scorecard state
  hasLeadingIndicators?: boolean
  scorecardBuilt?: boolean
  reviewCadenceEstablished?: boolean

  // Session history
  sessionCount?: number
  lastSessionDate?: string       // ISO date string
  daysSinceLastSession?: number
  previousInsights?: string[]    // Key insights from prior sessions (last 5)
  openCommitments?: string[]     // Actions the user committed to but haven't confirmed completing

  // Progress markers
  completedDeliverables?: string[] // e.g. ["vision_statement", "delegation_map"]
}

export function buildBusinessProfile(profile: BusinessProfile): string {
  const {
    name, companyName, sector, teamSize, annualRevenue, yearsOperating,
    currentVision, visionScore, visionWeakAttributes,
    detectedCrisis, primaryErodedTrait,
    absentBehaviors, primaryInfluencerLever,
    hasLeadingIndicators, scorecardBuilt, reviewCadenceEstablished,
    sessionCount, lastSessionDate, daysSinceLastSession,
    previousInsights, openCommitments, completedDeliverables
  } = profile

  const lines: string[] = []

  // Core identity
  lines.push(`Name: ${name}`)
  lines.push(`Company: ${companyName || 'unknown'}`)
  lines.push(`Sector: ${sector || 'unknown'}`)
  lines.push(`Team size: ${teamSize ? `${teamSize} people` : 'unknown'}`)
  lines.push(`Annual revenue: ${annualRevenue || 'unknown'}`)
  lines.push(`Years operating: ${yearsOperating ? `${yearsOperating} years` : 'unknown'}`)

  // Vision state
  lines.push('')
  lines.push('── VISION STATE ──')
  if (currentVision) {
    lines.push(`Established vision: "${currentVision}"`)
    lines.push(`Kantabutra score: ${visionScore}/7 attributes present`)
    if (visionWeakAttributes && visionWeakAttributes.length > 0) {
      lines.push(`Attributes needing work: ${visionWeakAttributes.join(', ')}`)
    }
  } else {
    lines.push('Vision: not yet established or validated')
  }

  // Founder's Mentality state
  lines.push('')
  lines.push('── FOUNDER\'S MENTALITY STATE ──')
  if (detectedCrisis) {
    lines.push(`Detected crisis: ${formatCrisis(detectedCrisis)}`)
  } else {
    lines.push('Crisis type: not yet diagnosed')
  }
  if (primaryErodedTrait) {
    lines.push(`Primary eroded trait: ${formatTrait(primaryErodedTrait)}`)
  }

  // McKinsey state
  lines.push('')
  lines.push('── McKINSEY SCALING STATE ──')
  if (absentBehaviors && absentBehaviors.length > 0) {
    lines.push(`Absent scaling behaviors: ${absentBehaviors.join(', ')}`)
  } else {
    lines.push('Scaling behaviors: not yet assessed')
  }
  if (primaryInfluencerLever) {
    lines.push(`Primary influence lever needed: ${formatLever(primaryInfluencerLever)}`)
  }

  // Balanced Scorecard state
  lines.push('')
  lines.push('── MEASUREMENT SYSTEM STATE ──')
  lines.push(`Has leading indicators: ${hasLeadingIndicators ? 'yes' : 'no — only lagging metrics'}`)
  lines.push(`Scorecard built: ${scorecardBuilt ? 'yes' : 'no'}`)
  lines.push(`Review cadence established: ${reviewCadenceEstablished ? 'yes' : 'no'}`)

  // Session history
  lines.push('')
  lines.push('── SESSION HISTORY ──')
  lines.push(`Total sessions: ${sessionCount || 0}`)
  if (daysSinceLastSession !== undefined && lastSessionDate) {
    lines.push(`Last session: ${daysSinceLastSession === 0 ? 'today' : `${daysSinceLastSession} days ago`}`)
  } else {
    lines.push('Last session: unknown')
  }

  if (previousInsights && previousInsights.length > 0) {
    lines.push('')
    lines.push('Key insights from previous sessions:')
    previousInsights.slice(0, 5).forEach(insight => {
      lines.push(`  - ${insight}`)
    })
  }

  if (openCommitments && openCommitments.length > 0) {
    lines.push('')
    lines.push('Open commitments (actions user agreed to, not yet confirmed):')
    openCommitments.forEach(commitment => {
      lines.push(`  → ${commitment}`)
    })
  }

  if (completedDeliverables && completedDeliverables.length > 0) {
    lines.push('')
    lines.push(`Completed deliverables: ${completedDeliverables.join(', ')}`)
  }

  return lines.join('\n')
}

function formatCrisis(crisis: string): string {
  const map: Record<string, string> = {
    'overload': 'Overload — founder trapped in operations, complexity outpacing systems',
    'stall_out': 'Stall-out — company lost its early energy and mission clarity, revenue plateau',
    'free_fall': 'Free Fall — core business model no longer working'
  }
  return map[crisis] || crisis
}

function formatTrait(trait: string): string {
  const map: Record<string, string> = {
    'insurgent_mission': 'Insurgent Mission — mission diluted, company lost its sense of battle',
    'frontline_obsession': 'Frontline Obsession — disconnected from customers and frontline reality',
    'owners_mindset': 'Owner\'s Mindset — slow decisions, bureaucracy growing, cash discipline weak'
  }
  return map[trait] || trait
}

function formatLever(lever: string): string {
  const map: Record<string, string> = {
    'tell_me': 'Tell Me — team lacks conviction about why the behavior matters',
    'show_me': 'Show Me — leader not modeling the behavior themselves',
    'guide_me': 'Guide Me — systems reward old behavior, making change structurally hard',
    'teach_me': 'Teach Me — team lacks the capability, not just the motivation'
  }
  return map[lever] || lever
}
