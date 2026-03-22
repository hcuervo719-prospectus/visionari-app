// app/api/auth/signup/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Use POST to create an account.' })
}

export async function POST(request: Request) {
  try {
    const { email, password, full_name } = await request.json()

    if (!email || !password || !full_name) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // 1. Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name } },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Account creation failed' },
        { status: 500 }
      )
    }

    const userId = data.user.id
    const now = new Date()
    const trialEnds = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // +7 days

    // 2. Upsert profile with trial data
    // (The auth trigger creates the row, but we set trial fields here)
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id:                  userId,
        email,
        full_name,
        locale:              'en', // default; app will update from browser locale
        trial_started_at:    now.toISOString(),
        trial_ends_at:       trialEnds.toISOString(),
        trial_sessions_used: 0,
        subscription_status: 'trial',
        updated_at:          now.toISOString(),
      }, { onConflict: 'id' })

    if (profileError) {
      console.error('Profile upsert error:', profileError)
      // Non-fatal — auth trigger may have already created the row
    }

    // 3. business_context is created by the auth trigger automatically
    // No action needed here

    return NextResponse.json({ user: data.user })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
