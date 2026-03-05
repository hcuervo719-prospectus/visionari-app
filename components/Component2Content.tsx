'use client';

import ComponentTemplate, { ComponentConfig } from '@/components/ComponentTemplate';

const config: ComponentConfig = {
  number: 2,
  title: 'Visión Clara',
  subtitle: 'De lo abstracto a lo concreto y tangible',
  tag: 'COMPONENTE 2',
  color: 'purple',
  icon: '🎯',
  supabaseField: 'component_2_data',
  nextComponent: 3,
  exerciseTitle: 'Define Tu Visión Clara',
  exerciseDescription: 'Escribe tu visión usando los principios de tangibilidad que acabas de aprender. Sé específico: cifras, fechas, impacto real.',
  completionMessage: 'Tu visión ya tiene forma concreta. El siguiente paso es hacerla tangible con métricas reales.',
  educationalSections: [
    {
      id: 'intro',
      title: '¿Por qué la mayoría de visiones son inútiles?',
      content: (
        <div className="space-y-4">
          <p>
            "Quiero ser el mejor en mi industria." "Impactar a millones de personas." "Ser líder del mercado."
          </p>
          <p>
            Estas frases suenan inspiradoras. El problema: <strong className="text-white">son completamente inútiles para guiar decisiones reales.</strong>
          </p>
          <div className="bg-red-950 border border-red-800 rounded-xl p-4">
            <p className="text-red-300 font-semibold mb-2">❌ Visión vaga (la mayoría):</p>
            <p className="text-gray-300 italic">"Quiero construir una empresa que ayude a las personas a ser mejores versiones de sí mismas."</p>
            <p className="text-red-400 text-sm mt-2">Pregunta: ¿Cuándo sabrás que lo lograste? ¿Qué decisión concreta te indica esta visión?</p>
          </div>
          <div className="bg-emerald-950 border border-emerald-800 rounded-xl p-4">
            <p className="text-emerald-300 font-semibold mb-2">✅ Visión clara (lo que construirás):</p>
            <p className="text-gray-300 italic">"Para 2028, nuestra plataforma tiene 50,000 empresarios en 8 países que aumentaron su revenue promedio 3x en 18 meses, con NPS de 70+."</p>
            <p className="text-emerald-400 text-sm mt-2">Esta visión te dice exactamente qué construir, a quién servir, y cuándo llegaste.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'elements',
      title: 'Los 5 Elementos de una Visión Tangible',
      content: (
        <div className="space-y-4">
          <p>Una visión poderosa tiene estos 5 elementos. Puedes recordarlos con <strong className="text-white">EMVTE</strong>:</p>
          <div className="space-y-3">
            {[
              { letter: 'E', name: 'Específica', desc: 'No "muchos clientes" sino "10,000 clientes en Colombia"' },
              { letter: 'M', name: 'Medible', desc: 'Con números reales: revenue, usuarios, países, NPS' },
              { letter: 'V', name: 'Visual', desc: 'Puedes imaginarte el día que lo logras. Lo ves concreto.' },
              { letter: 'T', name: 'Temporal', desc: 'Tiene una fecha. "Para diciembre 2027..." no "algún día"' },
              { letter: 'E', name: 'Emocional', desc: 'Cuando la dices, sientes algo. No es solo lógica.' },
            ].map((item) => (
              <div key={item.letter} className="flex gap-3 bg-gray-900 rounded-xl p-3">
                <span className="text-purple-400 font-bold text-lg w-6 shrink-0">{item.letter}</span>
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'cases',
      title: 'Cómo lo hicieron las empresas transformadoras',
      content: (
        <div className="space-y-4">
          <p>Las empresas que estudiamos en "No Fue Casualidad" no tenían visiones vagas. Tenían imágenes mentales precisas desde el primer día.</p>
          <div className="space-y-3">
            <div className="bg-gray-900 rounded-xl p-4 border-l-4 border-purple-500">
              <p className="text-purple-300 font-semibold">Amazon — 1994</p>
              <p className="text-gray-300 text-sm mt-1">Bezos no dijo "vender cosas online". Su visión: <em>"La tienda más grande del mundo donde puedas encontrar cualquier cosa."</em> Específico. Sin fecha pero con escala clara: TODO.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border-l-4 border-purple-500">
              <p className="text-purple-300 font-semibold">Tesla — 2006</p>
              <p className="text-gray-300 text-sm mt-1">El "Master Plan" de Musk era específico: primero Roadster (caro), luego Model S (medio), luego Model 3 (masivo). Cada paso financiaba el siguiente. No fue improvisación.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border-l-4 border-purple-500">
              <p className="text-purple-300 font-semibold">Starbucks — 1987</p>
              <p className="text-gray-300 text-sm mt-1">Howard Schultz tenía la imagen exacta: replicar la experiencia del café italiano en cada ciudad de EE.UU. Podía describir el olor, el ambiente, la interacción. Visual y específica.</p>
            </div>
          </div>
        </div>
      ),
    },
  ],
  fields: [
    {
      id: 'vision_statement',
      label: '🎯 Tu Visión Clara (1-3 oraciones)',
      placeholder: 'Para [fecha], mi empresa [qué logra] para [quién], medido por [métricas concretas]...',
      type: 'textarea',
      rows: 5,
    },
    {
      id: 'metrics',
      label: '📊 Las 3 métricas que confirmarán que llegaste',
      placeholder: 'Ej: 1) 5,000 usuarios activos  2) $50K USD/mes  3) Presencia en 3 países',
      type: 'textarea',
      rows: 3,
    },
    {
      id: 'target_date',
      label: '📅 Fecha límite para esta visión',
      placeholder: 'Ej: Diciembre 2028',
      type: 'text',
    },
  ],
};

export default function Component2Content({ locale }: { locale: string }) {
  return <ComponentTemplate config={config} locale={locale} />;
}
