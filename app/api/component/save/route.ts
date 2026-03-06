// app/api/component/save/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId, componentNumber, data, progressPercentage } = await request.json()

    if (!userId || !componentNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Verificar que el usuario esté autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user || user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Guardar o actualizar progreso
    const { error: upsertError } = await supabase
      .from('component_progress')
      .upsert({
        user_id: userId,
        component_number: componentNumber,
        data: data,
        progress_percentage: progressPercentage || 0,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,component_number'
      })

    if (upsertError) {
      console.error('Error saving progress:', upsertError)
      return NextResponse.json(
        { error: 'Error saving progress' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Progress saved successfully'
    })

  } catch (error) {
    console.error('Error in save endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
