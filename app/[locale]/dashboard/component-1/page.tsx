// app/[locale]/dashboard/component-1/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import VisionariChat from './VisionariChat'

export default async function Component1Page({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const supabase = await createClient()
  const { locale } = params

  // Verificar autenticación
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect(`/${locale}/login`)
  }

  // Obtener perfil del usuario
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Obtener progreso guardado (si existe)
  const { data: savedProgress } = await supabase
    .from('component_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('component_number', 1)
    .single()

  const userName = profile?.full_name || user.email?.split('@')[0] || 'Amigo'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <VisionariChat 
        userId={user.id}
        userName={userName}
        locale={locale}
      />
    </div>
  )
}
