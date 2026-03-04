// app/api/auth/signup/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Handler para GET (solo para verificar que la ruta existe)
export async function GET() {
  return NextResponse.json({ 
    message: 'Signup endpoint is working. Use POST to create an account.' 
  })
}

// Handler para POST (registro real)
export async function POST(request: Request) {
  try {
    const { email, password, full_name } = await request.json()

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
        },
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ user: data.user })
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
