import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Globe, BookOpen, Brain, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-bold text-xl">{t('common.siteName')}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="#casos" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t('nav.cases')}
            </Link>
            <Link href="#como-funciona" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t('nav.howItWorks')}
            </Link>
            <Link href="#precios" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t('nav.pricing')}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm text-slate-600 hover:text-slate-900 px-4 py-2">
              {t('nav.login')}
            </button>
            <button className="text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-md">
              {t('nav.getStarted')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              {t('hero.badge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            {t('hero.headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subheadline')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 rounded-md flex items-center gap-2">
              {t('hero.ctaPrimary')}
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link 
              href="#precios"
              className="text-lg px-8 py-4 border border-slate-300 hover:border-slate-400 rounded-md"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-12 space-y-4">
            <p className="text-sm text-slate-500 uppercase tracking-wide font-medium">
              {t('hero.casesLabel')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <span className="text-2xl font-bold text-slate-700">Amazon</span>
              <span className="text-2xl font-bold text-slate-700">Tesla</span>
              <span className="text-2xl font-bold text-slate-700">Starbucks</span>
              <span className="text-2xl font-bold text-slate-700">Netflix</span>
              <span className="text-2xl font-bold text-slate-700">Airbnb</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="como-funciona" className="container mx-auto px-4 py-20 border-t bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('features.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature1.title')}
              </h3>
              <p className="text-slate-600">
                {t('features.feature1.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature2.title')}
              </h3>
              <p className="text-slate-600">
                {t('features.feature2.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature3.title')}
              </h3>
              <p className="text-slate-600">
                {t('features.feature3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Simple for now */}
      <section id="precios" className="container mx-auto px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('pricing.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
              <h3 className="text-2xl font-bold mb-2">{t('pricing.free.name')}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{t('pricing.free.price')}</span>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                {t('pricing.free.description')}
              </p>
              <button className="w-full border border-slate-300 hover:border-slate-400 py-3 rounded-md">
                {t('pricing.free.cta')}
              </button>
            </div>

            {/* Foundation Module */}
            <div className="bg-white p-8 rounded-2xl border-2 border-orange-500 relative shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                {t('pricing.foundation.badge')}
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('pricing.foundation.name')}</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold">{t('pricing.foundation.price')}</span>
                <span className="text-slate-600 text-sm ml-2">{t('pricing.foundation.period')}</span>
              </div>
              <p className="text-sm font-medium text-orange-600 mb-6">
                {t('pricing.foundation.access')}
              </p>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-orange-900 mb-1">
                  {t('pricing.foundation.goal')}
                </p>
                <p className="text-sm text-orange-800">
                  {t('pricing.foundation.goalText')}
                </p>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-4 rounded-md">
                {t('pricing.foundation.cta')}
              </button>
              <p className="text-xs text-center text-slate-500 mt-3">
                {t('pricing.foundation.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-blue-600 rounded-lg"></div>
                <span className="font-bold">{t('common.siteName')}</span>
              </div>
              <p className="text-sm text-slate-600">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3">{t('footer.product')}</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-slate-900">{t('nav.cases')}</Link></li>
                <li><Link href="#precios" className="hover:text-slate-900">{t('nav.pricing')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">{t('footer.resources')}</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-slate-900">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">{t('footer.company')}</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-slate-900">About</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center">
            <p className="text-sm text-slate-500">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
