// app/[locale]/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getTranslations } from 'next-intl/server'
import VisionariChat from '@/components/VisionariChat'

export default async function DashboardPage({
  params,
}: {
  params: { locale: string }
}) {
  const supabase = await createClient()
  const t = await getTranslations()
  const { locale } = params

  // Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/login`)

  // Load profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, subscription_status, trial_ends_at')
    .eq('id', user.id)
    .single()

  // Check access — trial or active subscription
  const status = profile?.subscription_status
  const hasAccess = status === 'trial' || status === 'active'

  if (!hasAccess) {
    redirect(`/${locale}/subscribe`)
  }

  const userName = profile?.full_name || user.email?.split('@')[0] || 'there'
  const firstName = userName.split(' ')[0]

  // Trial banner: show days remaining if on trial
  let trialDaysLeft: number | null = null
  if (status === 'trial' && profile?.trial_ends_at) {
    const msLeft = new Date(profile.trial_ends_at).getTime() - Date.now()
    trialDaysLeft = Math.max(0, Math.ceil(msLeft / 86400000))
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50">

      {/* Trial banner */}
      {trialDaysLeft !== null && trialDaysLeft <= 7 && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center">
          <span className="text-sm text-amber-800">
            {trialDaysLeft === 0
              ? t('dashboard.trialEndsToday')
              : t('dashboard.trialDaysLeft', { days: trialDaysLeft })}
            {' · '}
            <a href={`/${locale}/subscribe`} className="underline font-medium">
              {t('dashboard.subscribe')}
            </a>
          </span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-white text-xs font-bold">V</span>
          </div>
          <span className="font-semibold text-slate-900">Visionari</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{firstName}</span>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="text-sm text-slate-500 hover:text-slate-800 transition"
            >
              {t('dashboard.logout')}
            </button>
          </form>
        </div>
      </header>

      {/* Chat — fills remaining height */}
      <main className="flex-1 overflow-hidden">
        <VisionariChat
          userId={user.id}
          userName={userName}
          locale={locale}
        />
      </main>

    </div>
  )
}
