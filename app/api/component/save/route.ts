// app/api/component/save/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId, componentNumber, data, progressPercentage } = await request.json()

    const supabase = await createClient()

    // Update component progress
    const { error: progressError } = await supabase
      .from('component_progress')
      .upsert({
        user_id: userId,
        component_number: componentNumber,
        progress_percentage: progressPercentage,
        completed: progressPercentage === 100,
        last_accessed_at: new Date().toISOString()
      })

    if (progressError) {
      return NextResponse.json({ error: progressError.message }, { status: 400 })
    }

    // Save component data to user_vision
    const fieldName = `component_${componentNumber}_data`
    
    // Check if user_vision exists
    const { data: existing } = await supabase
      .from('user_vision')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (existing) {
      // Update existing
      const { error: visionError } = await supabase
        .from('user_vision')
        .update({ [fieldName]: data })
        .eq('user_id', userId)

      if (visionError) {
        return NextResponse.json({ error: visionError.message }, { status: 400 })
      }
    } else {
      // Create new
      const { error: visionError } = await supabase
        .from('user_vision')
        .insert({
          user_id: userId,
          [fieldName]: data
        })

      if (visionError) {
        return NextResponse.json({ error: visionError.message }, { status: 400 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
