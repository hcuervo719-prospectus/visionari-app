// app/[locale]/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getTranslations } from 'next-intl/server'
import UnlockButton from '@/components/UnlockButton'

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const supabase = await createClient()
  const t = await getTranslations()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect(`/${params.locale}/login`)
  }

  // Obtener perfil del usuario
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const hasPurchased = profile?.has_purchased || false

  // Obtener progreso de componentes
  const { data: progressData } = await supabase
    .from('component_progress')
    .select('*')
    .eq('user_id', user.id)

  const completedComponents = progressData?.filter(p => p.completed).length || 0
  const totalTimeInvested = progressData?.reduce((acc, p) => acc + (p.time_spent || 0), 0) || 0

  const firstName = profile?.full_name?.split(' ')[0] || 'there'

  // Components data
  const components = [
    { id: 1, name: t('dashboard.components.1'), locked: false },
    { id: 2, name: t('dashboard.components.2'), locked: !hasPurchased },
    { id: 3, name: t('dashboard.components.3'), locked: !hasPurchased },
    { id: 4, name: t('dashboard.components.4'), locked: !hasPurchased },
    { id: 5, name: t('dashboard.components.5'), locked: !hasPurchased },
    { id: 6, name: t('dashboard.components.6'), locked: !hasPurchased },
    { id: 7, name: t('dashboard.components.7'), locked: !hasPurchased },
    { id: 8, name: t('dashboard.components.8'), locked: !hasPurchased },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {t('dashboard.welcome', { name: firstName })} 👋
              </h1>
              <p className="text-slate-600">{t('dashboard.subtitle')}</p>
            </div>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition"
              >
                {t('dashboard.logout')}
              </button>
            </form>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">{t('dashboard.progress')}</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{completedComponents}/8</p>
            <p className="text-sm text-slate-500 mt-1">{t('dashboard.componentsCompleted')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">{t('dashboard.timeInvested')}</h3>
              <span className="text-2xl">⏱️</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalTimeInvested}h</p>
            <p className="text-sm text-slate-500 mt-1">{t('dashboard.hoursTotal')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">{t('dashboard.accessLevel')}</h3>
              <span className="text-2xl">{hasPurchased ? '✅' : '🔓'}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {hasPurchased ? 'Premium' : 'Free'}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              {hasPurchased ? 'Full Access' : t('dashboard.upgradeToUnlock')}
            </p>
          </div>
        </div>

        {/* Components Grid */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t('dashboard.yourVisionComponents')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {components.map((component) => {
              const progress = progressData?.find(p => p.component_number === component.id)
              const isCompleted = progress?.completed || false
              const progressPercentage = progress?.progress_percentage || 0

              return (
                <a
                  key={component.id}
                  href={component.locked ? '#' : `/${params.locale}/dashboard/component-${component.id}`}
                  className={`block p-6 rounded-lg border-2 transition-all ${
                    component.locked
                      ? 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-60'
                      : isCompleted
                      ? 'border-green-200 bg-green-50 hover:border-green-300'
                      : 'border-blue-200 bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-slate-500">
                          Component {component.id}
                        </span>
                        {component.locked && <span className="text-lg">🔒</span>}
                        {isCompleted && <span className="text-lg">✅</span>}
                      </div>
                      <h3 className="font-semibold text-slate-900">{component.name}</h3>
                    </div>
                  </div>

                  {!component.locked && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>{progressPercentage}% complete</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isCompleted ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </a>
              )
            })}
          </div>
        </div>

        {/* Unlock CTA - Solo si NO ha comprado */}
        {!hasPurchased && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">{t('dashboard.readyToComplete')}</h2>
              <p className="text-xl mb-8 text-blue-100">
                {t('dashboard.unlockAll')}
              </p>
              <UnlockButton userId={user.id} userEmail={user.email || ''} />
              <p className="text-sm text-blue-200 mt-4">
                One-time payment • Lifetime access • No subscription
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
