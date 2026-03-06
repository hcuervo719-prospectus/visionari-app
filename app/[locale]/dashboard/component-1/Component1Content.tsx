// app/[locale]/dashboard/component-1/Component1Content.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock,
  Users,
  Target,
  Zap
} from 'lucide-react'

interface Props {
  userId: string
  savedData: any
  currentProgress: number
  locale: string
}

export default function Component1Content({ userId, savedData, currentProgress, locale }: Props) {
  const router = useRouter()
  const t = useTranslations('component1')
  const [section, setSection] = useState(1)
  const [responses, setResponses] = useState({
    clarity: savedData?.clarity || 5,
    decisionSpeed: savedData?.decisionSpeed || 5,
    teamAlignment: savedData?.teamAlignment || 5,
    resourceFocus: savedData?.resourceFocus || 5,
    sustainedEnergy: savedData?.sustainedEnergy || 5,
  })

  const [saving, setSaving] = useState(false)

  // Calculate scores
  const average = (
    responses.clarity +
    responses.decisionSpeed +
    responses.teamAlignment +
    responses.resourceFocus +
    responses.sustainedEnergy
  ) / 5

  const indecisionCostPerYear = Math.round((10 - responses.clarity) * 10000)
  const wastedBudget = Math.round((10 - responses.resourceFocus) * 15000)
  const lostOpportunities = Math.round((10 - responses.decisionSpeed) * 25000)
  const totalCost = indecisionCostPerYear + wastedBudget + lostOpportunities
  const roi = Math.round((average / 10) * 500)

  async function saveProgress() {
    setSaving(true)
    
    const data = {
      clarity: responses.clarity,
      decisionSpeed: responses.decisionSpeed,
      teamAlignment: responses.teamAlignment,
      resourceFocus: responses.resourceFocus,
      sustainedEnergy: responses.sustainedEnergy,
      average,
      calculatedCosts: {
        indecisionCost: indecisionCostPerYear,
        wastedBudget,
        lostOpportunities,
        totalCost,
        roi
      },
      completedAt: new Date().toISOString()
    }

    await fetch('/api/component/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        componentNumber: 1,
        data,
        progressPercentage: 100
      })
    })

    setSaving(false)
    router.push(`/${locale}/dashboard`)
  }

  function getInterpretation() {
    if (average < 5) {
      return {
        zone: t('section5.interpretation.critical.title'),
        icon: <AlertTriangle className="h-12 w-12 text-red-600" />,
        color: 'red',
        message: t('section5.interpretation.critical.description'),
        recommendation: t('section5.interpretation.critical.recommendation')
      }
    } else if (average >= 5 && average <= 7) {
      return {
        zone: t('section5.interpretation.wasted.title'),
        icon: <TrendingUp className="h-12 w-12 text-yellow-600" />,
        color: 'yellow',
        message: t('section5.interpretation.wasted.description'),
        recommendation: t('section5.interpretation.wasted.recommendation')
      }
    }
    return {
      zone: t('section5.interpretation.clarity.title'),
      icon: <CheckCircle2 className="h-12 w-12 text-green-600" />,
      color: 'green',
      message: t('section5.interpretation.clarity.description'),
      recommendation: t('section5.interpretation.clarity.recommendation')
    }
  }

  const interpretation = getInterpretation()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-xl mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(section / 6) * 100}%` }}
            />
          </div>
          <span className="text-sm">{section}/6</span>
        </div>
      </div>

      {/* Section 1: Introducción */}
      {section === 1 && (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            {t('section1.title')}
          </h2>
          <p className="text-xl text-slate-700 mb-4 font-semibold">
            {t('section1.subtitle')}
          </p>
          
          <p className="text-lg text-slate-700 mb-4">
            {t('section1.intro')}
          </p>

          <p className="text-lg text-slate-700 mb-6">
            {t('section1.problem')}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
            <p className="text-xl font-semibold text-blue-900">
              {t('section1.question')}
            </p>
          </div>

          <p className="text-xl font-bold text-slate-900">
            {t('section1.answer')}
          </p>

          <div className="mt-8">
            <button
              onClick={() => setSection(2)}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <span>{t('navigation.next')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Section 2: Los 5 Síntomas */}
      {section === 2 && (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t('section2.title')}
          </h2>

          <p className="text-lg text-slate-700 mb-6">
            {t('section2.intro')}
          </p>

          <div className="space-y-4 mb-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-slate-900">
                  {num}. {t(`section2.symptom${num}.title`)}
                </h3>
                <p className="text-slate-600">
                  {t(`section2.symptom${num}.description`)}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
            <p className="text-slate-700">
              {t('section2.recognition')}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSection(1)}
              className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-lg hover:border-slate-400 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('navigation.previous')}</span>
            </button>
            <button
              onClick={() => setSection(3)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <span>{t('navigation.next')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Section 3: El Patrón Universal */}
      {section === 3 && (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t('section3.title')}
          </h2>

          <p className="text-lg text-slate-700 mb-8">
            {t('section3.intro')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="font-bold text-red-900 mb-4 text-lg">
                {t('section3.comparison.withoutVision.title')}
              </h3>
              <ul className="space-y-2 text-slate-700">
                {t('section3.comparison.withoutVision.features').split('|').map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="mt-4 p-4 bg-white rounded">
                <p className="font-semibold text-slate-900">{t('section3.comparison.withoutVision.result')}</p>
                <p className="text-slate-600 text-sm">{t('section3.comparison.withoutVision.ceiling')}</p>
              </div>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="font-bold text-green-900 mb-4 text-lg">
                {t('section3.comparison.withVision.title')}
              </h3>
              <ul className="space-y-2 text-slate-700">
                {t('section3.comparison.withVision.features').split('|').map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="mt-4 p-4 bg-white rounded">
                <p className="font-semibold text-slate-900">{t('section3.comparison.withVision.result')}</p>
                <p className="text-slate-600 text-sm">{t('section3.comparison.withVision.ceiling')}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              {t('section3.difference.title')}
            </p>
            <ul className="text-blue-800 mt-2 space-y-1">
              {t('section3.difference.notFactors').split('|').map((factor: string, i: number) => (
                <li key={i}>❌ {factor}</li>
              ))}
            </ul>
            <p className="text-lg font-semibold text-blue-900 mt-4">
              {t('section3.difference.realDifference')}
            </p>
            <ul className="text-blue-800 mt-2 space-y-1 text-lg">
              {t('section3.difference.factors').split('|').map((factor: string, i: number) => (
                <li key={i}>✅ {factor}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSection(2)}
              className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-lg hover:border-slate-400 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('navigation.previous')}</span>
            </button>
            <button
              onClick={() => setSection(4)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <span>{t('navigation.next')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Section 4: Calculadora */}
      {section === 4 && (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t('section4.title')}
          </h2>

          <p className="text-lg text-slate-700 mb-8">
            {t('section4.subtitle')}<br />
            {t('section4.scale')}
          </p>

          <div className="space-y-6 mb-8">
            {/* Question 1 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                {t('section4.questions.clarity.label')}
              </label>
              <p className="text-slate-600 mb-3">
                {t('section4.questions.clarity.description')}
              </p>
              <input
                type="range"
                min="1"
                max="10"
                value={responses.clarity}
                onChange={(e) => setResponses({...responses, clarity: parseInt(e.target.value)})}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-1">
                <span>{t('section4.questions.clarity.scaleMin')}</span>
                <span className="font-bold text-blue-600 text-lg">{responses.clarity}</span>
                <span>{t('section4.questions.clarity.scaleMax')}</span>
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                {t('section4.questions.decisionSpeed.label')}
              </label>
              <p className="text-slate-600 mb-3">
                {t('section4.questions.decisionSpeed.description')}
              </p>
              <input
                type="range"
                min="1"
                max="10"
                value={responses.decisionSpeed}
                onChange={(e) => setResponses({...responses, decisionSpeed: parseInt(e.target.value)})}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-1">
                <span>{t('section4.questions.decisionSpeed.scaleMin')}</span>
                <span className="font-bold text-blue-600 text-lg">{responses.decisionSpeed}</span>
                <span>{t('section4.questions.decisionSpeed.scaleMax')}</span>
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                {t('section4.questions.teamAlignment.label')}
              </label>
              <p className="text-slate-600 mb-3">
                {t('section4.questions.teamAlignment.description')}
              </p>
              <input
                type="range"
                min="1"
                max="10"
                value={responses.teamAlignment}
                onChange={(e) => setResponses({...responses, teamAlignment: parseInt(e.target.value)})}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-1">
                <span>{t('section4.questions.teamAlignment.scaleMin')}</span>
                <span className="font-bold text-blue-600 text-lg">{responses.teamAlignment}</span>
                <span>{t('section4.questions.teamAlignment.scaleMax')}</span>
              </div>
            </div>

            {/* Question 4 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                {t('section4.questions.resourceFocus.label')}
              </label>
              <p className="text-slate-600 mb-3">
                {t('section4.questions.resourceFocus.description')}
              </p>
              <input
                type="range"
                min="1"
                max="10"
                value={responses.resourceFocus}
                onChange={(e) => setResponses({...responses, resourceFocus: parseInt(e.target.value)})}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-1">
                <span>{t('section4.questions.resourceFocus.scaleMin')}</span>
                <span className="font-bold text-blue-600 text-lg">{responses.resourceFocus}</span>
                <span>{t('section4.questions.resourceFocus.scaleMax')}</span>
              </div>
            </div>

            {/* Question 5 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                {t('section4.questions.sustainedEnergy.label')}
              </label>
              <p className="text-slate-600 mb-3">
                {t('section4.questions.sustainedEnergy.description')}
              </p>
              <input
                type="range"
                min="1"
                max="10"
                value={responses.sustainedEnergy}
                onChange={(e) => setResponses({...responses, sustainedEnergy: parseInt(e.target.value)})}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-1">
                <span>{t('section4.questions.sustainedEnergy.scaleMin')}</span>
                <span className="font-bold text-blue-600 text-lg">{responses.sustainedEnergy}</span>
                <span>{t('section4.questions.sustainedEnergy.scaleMax')}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSection(3)}
              className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-lg hover:border-slate-400 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('navigation.previous')}</span>
            </button>
            <button
              onClick={() => setSection(6)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <span>{t('section4.button')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Section 6: Results */}
      {section === 6 && (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t('section5.title')}
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              {interpretation.icon}
              <div>
                <p className="text-sm text-slate-600">{t('section5.average')}</p>
                <p className="text-4xl font-bold text-slate-900">{average.toFixed(1)}/10</p>
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-4 text-${interpretation.color}-900`}>
              {interpretation.zone}
            </h3>
            <p className="text-lg text-slate-700 mb-4">
              {interpretation.message}
            </p>
            <p className="text-slate-700 font-semibold">
              {interpretation.recommendation}
            </p>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-red-900 mb-4">
              {t('section5.costs.title')}
            </h3>
            <div className="space-y-3 text-slate-700">
              <div className="flex justify-between">
                <span>{t('section5.costs.indecision')}</span>
                <span className="font-bold">${indecisionCostPerYear.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('section5.costs.wastedBudget')}</span>
                <span className="font-bold">${wastedBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('section5.costs.lostOpportunities')}</span>
                <span className="font-bold">${lostOpportunities.toLocaleString()}</span>
              </div>
              <div className="border-t-2 border-red-300 pt-3 flex justify-between text-xl">
                <span className="font-bold">{t('section5.costs.total')}</span>
                <span className="font-bold text-red-600">${totalCost.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              {t('section5.costs.note')}
            </p>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-green-900 mb-2">
              {t('section5.roi.title')}
            </h3>
            <p className="text-slate-700 mb-4">
              {t('section5.roi.description')}
            </p>
            <p className="text-5xl font-bold text-green-600 mb-4">
              {t('section5.roi.value', { multiplier: roi })}
            </p>
            <p className="text-sm text-slate-600">
              {t('section5.roi.explanation')}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">
              {t('section5.cta.title')}
            </h3>
            <p className="text-lg mb-6">
              {t('section5.cta.description')}
            </p>
            <button className="w-full bg-white text-blue-600 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-50 transition">
              {t('section5.cta.button')}
            </button>
            <p className="text-center text-blue-100 mt-4">
              {t('section5.cta.alternative')}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSection(4)}
              className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-lg hover:border-slate-400 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('navigation.previous')}</span>
            </button>
            <button
              onClick={saveProgress}
              disabled={saving}
              className="flex-1 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span>{saving ? 'Guardando...' : t('navigation.complete')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
