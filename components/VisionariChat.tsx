// components/VisionariChat.tsx
// Unified chat component for Visionari assistant
// Replaces all component-specific chat implementations
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Props {
  userId: string
  userName: string
  locale: string
}

export default function VisionariChat({ userId, userName, locale }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isFirstMessage, setIsFirstMessage] = useState(true)
  const [primaryFrame, setPrimaryFrame] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const sessionClosedRef = useRef(false)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Opening message on mount
  useEffect(() => {
    const firstName = userName.split(' ')[0]
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: getWelcomeMessage(firstName, locale),
      timestamp: new Date(),
    }])
    inputRef.current?.focus()
  }, [userName, locale])

  // Close session when user leaves
  const closeSession = useCallback(async () => {
    if (!sessionId || sessionClosedRef.current) return
    sessionClosedRef.current = true
    try {
      await fetch('/api/assistant/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
    } catch {
      // Fire and forget — don't block the user
    }
  }, [sessionId])

  useEffect(() => {
    window.addEventListener('beforeunload', closeSession)
    return () => {
      window.removeEventListener('beforeunload', closeSession)
      closeSession()
    }
  }, [closeSession])

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          isFirstMessage,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Request failed')
      }

      const data = await res.json()

      // Store session metadata from first response
      if (isFirstMessage) {
        setSessionId(data.sessionId)
        setPrimaryFrame(data.primaryFrame)
        setIsFirstMessage(false)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getFallbackMessage(locale),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-resize textarea
  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">V</span>
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-900'
              }`}
            >
              {/* Render line breaks */}
              {message.content.split('\n').map((line, i) => (
                <p key={i} className={`${i > 0 ? 'mt-2' : ''} leading-relaxed text-sm`}>
                  {line || <br />}
                </p>
              ))}
              <span className="text-xs opacity-40 mt-2 block">
                {message.timestamp.toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-slate-600 text-xs font-bold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white px-4 py-4">
        <div className="flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder(locale)}
            disabled={loading}
            rows={1}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
              disabled:opacity-50 resize-none overflow-hidden leading-relaxed"
            style={{ minHeight: '48px', maxHeight: '160px' }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-slate-900 text-white p-3 rounded-xl
              hover:bg-slate-800 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          {getHint(locale)}
        </p>
      </div>
    </div>
  )
}

// ─── LOCALIZED STRINGS ────────────────────────────────────────────────────────

function getWelcomeMessage(name: string, locale: string): string {
  const messages: Record<string, string> = {
    es: `Hola ${name}. Soy Visionari.\n\n¿Qué está pasando en tu empresa esta semana?`,
    en: `Hi ${name}. I'm Visionari.\n\nWhat's going on in your business this week?`,
    pt: `Olá ${name}. Sou o Visionari.\n\nO que está acontecendo na sua empresa esta semana?`,
    fr: `Bonjour ${name}. Je suis Visionari.\n\nQue se passe-t-il dans votre entreprise cette semaine ?`,
    de: `Hallo ${name}. Ich bin Visionari.\n\nWas ist diese Woche in Ihrem Unternehmen los?`,
    it: `Ciao ${name}. Sono Visionari.\n\nCosa sta succedendo nella tua azienda questa settimana?`,
    nl: `Hallo ${name}. Ik ben Visionari.\n\nWat speelt er deze week in jouw bedrijf?`,
    pl: `Cześć ${name}. Jestem Visionari.\n\nCo się dzieje w Twoim biznesie w tym tygodniu?`,
    no: `Hei ${name}. Jeg er Visionari.\n\nHva skjer i bedriften din denne uken?`,
    sv: `Hej ${name}. Jag är Visionari.\n\nVad händer i ditt företag den här veckan?`,
    ja: `こんにちは、${name}さん。Visionariです。\n\n今週、ビジネスで何が起きていますか？`,
    ko: `안녕하세요, ${name}님. Visionari입니다.\n\n이번 주 비즈니스에서 무슨 일이 있나요?`,
    hi: `नमस्ते ${name}। मैं Visionari हूं।\n\nइस हफ्ते आपके व्यवसाय में क्या हो रहा है?`,
    id: `Halo ${name}. Saya Visionari.\n\nApa yang sedang terjadi di bisnis Anda minggu ini?`,
    ru: `Привет, ${name}. Я Visionari.\n\nЧто происходит в вашем бизнесе на этой неделе?`,
    tr: `Merhaba ${name}. Ben Visionari.\n\nBu hafta işletmende neler oluyor?`,
  }
  const lang = locale.split('-')[0]
  return messages[lang] || messages['en']
}

function getFallbackMessage(locale: string): string {
  const messages: Record<string, string> = {
    es: 'Tuve un problema técnico. ¿Puedes repetir tu último mensaje?',
    en: 'I ran into a technical issue. Could you repeat your last message?',
    pt: 'Tive um problema técnico. Pode repetir sua última mensagem?',
    fr: 'J\'ai eu un problème technique. Pouvez-vous répéter votre dernier message ?',
    de: 'Ich hatte ein technisches Problem. Könnten Sie Ihre letzte Nachricht wiederholen?',
  }
  const lang = locale.split('-')[0]
  return messages[lang] || messages['en']
}

function getPlaceholder(locale: string): string {
  const placeholders: Record<string, string> = {
    es: 'Escribe tu mensaje...',
    en: 'Type your message...',
    pt: 'Digite sua mensagem...',
    fr: 'Écrivez votre message...',
    de: 'Nachricht eingeben...',
    it: 'Scrivi il tuo messaggio...',
    nl: 'Typ je bericht...',
    pl: 'Wpisz swoją wiadomość...',
    no: 'Skriv meldingen din...',
    sv: 'Skriv ditt meddelande...',
    ja: 'メッセージを入力...',
    ko: '메시지를 입력하세요...',
    hi: 'अपना संदेश लिखें...',
    id: 'Ketik pesan Anda...',
    ru: 'Введите сообщение...',
    tr: 'Mesajınızı yazın...',
  }
  const lang = locale.split('-')[0]
  return placeholders[lang] || placeholders['en']
}

function getHint(locale: string): string {
  const hints: Record<string, string> = {
    es: 'Enter para enviar · Shift+Enter para nueva línea',
    en: 'Enter to send · Shift+Enter for new line',
    pt: 'Enter para enviar · Shift+Enter para nova linha',
    fr: 'Entrée pour envoyer · Shift+Entrée pour nouvelle ligne',
    de: 'Enter zum Senden · Shift+Enter für neue Zeile',
  }
  const lang = locale.split('-')[0]
  return hints[lang] || hints['en']
}
