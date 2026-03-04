// app/[locale]/dashboard/component-1/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Component1Content from './Component1Content'

export default async function Component1Page() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get or create user progress for component 1
  const { data: progress } = await supabase
    .from('component_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('component_number', 1)
    .single()

  // If no progress exists, create it
  if (!progress) {
    await supabase
      .from('component_progress')
      .insert({
        user_id: user.id,
        component_number: 1,
        progress_percentage: 0,
        completed: false,
      })
  }

  // Get user vision data
  const { data: visionData } = await supabase
    .from('user_vision')
    .select('component_1_data')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Component1Content 
        userId={user.id}
        savedData={visionData?.component_1_data || null}
        currentProgress={progress?.progress_percentage || 0}
      />
    </div>
  )
}
