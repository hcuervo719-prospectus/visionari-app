'use client';

import ComponentTemplate, { ComponentConfig } from '@/components/ComponentTemplate';

const config: ComponentConfig = {
  number: 4,
  title: 'Proactiva',
  subtitle: 'Enfocada en crear, no en evitar',
  tag: 'COMPONENTE 4',
  color: 'emerald',
  icon: '⚡',
  supabaseField: 'component_4_data',
  nextComponent: 5,
  exerciseTitle: 'Transforma tu Visión a Proactiva',
  exerciseDescription: 'Revisa tu visión de los componentes anteriores. ¿Está definida por lo que CREAS o por lo que EVITAS?',
  completionMessage: 'Tu visión ahora apunta hacia lo que creas, no hacia lo que temes. Esa diferencia es enorme.',
  educationalSections: [
    {
      id: 'reactive',
      title: 'El error más común: visiones reactivas',
      content: (
        <div className="space-y-4">
          <p>
            La mayoría de empresarios define su visión huyendo de algo. El problema: <strong className="text-white">tu cerebro no puede correr hacia "no".</strong>
          </p>
          <div className="bg-red-950 border border-red-800 rounded-xl p-4">
            <p className="text-red-300 font-semibold mb-3">❌ Visiones reactivas (basadas en EVITAR):</p>
            <div className="space-y-1">
              {[
                '"No quiero depender de un solo cliente"',
                '"No quiero que la competencia me devore"',
                '"No quiero seguir con estos márgenes tan bajos"',
                '"No quiero que mis empleados sigan renunciando"',
              ].map((v) => (
                <p key={v} className="text-gray-400 text-sm">• {v}</p>
              ))}
            </div>
          </div>
          <p>
            Cuando dices "no quiero ser devorado por la competencia"... tu cerebro <em>visualiza</em> ser devorado. Activa el circuito del miedo. Tomas decisiones defensivas.
          </p>
          <p className="text-emerald-300">
            Una visión proactiva apunta hacia algo que CREAS, no hacia algo que EVITAS.
          </p>
        </div>
      ),
    },
    {
      id: 'transform',
      title: 'Cómo transformar visión reactiva → proactiva',
      content: (
        <div className="space-y-4">
          <p>Es un proceso de 3 pasos:</p>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl p-4">
              <p className="text-emerald-400 font-bold mb-2">Paso 1: Identifica la señal reactiva</p>
              <p className="text-gray-300 text-sm">Busca estas palabras en tu visión: "no", "evitar", "dejar de", "proteger de", "sin". Cada una es una señal de reactividad.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4">
              <p className="text-emerald-400 font-bold mb-2">Paso 2: Pregunta "¿Qué quiero EN CAMBIO?"</p>
              <p className="text-gray-300 text-sm">No "no quiero depender de un cliente" → "¿Qué QUIERO? Una cartera diversificada de 200+ clientes donde el mayor representa máximo 5% del revenue."</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4">
              <p className="text-emerald-400 font-bold mb-2">Paso 3: Reformula hacia la creación</p>
              <p className="text-gray-300 text-sm">Reescribe la frase apuntando al resultado positivo que CONSTRUYES, no al problema que EVITAS.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'examples',
      title: 'Transformaciones reales: reactiva → proactiva',
      content: (
        <div className="space-y-3">
          {[
            {
              before: '"No quiero seguir siendo desconocido"',
              after: '"Para 2027, somos la referencia #1 en formación de visión empresarial en LATAM, con 100K seguidores que nos buscan activamente."',
            },
            {
              before: '"No quiero depender de un solo producto"',
              after: '"Construimos 3 líneas de producto que generan revenue independiente, creando un portafolio antifrágil."',
            },
            {
              before: '"No quiero perder frente a la competencia"',
              after: '"Creamos una categoría propia donde somos los únicos. La competencia no existe porque no hay nadie más haciendo esto."',
            },
          ].map((ex, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-4">
              <p className="text-red-400 text-sm mb-2">❌ {ex.before}</p>
              <p className="text-emerald-400 text-sm">✅ {ex.after}</p>
            </div>
          ))}
          <p className="text-gray-400 text-sm text-center mt-2">¿Sientes la diferencia de energía entre ambas?</p>
        </div>
      ),
    },
  ],
  fields: [
    {
      id: 'reactive_version',
      label: '🔍 Tu visión actual (copia lo que escribiste en C2 o C3)',
      placeholder: 'Pega aquí tu visión tal como está ahora...',
      type: 'textarea',
      rows: 3,
    },
    {
      id: 'reactive_signals',
      label: '⚠️ ¿Identificaste señales reactivas? ¿Cuáles?',
      placeholder: 'Encontré estas palabras/frases reactivas: ...',
      type: 'text',
    },
    {
      id: 'proactive_version',
      label: '⚡ Tu visión PROACTIVA (reescrita hacia lo que CREAS)',
      placeholder: 'Construimos / Creamos / Logramos / Somos... [visión en positivo]',
      type: 'textarea',
      rows: 4,
    },
  ],
};

export default function Component4Content({ locale }: { locale: string }) {
  return <ComponentTemplate config={config} locale={locale} />;
}
