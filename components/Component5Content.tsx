'use client';

import ComponentTemplate, { ComponentConfig } from '@/components/ComponentTemplate';

const config: ComponentConfig = {
  number: 5,
  title: 'Desafiante',
  subtitle: 'El poder de las metas que parecen imposibles',
  tag: 'COMPONENTE 5',
  color: 'orange',
  icon: '🚀',
  supabaseField: 'component_5_data',
  nextComponent: 6,
  exerciseTitle: 'Define tu BHAG',
  exerciseDescription: 'Big Hairy Audacious Goal: una meta tan grande que te incomoda decirla en voz alta. Exactamente eso es lo que necesitas.',
  completionMessage: 'Tu BHAG está definido. Las metas que asustan son las que transforman empresas.',
  educationalSections: [
    {
      id: 'bhag',
      title: '¿Qué es un BHAG y por qué funciona?',
      content: (
        <div className="space-y-4">
          <p>
            Jim Collins y Jerry Porras estudiaron 18 empresas visionarias durante 6 años. El patrón más consistente: <strong className="text-white">todas tenían metas que en su momento parecían ridículas.</strong>
          </p>
          <div className="bg-orange-950 border border-orange-800 rounded-xl p-4">
            <p className="text-orange-300 font-semibold mb-3">BHAGs históricos que parecían imposibles:</p>
            <div className="space-y-2">
              {[
                { company: 'Boeing — 1950', bhag: '"Ser la empresa que transformó la aviación comercial global, democratizando el viaje aéreo."' },
                { company: 'NASA — 1961', bhag: '"Llevar un hombre a la luna y regresarlo a salvo antes de que termine la década."' },
                { company: 'Microsoft — 1975', bhag: '"Una computadora personal en cada escritorio y en cada hogar."' },
                { company: 'Google — 1998', bhag: '"Organizar toda la información del mundo y hacerla universalmente accesible."' },
              ].map((item) => (
                <div key={item.company} className="bg-gray-900 rounded-lg p-3">
                  <p className="text-orange-300 text-xs font-semibold">{item.company}</p>
                  <p className="text-gray-300 text-sm italic">{item.bhag}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-orange-300">Cuando fueron definidas, todas parecían locura. En retrospectiva, fueron el norte exacto.</p>
        </div>
      ),
    },
    {
      id: 'types',
      title: 'Los 4 tipos de BHAG (elige el tuyo)',
      content: (
        <div className="space-y-3">
          <p>No todos los BHAGs son iguales. Collins identificó 4 arquetipos:</p>
          {[
            {
              type: '🎯 Cuantitativo',
              desc: 'Una meta numérica específica y audaz.',
              example: '"Ser empresa Fortune 500 en 25 años" (Walmart, 1990)',
            },
            {
              type: '🏆 Competitivo',
              desc: 'Superar o redefinir un competidor de referencia.',
              example: '"Destruir a Adidas" (Nike, 1960s)',
            },
            {
              type: '🌍 Rol Modelo',
              desc: 'Convertirte en la versión de otro en tu categoría.',
              example: '"Ser el Harvard de los negocios del oeste" (Stanford GSB)',
            },
            {
              type: '🔄 Transformación Interna',
              desc: 'Una transformación radical de lo que eres como empresa.',
              example: '"Transformar la imagen de Japan en todo el mundo" (Sony, 1950)',
            },
          ].map((item) => (
            <div key={item.type} className="bg-gray-900 rounded-xl p-4">
              <p className="text-orange-300 font-semibold mb-1">{item.type}</p>
              <p className="text-gray-300 text-sm">{item.desc}</p>
              <p className="text-gray-500 text-xs mt-1 italic">{item.example}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'calibrate',
      title: 'El Test de la Comodidad Incómoda',
      content: (
        <div className="space-y-4">
          <p>Un BHAG bien calibrado debe pasar este test:</p>
          <div className="space-y-3">
            {[
              { q: '¿Te incomoda decirlo en voz alta?', right: 'Sí → bien calibrado', wrong: 'No → es muy segura' },
              { q: '¿Requiere capacidades que aún no tienes?', right: 'Sí → bien calibrado', wrong: 'No → es alcanzable sin crecer' },
              { q: '¿Tiene entre 60-70% de probabilidad de logro?', right: 'Sí → zona ideal', wrong: 'No → o muy fácil o imposible' },
              { q: '¿Tardará 10-30 años en lograrse?', right: 'Sí → horizonte correcto', wrong: 'No → muy corto o no hay norte claro' },
            ].map((item) => (
              <div key={item.q} className="bg-gray-900 rounded-xl p-3">
                <p className="text-white text-sm font-medium mb-1">{item.q}</p>
                <div className="flex gap-4">
                  <p className="text-emerald-400 text-xs">✅ {item.right}</p>
                  <p className="text-red-400 text-xs">❌ {item.wrong}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-orange-300 text-sm">Si tu BHAG pasa los 4 tests, lo tienes. Si no, necesita más audacia o más especificidad.</p>
        </div>
      ),
    },
  ],
  fields: [
    {
      id: 'bhag_type',
      label: '🎯 ¿Qué tipo de BHAG es el tuyo?',
      placeholder: 'Cuantitativo / Competitivo / Rol Modelo / Transformación Interna',
      type: 'text',
    },
    {
      id: 'bhag_statement',
      label: '🚀 Tu BHAG (que te incomoda decir en voz alta)',
      placeholder: 'Escribe tu Big Hairy Audacious Goal. Sin filtros. Sin "ser realista".',
      type: 'textarea',
      rows: 4,
    },
    {
      id: 'why_audacious',
      label: '💡 ¿Por qué esta meta específicamente? ¿Qué cambia en el mundo si la logras?',
      placeholder: 'Si logramos esto, [qué impacto tiene en clientes/industria/mundo]...',
      type: 'textarea',
      rows: 3,
    },
  ],
};

export default function Component5Content({ locale }: { locale: string }) {
  return <ComponentTemplate config={config} locale={locale} />;
}
