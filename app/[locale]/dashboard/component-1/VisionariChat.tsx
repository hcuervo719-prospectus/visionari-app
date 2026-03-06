// app/[locale]/dashboard/component-1/VisionariChat.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Send, Loader2 } from 'lucide-react'
import { 
  sendToVisionari, 
  extractInsights, 
  determineNextComponent,
  type Message, 
  type UserContext 
} from '@/lib/visionari-assistant'

interface Props {
  userId: string
  userName: string
  locale: string
}

export default function VisionariChat({ userId, userName, locale }: Props) {
  const t = useTranslations('component1')
  
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [context, setContext] = useState<UserContext>({
    userId,
    name: userName,
    insights: [],
    completedSteps: []
  })
  const [sessionComplete, setSessionComplete] = useState(false)
  const [recommendedComponent, setRecommendedComponent] = useState<number | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Mensaje inicial de Visionari
  useEffect(() => {
    const initialMessage: Message = {
      id: 'initial',
      role: 'assistant',
      content: `Hola ${userName}, soy Visionari, tu asistente personal para crear y desarrollar tu visión empresarial.

Antes de empezar, cuéntame: ¿Qué te trae aquí hoy? ¿Qué desafío o pregunta tienes en mente?`,
      timestamp: new Date()
    }
    setMessages([initialMessage])
  }, [userName])

  async function handleSend() {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Llamar a Visionari
      const response = await sendToVisionari(
        userMessage.content,
        context,
        messages
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      // Extraer insights
      const updates = extractInsights(userMessage.content, response, context)
      const updatedContext = { ...context, ...updates }
      setContext(updatedContext)

      // Guardar progreso en backend
      await saveProgress(updatedContext, [...messages, userMessage, assistantMessage])

      // Verificar si la sesión está completa (después de 5-7 intercambios)
      const userMessagesCount = messages.filter(m => m.role === 'user').length + 1
      if (userMessagesCount >= 5) {
        const nextComponent = determineNextComponent(updatedContext)
        setRecommendedComponent(nextComponent)
        setSessionComplete(true)
      }

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Disculpa, tuve un problema técnico. ¿Podrías repetir tu último mensaje?',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  async function saveProgress(context: UserContext, messages: Message[]) {
    await fetch('/api/component/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        componentNumber: 1,
        data: {
          context,
          messages,
          completedAt: sessionComplete ? new Date().toISOString() : null
        },
        progressPercentage: sessionComplete ? 100 : 50
      })
    })
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            🎯
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <p className="text-blue-100">Conversación con tu asistente personal</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white shadow-sm rounded-b-xl">
        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  🎯
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString(locale, {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  👤
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                🎯
              </div>
              <div className="bg-slate-100 rounded-2xl px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Session Complete */}
        {sessionComplete && recommendedComponent && (
          <div className="border-t border-slate-200 p-6 bg-gradient-to-r from-green-50 to-blue-50">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              ✅ Sesión Componente 1 Completada
            </h3>
            <p className="text-slate-700 mb-4">
              Basado en nuestra conversación, he identificado que tu siguiente paso es:
            </p>
            <div className="bg-white border-2 border-blue-600 rounded-lg p-4 mb-4">
              <h4 className="font-bold text-blue-900">
                Componente {recommendedComponent}: {getComponentName(recommendedComponent)}
              </h4>
              <p className="text-slate-600 mt-2">
                {getComponentReason(recommendedComponent, context.insights)}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.href = `/${locale}/dashboard/component-${recommendedComponent}`}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Ir a Componente {recommendedComponent}
              </button>
              <button
                onClick={() => window.location.href = `/${locale}/dashboard`}
                className="border-2 border-slate-300 text-slate-700 py-3 px-6 rounded-lg hover:border-slate-400 transition font-semibold"
              >
                Volver al Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        {!sessionComplete && (
          <div className="border-t border-slate-200 p-4">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu respuesta..."
                disabled={loading}
                className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Presiona Enter para enviar • Shift+Enter para nueva línea
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function getComponentName(num: number): string {
  const names: Record<number, string> = {
    2: 'Visión Clara',
    3: 'Metas Tangibles',
    4: 'Estrategia Proactiva',
    5: 'Ambición Desafiante',
    6: 'Compromiso Inquebrantable',
    7: 'Energía Contagiosa',
    8: 'Documento Final'
  }
  return names[num] || 'Visión Clara'
}

function getComponentReason(num: number, insights: string[]): string {
  const reasons: Record<number, string> = {
    2: 'Necesitas definir con mayor claridad tu visión empresarial.',
    3: 'Tienes ideas dispersas que necesitan convertirse en objetivos concretos.',
    4: 'Tu visión actual es reactiva - necesitas construir hacia algo, no huir de algo.',
    5: 'Necesitas elevar tu nivel de ambición y pensar más grande.',
    6: 'Tienes la visión, ahora necesitas el compromiso inquebrantable.',
    7: 'Tu visión necesita ser contagiosa para inspirar a otros.',
    8: 'Estás listo para consolidar todo en tu documento de visión.'
  }
  return reasons[num] || reasons[2]
}
