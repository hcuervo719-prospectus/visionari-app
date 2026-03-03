// lib/supabase/database.types.ts
// TypeScript types for Supabase database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          locale: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          locale?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          locale?: string
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          product_type: 'foundation' | 'pro'
          paddle_transaction_id: string | null
          paddle_subscription_id: string | null
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'refunded' | 'cancelled'
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_type: 'foundation' | 'pro'
          paddle_transaction_id?: string | null
          paddle_subscription_id?: string | null
          amount: number
          currency?: string
          status?: 'pending' | 'completed' | 'refunded' | 'cancelled'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_type?: 'foundation' | 'pro'
          paddle_transaction_id?: string | null
          paddle_subscription_id?: string | null
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'refunded' | 'cancelled'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      component_progress: {
        Row: {
          id: string
          user_id: string
          component_number: number
          completed: boolean
          progress_percentage: number
          last_accessed_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          component_number: number
          completed?: boolean
          progress_percentage?: number
          last_accessed_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          component_number?: number
          completed?: boolean
          progress_percentage?: number
          last_accessed_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_vision: {
        Row: {
          id: string
          user_id: string
          component_1_data: Json
          component_2_data: Json
          component_3_data: Json
          component_4_data: Json
          component_5_data: Json
          component_6_data: Json
          component_7_data: Json
          component_8_data: Json
          final_document_url: string | null
          final_document_generated_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          component_1_data?: Json
          component_2_data?: Json
          component_3_data?: Json
          component_4_data?: Json
          component_5_data?: Json
          component_6_data?: Json
          component_7_data?: Json
          component_8_data?: Json
          final_document_url?: string | null
          final_document_generated_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          component_1_data?: Json
          component_2_data?: Json
          component_3_data?: Json
          component_4_data?: Json
          component_5_data?: Json
          component_6_data?: Json
          component_7_data?: Json
          component_8_data?: Json
          final_document_url?: string | null
          final_document_generated_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
