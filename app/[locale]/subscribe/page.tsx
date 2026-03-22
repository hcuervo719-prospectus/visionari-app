// app/[locale]/subscribe/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getTranslations } from 'next-intl/server'
import SubscribeButton from '@/components/SubscribeButton'
import Link from 'next/link'
import { Check } from 'lucide-react'

export default async function SubscribePage({
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

  // If already subscribed, go to dashboard
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, subscription_status, trial_ends_at, email')
    .eq('id', user.id)
    .single()

  if (profile?.subscription_status === 'active') {
    redirect(`/${locale}/dashboard`)
  }

  const firstName = profile?.full_name?.split(' ')[0] || ''
  const email = profile?.email || user.email || ''

  // Calculate trial days remaining (may be 0 or negative)
  const trialEndsAt = profile?.trial_ends_at
    ? new Date(profile.trial_ends_at)
    : null
  const trialExpired = trialEndsAt ? trialEndsAt < new Date() : true
  const trialDaysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / 86400000))
    : 0

  const features = [
    t('pricing.feature1'),
    t('pricing.feature2'),
    t('pricing.feature3'),
    t('pricing.feature4'),
    t('pricing.feature5'),
    t('pricing.feature6'),
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">V</span>
            </div>
            <span className="font-bold text-slate-900">Visionari</span>
          </Link>
          {!trialExpired && (
            <Link
              href={`/${locale}/dashboard`}
              className="text-sm text-slate-500 hover:text-slate-800 transition"
            >
              {t('subscribe.backToDashboard')} →
            </Link>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl">

          {/* Expired trial message */}
          {trialExpired ? (
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                {t('subscribe.trialExpired')}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                {firstName
                  ? t('subscribe.headlineNamed', { name: firstName })
                  : t('subscribe.headline')}
              </h1>
              <p className="text-slate-500 max-w-lg mx-auto">
                {t('subscribe.subheadlineExpired')}
              </p>
            </div>
          ) : (
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-emerald-600 mb-4">
                {t('subscribe.trialActive', { days: trialDaysLeft })}
              </p>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                {t('subscribe.headlineTrial')}
              </h1>
              <p className="text-slate-500 max-w-lg mx-auto">
                {t('subscribe.subheadlineTrial')}
              </p>
            </div>
          )}

          {/* Pricing card + value comparison */}
          <div className="grid md:grid-cols-2 gap-6 items-start">

            {/* Pricing card */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl shadow-slate-200">
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-black">{t('pricing.price')}</span>
                <span className="text-slate-400 text-lg mb-1.5">{t('pricing.period')}</span>
              </div>
              <p className="text-emerald-400 text-sm font-medium mb-8">
                {t('subscribe.billedMonthly')}
              </p>

              <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <SubscribeButton
                userId={user.id}
                userEmail={email}
                label={t('subscribe.cta')}
                className="w-full bg-white text-slate-900 py-3.5 rounded-xl hover:bg-slate-100 text-base"
              />

              <p className="text-center text-slate-500 text-xs mt-3">
                {t('subscribe.cancelAnytime')}
              </p>
            </div>

            {/* Value comparison */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
                  {t('subscribe.compareTitle')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{t('subscribe.compareConsulting')}</span>
                    <span className="text-sm font-semibold text-slate-900">$300–$500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{t('subscribe.compareCoach')}</span>
                    <span className="text-sm font-semibold text-slate-900">$150–$300</span>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Visionari</span>
                    <span className="text-sm font-black text-emerald-600">$30/mo</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
                  {t('subscribe.scienceTitle')}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t('subscribe.scienceText')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
                  {t('subscribe.memoryTitle')}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t('subscribe.memoryText')}
                </p>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <p className="text-center text-slate-400 text-xs mt-8">
            {t('subscribe.secureNote')}
          </p>
        </div>
      </main>
    </div>
  )
}
