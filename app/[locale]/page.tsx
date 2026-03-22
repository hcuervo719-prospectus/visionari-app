'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ArrowRight, Check, Brain, Target, Users, BarChart3 } from 'lucide-react'

export default function LandingPage() {
  const t = useTranslations()
  const params = useParams()
  const locale = params.locale as string

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">V</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Visionari</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-500">
            <a href="#how" className="hover:text-slate-900 transition">{t('nav.howItWorks')}</a>
            <a href="#science" className="hover:text-slate-900 transition">{t('nav.science')}</a>
            <a href="#pricing" className="hover:text-slate-900 transition">{t('nav.pricing')}</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/login`}
              className="text-sm text-slate-500 hover:text-slate-900 transition"
            >
              {t('nav.login')}
            </Link>
            <Link
              href={`/${locale}/signup`}
              className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition font-medium"
            >
              {t('nav.signup')}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left — Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium mb-8 uppercase tracking-wide">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {t('hero.badge')}
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tight">
                {t('hero.headline')}
                <span className="block text-slate-400 font-light">{t('hero.headlineAccent')}</span>
                <span className="block text-slate-900">{t('hero.headlineLine3')}</span>
              </h1>

              <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
                {t('hero.subheadline')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  href={`/${locale}/signup`}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white text-base font-semibold px-7 py-3.5 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                >
                  {t('hero.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#how"
                  className="flex items-center justify-center border border-slate-200 text-slate-700 text-base px-7 py-3.5 rounded-xl hover:bg-slate-50 transition"
                >
                  {t('hero.ctaSecondary')}
                </a>
              </div>

              <p className="text-sm font-semibold text-slate-700">{t('hero.trial')}</p>
              <p className="text-xs text-slate-400 mt-1">{t('hero.trialNote')}</p>
            </div>

            {/* Right — Chat preview */}
            <div className="hidden md:block">
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-slate-900 text-xs font-black">V</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Visionari</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <p className="text-emerald-400 text-xs">{t('hero.available')}</p>
                    </div>
                  </div>
                </div>
                {/* Chat messages */}
                <div className="px-5 py-5 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-slate-300 text-xs font-bold">V</span>
                    </div>
                    <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                      <p className="text-slate-200 text-sm leading-relaxed">{t('hero.cardDesc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-white rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                      <p className="text-slate-800 text-sm leading-relaxed">"Trabajo 10 horas al día y siento que no avanzo."</p>
                    </div>
                    <div className="w-7 h-7 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-slate-300 text-xs">C</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-slate-300 text-xs font-bold">V</span>
                    </div>
                    <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                      <p className="text-slate-200 text-sm leading-relaxed">Lo que describes no es un problema de productividad — es que la empresa está construida alrededor tuyo, no de un sistema. ¿Cuántas decisiones requirieron tu aprobación la semana pasada?</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1 bg-slate-800 rounded-xl px-4 py-2.5">
                      <p className="text-slate-500 text-xs">Escribe tu respuesta...</p>
                    </div>
                    <div className="w-8 h-8 bg-slate-700 rounded-xl flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOUR FRAMES ──────────────────────────────────────── */}
      <section id="how" className="py-24 bg-slate-50 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('frames.title')}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">{t('frames.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { key: 'vision',    icon: Target,    color: 'bg-amber-50',   iconColor: 'text-amber-600',   ring: '' },
              { key: 'founders',  icon: Brain,     color: 'bg-rose-50',    iconColor: 'text-rose-600',    ring: 'ring-2 ring-rose-200' },
              { key: 'mckinsey',  icon: Users,     color: 'bg-blue-50',    iconColor: 'text-blue-600',    ring: '' },
              { key: 'scorecard', icon: BarChart3, color: 'bg-emerald-50', iconColor: 'text-emerald-600', ring: '' },
            ].map(({ key, icon: Icon, color, iconColor, ring }) => (
              <div key={key} className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 ${ring}`}>
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {t(`frames.${key}.title`)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t(`frames.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCIENCE ──────────────────────────────────────────── */}
      <section id="science" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('science.title')}</h2>
          <p className="text-slate-500 mb-12 max-w-xl mx-auto">{t('science.subtitle')}</p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-2xl border border-slate-100">
              <p className="text-5xl font-black text-slate-900 mb-2">85%</p>
              <p className="text-slate-500 text-sm leading-relaxed">{t('science.stat1')}</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100">
              <p className="text-5xl font-black text-slate-900 mb-2">8K</p>
              <p className="text-slate-500 text-sm leading-relaxed">{t('science.stat2')}</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100">
              <p className="text-5xl font-black text-slate-900 mb-2">3x</p>
              <p className="text-slate-500 text-sm leading-relaxed">{t('science.stat3')}</p>
            </div>
          </div>

          <div className="text-xs text-slate-400 mb-12 font-mono tracking-wide">
            {t('science.frameworks')}
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left">
            <p className="text-lg text-slate-700 italic leading-relaxed mb-4">"{t('science.quote')}"</p>
            <p className="text-sm text-slate-400 font-medium">{t('science.quoteSource')}</p>
          </div>
        </div>
      </section>

      {/* ── MEMORY / HOW IT WORKS ────────────────────────────── */}
      <section className="py-24 bg-slate-50 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('memory.title')}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">{t('memory.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(['point1', 'point2', 'point3'] as const).map((key, i) => (
              <div key={key} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-white text-sm font-black">{i + 1}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{t(`memory.${key}.title`)}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t(`memory.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENCY ──────────────────────────────────────────── */}
      <section className="py-24 bg-slate-900 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">{t('urgency.title')}</h2>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            <div className="bg-slate-800 rounded-2xl p-6">
              <p className="text-4xl font-black text-red-400 mb-2">7 de 10</p>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{t('urgency.stat1')}</p>
              <p className="text-slate-500 text-xs font-medium">{t('urgency.statLabel1')}</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6">
              <p className="text-4xl font-black text-red-400 mb-2">40%</p>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{t('urgency.stat2')}</p>
              <p className="text-slate-500 text-xs font-medium">{t('urgency.statLabel2')}</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6">
              <p className="text-4xl font-black text-emerald-400 mb-2">$300</p>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{t('urgency.stat3')}</p>
              <p className="text-slate-500 text-xs font-medium">{t('urgency.statLabel3')}</p>
            </div>
          </div>
          <p className="text-slate-300 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('urgency.message')}
          </p>
          <Link
            href={`/${locale}/signup`}
            className="inline-flex items-center gap-2 bg-white text-slate-900 text-base font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition"
          >
            {t('urgency.cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-4 text-slate-500 text-sm">{t('hero.trial')}</p>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('pricing.title')}</h2>
            <p className="text-slate-500">{t('pricing.subtitle')}</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl shadow-slate-200">
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-black">{t('pricing.price')}</span>
              <span className="text-slate-400 text-lg mb-1">{t('pricing.period')}</span>
            </div>
            <p className="text-emerald-400 text-sm font-semibold mb-8">{t('pricing.trial')}</p>

            <ul className="space-y-3 mb-8">
              {(['feature1','feature2','feature3','feature4','feature5','feature6'] as const).map(f => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-slate-300 text-sm">{t(`pricing.${f}`)}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/signup`}
              className="flex items-center justify-center gap-2 w-full bg-white text-slate-900 font-bold py-3.5 rounded-xl hover:bg-slate-100 transition text-base"
            >
              {t('pricing.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-slate-500 text-xs mt-3">{t('pricing.note')}</p>
          </div>

          <p className="text-center text-slate-400 text-sm mt-6 leading-relaxed">
            {t('pricing.compare')}
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-24 bg-slate-900 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">{t('cta.subtitle')}</p>
          <Link
            href={`/${locale}/signup`}
            className="inline-flex items-center gap-2 bg-white text-slate-900 text-base font-bold px-10 py-4 rounded-xl hover:bg-slate-100 transition"
          >
            {t('cta.button')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-4 text-slate-500 text-sm">{t('cta.trial')}</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="py-8 px-4 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">V</span>
            </div>
            <span className="text-slate-400 text-sm">{t('footer.copyright')}</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href={`/${locale}/privacy`} className="hover:text-slate-600 transition">{t('footer.privacy')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-slate-600 transition">{t('footer.terms')}</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
