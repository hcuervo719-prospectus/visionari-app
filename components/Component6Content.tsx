'use client';

import ComponentTemplate, { ComponentConfig } from '@/components/ComponentTemplate';

const config: ComponentConfig = {
  number: 6,
  title: 'Inquebrantable',
  subtitle: 'La visión que sobrevive la tormenta',
  tag: 'COMPONENTE 6',
  color: 'rose',
  icon: '🛡️',
  supabaseField: 'component_6_data',
  nextComponent: 7,
  exerciseTitle: 'Fortifica tu Visión',
  exerciseDescription: 'Una visión inquebrantable tiene raíces profundas. Define el "por qué" que no te podrán quitar.',
  completionMessage: 'Tu visión ahora tiene un núcleo que resistirá los momentos difíciles. Y los habrá.',
  educationalSections: [
    {
      id: 'why_matters',
      title: 'Por qué la mayoría abandona su visión',
      content: (
        <div className="space-y-4">
          <p>
            La mayoría de emprendedores abandona su visión no porque sea incorrecta — sino porque <strong className="text-white">no tiene raíces lo suficientemente profundas para sobrevivir la tormenta.</strong>
          </p>
          <p>Todo proyecto enfrenta momentos donde la lógica dice "rinde". La financiación se agota. Los clientes no llegan. El equipo pierde fe. El mercado cambia.</p>
          <div className="bg-rose-950 border border-rose-800 rounded-xl p-4">
            <p className="text-rose-300 font-semibold mb-2">Los 5 obstáculos que destruyen visiones frágiles:</p>
            <div className="space-y-1">
              {[
                '1. Falta de dinero en el momento crítico',
                '2. Rechazo del mercado en las primeras fases',
                '3. Traición de socios o equipo clave',
                '4. Competencia con más recursos aparece',
                '5. La propia duda en las noches de crisis',
              ].map((obs) => (
                <p key={obs} className="text-gray-400 text-sm">{obs}</p>
              ))}
            </div>
          </div>
          <p>La diferencia entre quien persiste y quien abandona no es talento ni recursos. Es la profundidad del <strong className="text-white">porqué.</strong></p>
        </div>
      ),
    },
    {
      id: 'pillars',
      title: 'Los 3 Pilares de una Visión Inquebrantable',
      content: (
        <div className="space-y-4">
          {[
            {
              pillar: '🌳 Raíz: El Propósito Existencial',
              desc: '¿Por qué existe esta empresa más allá del dinero? ¿Qué vacío en el mundo llena? Cuando esto está claro, ningún obstáculo es suficiente para detenerla.',
              example: 'Apple no existía para vender computadoras. Existía para "poner una herramienta creativa en manos de cada persona". Eso sobrevivió la casi quiebra de 1997.',
            },
            {
              pillar: '⚓ Ancla: Los Valores No Negociables',
              desc: '¿Qué principios nunca sacrificarás, aunque cueste dinero o crecimiento? Estos definen qué eres cuando nadie te ve y cuando todo sale mal.',
              example: 'Patagonia rechaza contratos millonarios que violenten su compromiso ambiental. No es PR. Es su ancla real.',
            },
            {
              pillar: '🔥 Combustible: El Impacto Humano',
              desc: '¿A quién transforma concretamente lo que haces? Tener la cara de esa persona en tu mente en los momentos difíciles es más poderoso que cualquier plan de negocio.',
              example: 'Cuando Starbucks estaba en crisis, Schultz volvió a las historias de baristas y clientes. No a las métricas. Al impacto humano.',
            },
          ].map((item) => (
            <div key={item.pillar} className="bg-gray-900 rounded-xl p-4 border-l-4 border-rose-500">
              <p className="text-rose-300 font-semibold mb-2">{item.pillar}</p>
              <p className="text-gray-300 text-sm mb-2">{item.desc}</p>
              <p className="text-gray-500 text-xs italic">{item.example}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'test',
      title: 'El Test de los 7 Niveles de Por Qué',
      content: (
        <div className="space-y-4">
          <p>Esta técnica expone si tu visión tiene raíces reales o es superficial:</p>
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-gray-300 text-sm mb-3">Empieza con tu visión y pregunta "¿Por qué?" hasta llegar al nivel 7:</p>
            <div className="space-y-2">
              {[
                { n: '1', q: '¿Por qué quiero esto?', a: '"Quiero que mi empresa sea referente en LATAM"' },
                { n: '2', q: '¿Por qué es importante?', a: '"Porque quiero impactar más vidas"' },
                { n: '3', q: '¿Por qué impactar más vidas?', a: '"Porque vi cómo el no tener visión destruyó negocios de personas que amaba"' },
                { n: '4', q: '¿Por qué te importa eso?', a: '"Porque esas personas sacrificaron tiempo y familia por un sueño que fracasó"' },
                { n: '5', q: '¿Por qué eso te mueve?', a: '"Porque yo mismo estuve ahí. Y encontré la salida."' },
                { n: '6', q: '¿Qué cambiaría si lo resolvieras?', a: '"Miles de familias vivirían diferente"' },
                { n: '7', q: '¿Por qué TÚ y no otro?', a: '"Porque viví el problema y encontré el camino. Es mi deber pasarlo."' },
              ].map((item) => (
                <div key={item.n} className="flex gap-3">
                  <span className="text-rose-400 font-bold text-xs w-4 shrink-0 mt-1">{item.n}</span>
                  <div>
                    <p className="text-rose-300 text-xs">{item.q}</p>
                    <p className="text-gray-400 text-xs italic">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-rose-300 text-sm">En el nivel 7 encuentras el núcleo inquebrantable. Eso es lo que te levanta cuando todo sale mal.</p>
        </div>
      ),
    },
  ],
  fields: [
    {
      id: 'core_why',
      label: '🌳 Tu Propósito Profundo (¿por qué existe esta empresa más allá del dinero?)',
      placeholder: 'Esta empresa existe porque... / El mundo necesita esto porque...',
      type: 'textarea',
      rows: 3,
    },
    {
      id: 'non_negotiables',
      label: '⚓ Tus 3 valores no negociables (que nunca sacrificarás)',
      placeholder: '1. ___  2. ___  3. ___',
      type: 'textarea',
      rows: 3,
    },
    {
      id: 'human_impact',
      label: '🔥 ¿A quién transforma concretamente lo que haces? Describe esa persona.',
      placeholder: 'Es [nombre/perfil]. Tenía [problema]. Con nuestra solución, ahora...',
      type: 'textarea',
      rows: 3,
    },
    {
      id: 'level_7_why',
      label: '💎 Tu "Nivel 7": La razón más profunda por la que NO abandonarás',
      placeholder: 'Cuando todo salga mal, voy a recordar que...',
      type: 'textarea',
      rows: 3,
    },
  ],
};

export default function Component6Content({ locale }: { locale: string }) {
  return <ComponentTemplate config={config} locale={locale} />;
}
