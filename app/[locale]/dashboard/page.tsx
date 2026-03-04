// app/[locale]/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const supabase = await createClient()
  const t = await getTranslations()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${params.locale}/login`)
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get component progress
  const { data: progress } = await supabase
    .from('component_progress')
    .select('*')
    .eq('user_id', user.id)
    .order('component_number')

  const completedCount = progress?.filter(p => p.completed).length || 0
  const firstName = profile?.full_name?.split(' ')[0] || 'there'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('common.siteName')}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {profile?.full_name || user.email}
            </span>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="text-sm text-slate-600 hover:text-slate-900 transition"
              >
                {t('dashboard.logout')}
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {t('dashboard.welcome', { name: firstName })} 👋
          </h2>
          <p className="text-slate-600">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">{t('dashboard.progress')}</h3>
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {completedCount}/8
            </p>
            <p className="text-xs text-slate-500 mt-1">{t('dashboard.componentsCompleted')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">{t('dashboard.timeInvested')}</h3>
              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {Math.floor((completedCount / 8) * 48)}h
            </p>
            <p className="text-xs text-slate-500 mt-1">{t('dashboard.hoursTotal')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">{t('dashboard.accessLevel')}</h3>
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{t('pricing.free.name')}</p>
            <p className="text-xs text-slate-500 mt-1">{t('dashboard.upgradeToUnlock')}</p>
          </div>
        </div>

        {/* Components Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            {t('dashboard.yourVisionComponents')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const componentProgress = progress?.find(p => p.component_number === num)
              const isCompleted = componentProgress?.completed || false
              const isLocked = num > 1 // Component 1 is free, rest are locked

              return (
                <Link
                  key={num}
                  href={num === 1 ? `/${params.locale}/dashboard/component-1` : '#'}
                  className={`relative bg-white rounded-xl shadow-sm p-6 border-2 transition cursor-pointer hover:shadow-md ${
                    isCompleted
                      ? 'border-green-500'
                      : isLocked
                      ? 'border-slate-200 opacity-60'
                      : 'border-blue-500'
                  }`}
                >
                  {isLocked && (
                    <div className="absolute top-4 right-4">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  )}
                  {isCompleted && (
                    <div className="absolute top-4 right-4">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="text-sm font-medium text-slate-500 mb-1">
                    Componente {num}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {t(`dashboard.components.${num}`)}
                  </h4>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${componentProgress?.progress_percentage || 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {componentProgress?.progress_percentage || 0}% complete
                  </p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* CTA for Foundation Module */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">
            {t('dashboard.readyToComplete')}
          </h3>
          <p className="text-blue-100 mb-6">
            {t('dashboard.unlockAll')}
          </p>
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
            {t('dashboard.unlockButton')}
          </button>
        </div>
      </main>
    </div>
  )
}
