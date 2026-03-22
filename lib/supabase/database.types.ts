// lib/supabase/database.types.ts
// Visionari — Database Schema v2.0
// Based on Zerova architecture, adapted for strategic business intelligence

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ─── ENUMS ────────────────────────────────────────────────────────────────────

export type SubscriptionStatus =
  | 'trial'
  | 'active'
  | 'cancelled'
  | 'past_due'
  | 'paused'

export type SessionMode =
  | 'diagnostic'   // User describing a problem, root cause unknown
  | 'working'      // Clear task, co-creating an output
  | 'checkin'      // Light-touch, quick pulse

export type PrimaryFrame =
  | 'vision'              // Marco 1 — Kantabutra & Avery
  | 'founders_mentality'  // Marco 2 — Bain / Zook & Allen
  | 'mckinsey_scaling'    // Marco 3 — OHI / Breaking the Mold
  | 'balanced_scorecard'  // Marco 4 — Kaplan & Norton

export type GrowthCrisis =
  | 'overload'    // Founder trapped in operations, complexity outpacing systems
  | 'stall_out'   // Company lost early energy and mission, revenue plateau
  | 'free_fall'   // Core business model stopped working

export type ErodedTrait =
  | 'insurgent_mission'    // Mission diluted, company lost sense of battle
  | 'frontline_obsession'  // Disconnected from customers and frontline reality
  | 'owners_mindset'       // Slow decisions, bureaucracy growing, cash discipline weak

export type InfluenceLever =
  | 'tell_me'    // Team lacks conviction about why the behavior matters
  | 'show_me'    // Leader not modeling the behavior themselves
  | 'guide_me'   // Systems reward old behavior, making change structurally hard
  | 'teach_me'   // Team lacks capability, not just motivation

export type CommitmentStatus =
  | 'pending'    // User committed, not yet confirmed
  | 'confirmed'  // User confirmed they did it
  | 'dropped'    // User acknowledged they didn't do it

export type DeliverableType =
  | 'vision_statement'      // Validated 7-attribute vision
  | 'delegation_map'        // Decision authority by level
  | 'scorecard'             // BSC minimum viable scorecard
  | 'behavior_plan'         // McKinsey behavior change plan
  | 'strategy_map'          // BSC causal chain
  | 'founders_diagnosis'    // Crisis + eroded trait report

export type MessageRole = 'user' | 'assistant'

// ─── DATABASE INTERFACE ───────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {

      // ── profiles ────────────────────────────────────────────────────────────
      // Core user identity + subscription state
      // Mirrors Zerova structure with business fields added
      profiles: {
        Row: {
          id: string                          // auth.users.id
          email: string
          full_name: string | null
          locale: string                      // BCP-47: 'es', 'en', 'pt', etc. (16 supported)

          // Trial & subscription — identical to Zerova
          trial_started_at: string
          trial_ends_at: string              // trial_started_at + 7 days
          trial_sessions_used: number        // increments each session during trial
          subscription_status: SubscriptionStatus
          subscription_id: string | null     // references subscriptions.id
          subscription_ends_at: string | null

          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          locale?: string
          trial_started_at?: string
          trial_ends_at?: string
          trial_sessions_used?: number
          subscription_status?: SubscriptionStatus
          subscription_id?: string | null
          subscription_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }

      // ── business_context ────────────────────────────────────────────────────
      // The strategic memory of the user's business.
      // Equivalent to Zerova's relational_profiles.
      // This is what the profile-builder.ts reads to construct the injected prompt.
      business_context: {
        Row: {
          id: string
          user_id: string                    // FK → profiles.id

          // Business identity (gathered progressively through conversation)
          company_name: string | null
          sector: string | null              // e.g. 'services', 'tech', 'retail'
          team_size: number | null           // number of employees
          annual_revenue_range: string | null // e.g. '$150K-$300K', '$500K-$1M'
          years_operating: number | null

          // Marco 1 — Vision state
          current_vision: string | null      // The validated vision statement
          vision_score: number | null        // 0-7 Kantabutra attributes present
          vision_weak_attributes: string[]   // Which attributes need work
          vision_is_reactive: boolean        // True if vision frames escape, not construction

          // Marco 2 — Founder's Mentality state
          detected_crisis: GrowthCrisis | null
          primary_eroded_trait: ErodedTrait | null
          crisis_detected_at: string | null  // When the crisis was first identified

          // Marco 3 — McKinsey Scaling state
          absent_behaviors: string[]         // Which of the 5 behaviors are missing
          primary_influence_lever: InfluenceLever | null
          active_behavior_experiment: string | null // Current 48-72h experiment

          // Marco 4 — Balanced Scorecard state
          has_leading_indicators: boolean    // False = only lagging metrics
          scorecard_built: boolean
          review_cadence_established: boolean
          scorecard_metrics: Json | null     // { financial: [], customer: [], processes: [], learning: [] }

          // Session counters (mirrors Zerova pattern)
          total_sessions: number
          diagnostic_sessions: number
          working_sessions: number
          checkin_sessions: number

          // Completed deliverables
          completed_deliverables: DeliverableType[]

          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name?: string | null
          sector?: string | null
          team_size?: number | null
          annual_revenue_range?: string | null
          years_operating?: number | null
          current_vision?: string | null
          vision_score?: number | null
          vision_weak_attributes?: string[]
          vision_is_reactive?: boolean
          detected_crisis?: GrowthCrisis | null
          primary_eroded_trait?: ErodedTrait | null
          crisis_detected_at?: string | null
          absent_behaviors?: string[]
          primary_influence_lever?: InfluenceLever | null
          active_behavior_experiment?: string | null
          has_leading_indicators?: boolean
          scorecard_built?: boolean
          review_cadence_established?: boolean
          scorecard_metrics?: Json | null
          total_sessions?: number
          diagnostic_sessions?: number
          working_sessions?: number
          checkin_sessions?: number
          completed_deliverables?: DeliverableType[]
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['business_context']['Insert']>
      }

      // ── sessions ────────────────────────────────────────────────────────────
      // One row per conversation session.
      // Mirrors Zerova's sessions with business-specific metadata.
      sessions: {
        Row: {
          id: string
          user_id: string                    // FK → profiles.id

          mode: SessionMode
          primary_frame: PrimaryFrame        // Which framework was active
          vision_flag_triggered: boolean     // Was vision checked mid-session?
          frame_pivots: PrimaryFrame[]       // Frames activated during session (in order)

          // What happened in this session
          topic: string | null               // Brief topic description
          root_cause_identified: string | null // The real problem found
          framework_concept_applied: string | null // e.g. 'stall_out', 'lagging_indicators'
          action_assigned: string | null     // The 48-72h commitment given

          // Session quality signals
          session_summary: string | null     // AI-generated 1-2 sentence summary
          insights_count: number             // How many insights were logged

          started_at: string
          ended_at: string | null
          duration_seconds: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mode: SessionMode
          primary_frame: PrimaryFrame
          vision_flag_triggered?: boolean
          frame_pivots?: PrimaryFrame[]
          topic?: string | null
          root_cause_identified?: string | null
          framework_concept_applied?: string | null
          action_assigned?: string | null
          session_summary?: string | null
          insights_count?: number
          started_at?: string
          ended_at?: string | null
          duration_seconds?: number | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['sessions']['Insert']>
      }

      // ── conversation_messages ───────────────────────────────────────────────
      // Every message in every session.
      // Identical structure to Zerova — no changes needed.
      conversation_messages: {
        Row: {
          id: string
          session_id: string                 // FK → sessions.id
          user_id: string                    // FK → profiles.id (for RLS)
          role: MessageRole
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          role: MessageRole
          content: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['conversation_messages']['Insert']>
      }

      // ── insights ────────────────────────────────────────────────────────────
      // Key findings extracted from sessions.
      // These feed the business_context and future session prompts.
      // The assistant (or a post-session extraction call) writes these.
      insights: {
        Row: {
          id: string
          user_id: string                    // FK → profiles.id
          session_id: string                 // FK → sessions.id

          frame: PrimaryFrame                // Which framework this insight belongs to
          insight_type:
            | 'root_cause'                   // The real problem identified
            | 'pattern'                      // Recurring behavior or situation
            | 'strength'                     // Something working well
            | 'blind_spot'                   // Something the user doesn't see
            | 'progress'                     // Positive change detected
          content: string                    // The insight in plain language
          is_active: boolean                 // False when superseded by newer insight

          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          frame: PrimaryFrame
          insight_type: 'root_cause' | 'pattern' | 'strength' | 'blind_spot' | 'progress'
          content: string
          is_active?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['insights']['Insert']>
      }

      // ── commitments ─────────────────────────────────────────────────────────
      // Actions the user commits to between sessions.
      // Visionari follows up on open commitments at the start of the next session.
      commitments: {
        Row: {
          id: string
          user_id: string                    // FK → profiles.id
          session_id: string                 // FK → sessions.id (session where it was assigned)

          action: string                     // What the user agreed to do
          frame: PrimaryFrame                // Which framework generated this commitment
          due_within_hours: number           // Typically 48 or 72
          status: CommitmentStatus
          confirmed_at: string | null        // When user confirmed completion
          confirmed_in_session_id: string | null // Which session it was confirmed

          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          action: string
          frame: PrimaryFrame
          due_within_hours?: number
          status?: CommitmentStatus
          confirmed_at?: string | null
          confirmed_in_session_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['commitments']['Insert']>
      }

      // ── deliverables ────────────────────────────────────────────────────────
      // Concrete artifacts produced during sessions.
      // Each deliverable is a structured document the user can reference and use.
      deliverables: {
        Row: {
          id: string
          user_id: string                    // FK → profiles.id
          session_id: string                 // FK → sessions.id (session where it was created)

          type: DeliverableType
          title: string                      // Human-readable title
          content: Json                      // Structured content (schema varies by type)
          version: number                    // Increments when deliverable is updated
          is_current: boolean                // False when superseded by a new version

          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          type: DeliverableType
          title: string
          content: Json
          version?: number
          is_current?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['deliverables']['Insert']>
      }

      // ── checkin_log ─────────────────────────────────────────────────────────
      // Quick pulse data from check-in sessions.
      // Identical purpose to Zerova, adapted fields for business context.
      checkin_log: {
        Row: {
          id: string
          user_id: string                    // FK → profiles.id
          session_id: string | null          // FK → sessions.id

          control_score: number | null       // 1-10: how in control does user feel
          energy_word: string | null         // One word describing team energy
          blocker_named: string | null       // Main thing blocking growth (if named)
          vision_alignment: boolean | null   // Was current work aligned with vision?
          checked_in_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id?: string | null
          control_score?: number | null
          energy_word?: string | null
          blocker_named?: string | null
          vision_alignment?: boolean | null
          checked_in_at?: string
        }
        Update: Partial<Database['public']['Tables']['checkin_log']['Insert']>
      }

      // ── checkin_streaks ─────────────────────────────────────────────────────
      // Streak tracking for consistent engagement.
      // Identical to Zerova — no changes needed.
      checkin_streaks: {
        Row: {
          user_id: string                    // PK + FK → profiles.id
          current_streak: number
          longest_streak: number
          last_checkin_date: string | null   // DATE (not timestamp)
          total_checkins: number
          updated_at: string
        }
        Insert: {
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_checkin_date?: string | null
          total_checkins?: number
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['checkin_streaks']['Insert']>
      }

      // ── subscriptions ───────────────────────────────────────────────────────
      // Paddle subscription management.
      // Identical to Zerova — no changes needed.
      subscriptions: {
        Row: {
          id: string
          user_id: string                    // FK → profiles.id
          paddle_subscription_id: string | null
          paddle_customer_id: string | null
          paddle_transaction_id: string | null
          status: string                     // Mirrors Paddle status values
          amount: number | null              // In cents
          currency: string
          billing_cycle: string              // 'monthly'
          current_period_start: string | null
          current_period_end: string | null
          cancelled_at: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          paddle_subscription_id?: string | null
          paddle_customer_id?: string | null
          paddle_transaction_id?: string | null
          status: string
          amount?: number | null
          currency?: string
          billing_cycle?: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancelled_at?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }

    }
  }
}
