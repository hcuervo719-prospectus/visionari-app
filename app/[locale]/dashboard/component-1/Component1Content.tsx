// app/[locale]/dashboard/component-1/Component1Content.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
}

export default function Component1Content({ userId, savedData, currentProgress }: Props) {
  const router = useRouter()
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
    router.push('/dashboard')
  }

  function getInterpretation() {
    if (average < 5) {
      return {
        zone: 'ZONA DE RIESGO CRÍTICO',
        icon: <AlertTriangle className="h-12 w-12 text-red-600" />,
        color: 'red',
        message: 'Tu falta de visión clara te está costando miles de dólares mensuales en indecisión, recursos dispersos y oportunidades perdidas.'
      }
    } else if (average >= 5 && average <= 7) {
      return {
        zone: 'ZONA DE POTENCIAL DESPERDICIADO',
        icon: <TrendingUp className="h-12 w-12 text-yellow-600" />,
        color: 'yellow',
        message: 'Tienes algo de claridad pero insuficiente. Estás dejando 50-70% de tu potencial sobre la mesa.'
      }
    } else {
      return {
        zone: 'TIENES CLARIDAD SIGNIFICATIVA',
        icon: <CheckCircle2 className="h-12 w-12 text-green-600" />,
        color: 'green',
        message: 'Estás en mejor posición que 80% de emprendedores. Este módulo te ayudará a optimizar y mantenerla viva.'
      }
    }
  }

  const interpretation = getInterpretation()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard
        </button>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Componente 1: Importancia de la Visión
        </h1>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(section / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Section 1: Introducción */}
      {section === 1 && (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            ¿Por qué el 80% de emprendedores fracasan?
          </h2>
          
          <div className="prose prose-slate max-w-none mb-8">
            <p className="text-lg text-slate-700 leading-relaxed">
              La mayoría de emprendedores están perdidos sin saberlo. 
              Tienen negocio. Tienen producto. Tienen clientes. 
              Pero <strong>no tienen VISIÓN</strong>.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed">
              No es que no trabajen duro. Trabajan 60+ horas semanales. 
              No es que no tengan ideas. Tienen demasiadas.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              El problema es más sutil y más costoso:
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-6">
              <p className="text-lg font-semibold text-orange-900">
                NO es que no tengas visión clara. 
                <br />
                NO es que no creas visión todavía.
              </p>
              <p className="text-lg font-semibold text-orange-900 mt-2">
                Es que nadie te enseñó cómo tener claridad brutal sobre tu futuro.
              </p>
            </div>

            <p className="text-lg text-slate-700">
              <strong>El resultado:</strong> Emprendedores trabajando durísimo... en círculos.
            </p>
          </div>

          <button
            onClick={() => setSection(2)}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg font-semibold"
          >
            <span>Continuar</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Section 2: Los 5 Síntomas */}
      {section === 2 && (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Los 5 Síntomas de NO tener Visión Clara
          </h2>

          <p className="text-lg text-slate-700 mb-8">
            <strong>Si reconoces 3+ síntomas, tienes el problema.</strong>
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                title: 'Parálisis por análisis',
                description: 'Tomas semanas/meses para decidir estrategias importantes. Cada decisión se siente como apuesta sin criterio.'
              },
              {
                title: 'Pivotes constantes',
                description: 'Terminas posponiendo hasta que "tienes más información". Pero esa información nunca llega.'
              },
              {
                title: 'Dispersión de recursos',
                description: 'Dices "sí" a oportunidades que te desvían. Inviertes tiempo/dinero en proyectos que van a ningún lado.'
              },
              {
                title: 'Fatiga mental constante',
                description: 'Agotamiento no por trabajo físico sino por indecisión continua. Cada día decides las mismas cosas.'
              },
              {
                title: 'Pitch interminable',
                description: 'Explicar tu empresa toma 10+ minutos. Y al final la gente dice "ah, interesante..." (sin entender).'
              }
            ].map((symptom, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-slate-900">{index + 1}. {symptom.title}</h3>
                <p className="text-slate-600">{symptom.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
            <p className="text-slate-700">
              <strong>No es culpa tuya.</strong> Es que nadie te enseña esto.
            </p>
            <p className="text-slate-700 mt-2">
              Te enseñan Marketing ✅, Ventas ✅, Producto ✅, Finanzas ✅
            </p>
            <p className="text-slate-700 mt-2">
              Pero NO te enseñan: ❌ Cómo tener claridad brutal sobre tu futuro
              <br />❌ Cómo construir visión que guíe cada decisión
              <br />❌ Cómo mantenerla viva durante años
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSection(1)}
              className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-lg hover:border-slate-400 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Anterior</span>
            </button>
            <button
              onClick={() => setSection(3)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <span>Continuar</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Section 3: El Patrón Universal */}
      {section === 3 && (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            El Patrón Universal
          </h2>

          <p className="text-lg text-slate-700 mb-6">
            Hemos analizado <strong>15 casos de empresas transformadoras</strong>. 
            Cada uno de industria diferente. País diferente. Época diferente.
          </p>

          <p className="text-lg text-slate-700 mb-8">
            Pero <strong>el patrón es idéntico.</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="font-bold text-red-900 mb-4 text-lg">
                ❌ EMPRESAS SIN VISIÓN CLARA:
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>✅ Buenos productos</li>
                <li>✅ Trabajo duro</li>
                <li>✅ Ejecución competente</li>
                <li>❌ Sin norte claro</li>
              </ul>
              <div className="mt-4 p-4 bg-white rounded">
                <p className="font-semibold text-slate-900">Resultado:</p>
                <p className="text-slate-700">Crecimiento lineal predecible</p>
                <p className="text-slate-600 text-sm">Revenue techo: $50-200M</p>
              </div>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="font-bold text-green-900 mb-4 text-lg">
                ✅ EMPRESAS CON VISIÓN BHAG desde día 1:
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>✅ Buenos productos (igual que otros)</li>
                <li>✅ Trabajo duro (igual que otros)</li>
                <li>✅ Ejecución competente (igual que otros)</li>
                <li>✅✅✅ VISIÓN CLARA que guía TODO</li>
              </ul>
              <div className="mt-4 p-4 bg-white rounded">
                <p className="font-semibold text-slate-900">Resultado:</p>
                <p className="text-slate-700">Crecimiento exponencial impredecible</p>
                <p className="text-slate-600 text-sm">Revenue sin techo: $1B-$100B+</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              LA DIFERENCIA NO ES:
            </p>
            <p className="text-blue-800 mt-2">
              ❌ Más capital inicial (muchos empezaron sin inversión)
              <br />❌ Mejor producto (competidores tenían productos comparables)
              <br />❌ Suerte o timing (enfrentaron crisis masivas)
              <br />❌ Conexiones (muchos empezaron como outsiders)
            </p>
            <p className="text-lg font-semibold text-blue-900 mt-4">
              LA DIFERENCIA ES:
            </p>
            <p className="text-blue-800 mt-2 text-lg">
              ✅ VISIÓN CLARA desde día 1
              <br />✅ BHAG que guió cada decisión durante décadas
              <br />✅ Propósito más grande que ganancia personal
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSection(2)}
              className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-lg hover:border-slate-400 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Anterior</span>
            </button>
            <button
              onClick={() => setSection(4)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <span>Evaluar mi situación</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Section 4-5: Calculadora ROI */}
      {(section === 4 || section === 5) && (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Calculadora: ¿Cuánto te está costando NO tener Visión Clara?
          </h2>

          <p className="text-lg text-slate-700 mb-8">
            Responde honestamente. <strong>Nadie más ve esto.</strong>
            <br />
            Escala 1-10 donde 1 = "totalmente confuso" y 10 = "cristalina claridad"
          </p>

          <div className="space-y-6 mb-8">
            {/* Question 1 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                1. Claridad de Visión
              </label>
              <p className="text-slate-600 mb-3">
                ¿Qué tan clara es tu visión empresarial?
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
                <span>1 - Confuso</span>
                <span className="font-bold text-blue-600 text-lg">{responses.clarity}</span>
                <span>10 - Cristalino</span>
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                2. Velocidad de Decisiones Estratégicas
              </label>
              <p className="text-slate-600 mb-3">
                ¿Qué tan rápido tomas decisiones estratégicas importantes?
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
                <span>1 - Paralizante</span>
                <span className="font-bold text-blue-600 text-lg">{responses.decisionSpeed}</span>
                <span>10 - Instantáneas</span>
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                3. Alineación de Equipo
              </label>
              <p className="text-slate-600 mb-3">
                ¿Tu equipo entiende hacia dónde van?
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
                <span>1 - Cada quien rema distinto</span>
                <span className="font-bold text-blue-600 text-lg">{responses.teamAlignment}</span>
                <span>10 - Totalmente alineados</span>
              </div>
            </div>

            {/* Question 4 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                4. Enfoque de Recursos
              </label>
              <p className="text-slate-600 mb-3">
                ¿Tus recursos (tiempo/dinero/equipo) se enfocan en lo que realmente importa?
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
                <span>1 - Dispersos</span>
                <span className="font-bold text-blue-600 text-lg">{responses.resourceFocus}</span>
                <span>10 - Láser focus</span>
              </div>
            </div>

            {/* Question 5 */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                5. Energía Sostenida
              </label>
              <p className="text-slate-600 mb-3">
                ¿Tu visión te da energía sostenida o te agota?
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
                <span>1 - Me agota</span>
                <span className="font-bold text-blue-600 text-lg">{responses.sustainedEnergy}</span>
                <span>10 - Me energiza</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSection(3)}
              className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-lg hover:border-slate-400 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Anterior</span>
            </button>
            <button
              onClick={() => setSection(5)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <span>Ver mi resultado</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Section 6: Resultados */}
      {section === 6 && (
        <div className="space-y-6">
          {/* Interpretation */}
          <div className={`bg-white rounded-xl shadow-sm p-8 border-4 ${
            interpretation.color === 'red' ? 'border-red-500' :
            interpretation.color === 'yellow' ? 'border-yellow-500' :
            'border-green-500'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              {interpretation.icon}
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {interpretation.zone}
                </h2>
                <p className="text-slate-600">
                  Promedio: <span className="font-bold text-2xl">{average.toFixed(1)}/10</span>
                </p>
              </div>
            </div>

            <p className="text-lg text-slate-700 mb-6">
              {interpretation.message}
            </p>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Tu costo anual estimado de NO tener visión clara:
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-semibold text-slate-900">Costo de indecisión</p>
                  <p className="text-sm text-slate-600">~160 horas/año desperdiciadas</p>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  ${indecisionCostPerYear.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-semibold text-slate-900">Desperdicio de presupuesto</p>
                  <p className="text-sm text-slate-600">Proyectos sin criterio claro</p>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  ${wastedBudget.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-semibold text-slate-900">Oportunidades perdidas</p>
                  <p className="text-sm text-slate-600">70%+ de decisiones subóptimas</p>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  ${lostOpportunities.toLocaleString()}
                </p>
              </div>

              <div className="border-t-2 border-slate-300 pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-slate-900">TOTAL CONSERVADOR:</p>
                  <p className="text-3xl font-bold text-red-600">
                    ${totalCost.toLocaleString()}/año
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Multiplicador de impacto:</strong> {roi}x
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Con visión cristalina: Diferencia entre buena empresa y líder de industria
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para crear tu Visión Clara?
            </h3>
            <p className="text-orange-100 mb-6 text-lg">
              Los próximos 7 componentes te guiarán paso a paso para construir 
              una visión empresarial cristalina, inquebrantable y contagiosa.
            </p>
            <p className="text-orange-100 mb-6">
              <strong>Inversión:</strong> $10 pago único. Acceso de por vida.
            </p>
            
            <button
              onClick={saveProgress}
              disabled={saving}
              className="w-full bg-white text-orange-600 font-bold py-4 rounded-lg hover:bg-orange-50 transition text-lg disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Desbloquear Módulo Completo - $10'}
            </button>

            <p className="text-center text-orange-100 text-sm mt-4">
              O continúa explorando gratis
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSection(4)}
              className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-lg hover:border-slate-400 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Revisar respuestas</span>
            </button>
            <button
              onClick={saveProgress}
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{saving ? 'Guardando...' : 'Completar Componente 1'}</span>
              <CheckCircle2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
