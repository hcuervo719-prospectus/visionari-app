import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';
import Link from 'next/link';
import { 
  Globe, 
  BookOpen, 
  FileText, 
  Building2,
  ArrowRight,
  Check
} from 'lucide-react';

// Genera las rutas estáticas
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function HomePage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  // CRÍTICO: Esto habilita static rendering
  setRequestLocale(locale);
  
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">
                {t('common.siteName')}
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#cases" className="text-gray-600 hover:text-gray-900 transition">
                {t('nav.cases')}
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">
                {t('nav.howItWorks')}
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">
                {t('nav.pricing')}
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href={`/${locale}/login`}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {t('nav.login')}
              </Link>
              <Link 
                href={`/${locale}/signup`}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                {t('nav.signup')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-8">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">{t('hero.badge')}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('hero.headline')}
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('hero.subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              href={`/${locale}/signup`}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition flex items-center space-x-2 text-lg font-semibold"
            >
              <span>{t('hero.cta.primary')}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a 
              href="#pricing"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition text-lg font-semibold"
            >
              {t('hero.cta.secondary')}
            </a>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>{t('hero.casesLabel')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100">
              <BookOpen className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('features.feature1.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.feature1.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('features.feature2.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.feature2.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
              <Building2 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('features.feature3.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.feature3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="p-8 rounded-2xl border-2 border-gray-200 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('pricing.free.name')}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {t('pricing.free.price')}
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                {t('pricing.free.description')}
              </p>
              <ul className="space-y-3 mb-8">
                {['feature1', 'feature2', 'feature3'].map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      {t(`pricing.free.${feature}`)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/${locale}/signup`}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 transition font-semibold block text-center"
              >
                {t('pricing.free.cta')}
              </Link>
            </div>

            {/* Foundation Module */}
            <div className="p-8 rounded-2xl border-2 border-orange-600 bg-gradient-to-br from-orange-50 to-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {t('pricing.foundation.badge')}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('pricing.foundation.name')}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {t('pricing.foundation.price')}
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                {t('pricing.foundation.description')}
              </p>
              <ul className="space-y-3 mb-8">
                {['feature1', 'feature2', 'feature3', 'feature4'].map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      {t(`pricing.foundation.${feature}`)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/${locale}/signup`}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold block text-center"
              >
                {t('pricing.foundation.cta')}
              </Link>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl border-2 border-gray-200 bg-white opacity-75">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('pricing.pro.name')}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {t('pricing.pro.price')}
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                {t('pricing.pro.description')}
              </p>
              <ul className="space-y-3 mb-8">
                {['feature1', 'feature2', 'feature3', 'feature4'].map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      {t(`pricing.pro.${feature}`)}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold" disabled>
                {t('pricing.pro.cta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6 text-orange-500" />
                <span className="text-lg font-bold text-white">
                  {t('common.siteName')}
                </span>
              </div>
              <p className="text-sm">
                {t('footer.tagline')}
              </p>
            </div>

            {['product', 'company', 'legal'].map((section) => (
              <div key={section}>
                <h4 className="font-semibold text-white mb-4">
                  {t(`footer.sections.${section}.title`)}
                </h4>
                <ul className="space-y-2 text-sm">
                  {['link1', 'link2', 'link3'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition">
                        {t(`footer.sections.${section}.${link}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
