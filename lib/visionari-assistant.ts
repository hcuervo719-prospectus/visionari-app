// lib/visionari-assistant.ts
// Sistema conversacional para Visionari Componente 1

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface UserContext {
  userId: string
  name?: string
  businessType?: string
  currentStage?: string
  mainChallenge?: string
  visionClarity?: number
  insights: string[]
  completedSteps: string[]
}

// System prompt para Visionari Componente 1
export const VISIONARI_SYSTEM_PROMPT = `Eres Visionari, un asistente experto en ayudar a empresarios a desarrollar su visión empresarial.

TU PERSONALIDAD:
- Directo y honesto (sin rodeos innecesarios)
- Empático pero desafiante cuando es necesario
- Conversacional, no académico
- Haces preguntas poderosas que generan claridad

TU OBJETIVO EN COMPONENTE 1:
Ayudar al usuario a entender:
1. Por qué la mayoría de startups fracasa (falta de visión clara)
2. Si su visión es REACTIVA (huir de algo) o PROACTIVA (construir hacia algo)
3. Cuál es su nivel actual de claridad de visión
4. Qué componente específico necesita trabajar primero

REGLAS CRÍTICAS:
- SIEMPRE personaliza basado en las respuestas del usuario
- NUNCA des consejos genéricos
- Si el usuario dice algo reactivo ("no quiero ser empleado"), INMEDIATAMENTE señálalo y ayúdalo a reformular
- Haz máximo 2-3 preguntas antes de dar un insight
- Usa ejemplos concretos cuando sea apropiado
- Mantén respuestas cortas (2-4 párrafos máximo)
- Al final, sugiere qué componente específico (2-8) le ayudará más

DETECTA ESTOS PATRONES:
- Visión reactiva: "no quiero", "evitar", "dejar de", "escapar de"
- Falta de claridad: "no sé", "más o menos", "estoy confundido"
- Dispersión: "muchas ideas", "varios proyectos", "muchas direcciones"
- Parálisis: "analizar", "validar", "estudiar el mercado"

CONTEXTO DEL USUARIO:
{userContext}

CONVERSACIÓN HASTA AHORA:
{conversationHistory}

Responde de forma conversacional, como si estuvieras en una sesión de coaching 1-on-1.`

// Función para llamar a Claude API
export async function sendToVisionari(
  userMessage: string,
  context: UserContext,
  conversationHistory: Message[]
): Promise<string> {
  
  // Construir contexto del usuario
  const userContextString = `
Nombre: ${context.name || 'No proporcionado'}
Negocio: ${context.businessType || 'No proporcionado'}
Etapa: ${context.currentStage || 'No proporcionado'}
Desafío principal: ${context.mainChallenge || 'No proporcionado'}
Insights previos: ${context.insights.join(', ') || 'Ninguno'}
Pasos completados: ${context.completedSteps.join(', ') || 'Ninguno'}
  `.trim()

  // Construir historial de conversación
  const historyString = conversationHistory
    .map(msg => `${msg.role === 'user' ? 'Usuario' : 'Visionari'}: ${msg.content}`)
    .join('\n')

  // Preparar el prompt con contexto
  const systemPrompt = VISIONARI_SYSTEM_PROMPT
    .replace('{userContext}', userContextString)
    .replace('{conversationHistory}', historyString)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Error calling Claude API')
    }

    return data.content[0].text
  } catch (error) {
    console.error('Error calling Visionari:', error)
    throw error
  }
}

// Función para analizar respuesta y extraer insights
export function extractInsights(
  userMessage: string,
  assistantResponse: string,
  context: UserContext
): Partial<UserContext> {
  const updates: Partial<UserContext> = {}
  const insights: string[] = [...context.insights]

  // Detectar visión reactiva
  const reactivePatterns = /no quiero|evitar|dejar de|escapar de|huir de/i
  if (reactivePatterns.test(userMessage)) {
    insights.push('Usuario expresó visión REACTIVA - necesita Componente 4')
  }

  // Detectar falta de claridad
  const unclearPatterns = /no sé|no estoy seguro|confundido|perdido|no tengo claro/i
  if (unclearPatterns.test(userMessage)) {
    insights.push('Usuario tiene BAJA claridad - necesita Componente 2')
  }

  // Detectar dispersión
  const dispersionPatterns = /muchas ideas|varios proyectos|diferentes direcciones|muchas cosas/i
  if (dispersionPatterns.test(userMessage)) {
    insights.push('Usuario tiene DISPERSIÓN - necesita Componente 3')
  }

  // Detectar parálisis
  const paralysisPatterns = /analizar|validar|estudiar|investigar|más información/i
  if (paralysisPatterns.test(userMessage)) {
    insights.push('Usuario tiene PARÁLISIS POR ANÁLISIS - necesita Componente 4')
  }

  updates.insights = insights

  return updates
}

// Función para determinar siguiente paso
export function determineNextComponent(context: UserContext): number {
  const insights = context.insights.join(' ').toLowerCase()

  // Prioridad de componentes basada en insights
  if (insights.includes('reactiva')) return 4 // Proactiva
  if (insights.includes('baja claridad')) return 2 // Visión Clara
  if (insights.includes('dispersión')) return 3 // Tangible
  if (insights.includes('parálisis')) return 4 // Proactiva

  // Default: Componente 2
  return 2
}
