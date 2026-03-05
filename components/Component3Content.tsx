'use client';

import ComponentTemplate, { ComponentConfig } from '@/components/ComponentTemplate';

const config: ComponentConfig = {
  number: 3,
  title: 'Tangible',
  subtitle: 'Crea la imagen mental tan vívida que puedas habitarla',
  tag: 'COMPONENTE 3',
  color: 'blue',
  icon: '🔭',
  supabaseField: 'component_3_data',
  nextComponent: 4,
  exerciseTitle: 'La Técnica de los 5 Sentidos',
  exerciseDescription: 'Describe tu visión como si ya ocurrió. Usa los 5 sentidos. Cuanto más específico, más poder tiene.',
  completionMessage: 'Tu visión ahora es una imagen mental vívida. Eso la hace real para tu cerebro.',
  educationalSections: [
    {
      id: 'intro',
      title: 'El cerebro no distingue entre real e imaginado',
      content: (
        <div className="space-y-4">
          <p>
            Los atletas de élite lo saben desde hace décadas: <strong className="text-white">visualizar en detalle activa los mismos circuitos neuronales que la ejecución real.</strong>
          </p>
          <p>
            Michael Phelps nadaba cada carrera en su mente antes de nadie más entrara al agua. No era superstición. Era tecnología mental.
          </p>
          <div className="bg-blue-950 border border-blue-800 rounded-xl p-4">
            <p className="text-blue-300 font-semibold mb-2">La diferencia entre emprendedores que logran su visión y los que no:</p>
            <p className="text-gray-300">Los primeros pueden <em>habitar</em> su visión. La sienten real. Cuando toman decisiones diarias, tienen una imagen tan nítida del futuro que saben instintivamente si una acción los acerca o los aleja.</p>
          </div>
          <p>
            Los segundos tienen palabras en un papel. Inspiradoras quizás. Pero abstractas. Cuando llega la incertidumbre, no saben a dónde mirar.
          </p>
        </div>
      ),
    },
    {
      id: 'zoom',
      title: 'La Técnica del Zoom: 5 niveles de especificidad',
      content: (
        <div className="space-y-4">
          <p>Toma tu visión actual y aplica zoom progresivo. Cada nivel la hace más tangible:</p>
          <div className="space-y-2">
            {[
              { level: '1', desc: 'Industria: "Educación para emprendedores"' },
              { level: '2', desc: 'Mercado: "Emprendedores latinoamericanos de 30-45 años con negocio existente"' },
              { level: '3', desc: 'Producto: "Plataforma digital con cursos + AI coach personalizado"' },
              { level: '4', desc: 'Impacto: "50,000 empresarios que triplicaron ingresos en 18 meses"' },
              { level: '5', desc: 'Momento: "Es 2028. Estás en Medellín. El equipo celebra 50K usuarios. El dashboard muestra $200K MRR."' },
            ].map((item) => (
              <div key={item.level} className="flex gap-3 bg-gray-900 rounded-xl p-3">
                <span className="text-blue-400 font-bold text-sm w-5 shrink-0">×{item.level}</span>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-blue-300 text-sm">El nivel 5 es donde ocurre la magia. Es tan específico que casi puedes olerlo.</p>
        </div>
      ),
    },
    {
      id: 'senses',
      title: 'El Método de los 5 Sentidos',
      content: (
        <div className="space-y-4">
          <p>Cuando tu visión esté en nivel 5, descríbela usando todos los sentidos. Esto no es ejercicio literario — es ingeniería mental.</p>
          <div className="space-y-3">
            {[
              { sense: '👁️ Ves', desc: '¿Qué ves en ese momento futuro? ¿Pantallas, personas, espacios, números?' },
              { sense: '👂 Escuchas', desc: '¿Qué conversaciones pasan? ¿Qué dicen clientes, equipo, medios?' },
              { sense: '🤲 Sientes', desc: '¿Qué textura tiene ese éxito? ¿Qué emoción domina tu cuerpo?' },
              { sense: '👃 Hueles', desc: '¿En qué lugar estás físicamente? ¿Oficina, evento, viaje?' },
              { sense: '💬 Dices', desc: '¿Qué estás explicando a alguien sobre lo que construiste?' },
            ].map((item) => (
              <div key={item.sense} className="flex gap-3 bg-gray-900 rounded-xl p-3">
                <span className="text-lg shrink-0">{item.sense.split(' ')[0]}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.sense.split(' ')[1]}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ],
  fields: [
    {
      id: 'vision_moment',
      label: '🎬 El Momento (fecha y lugar exacto cuando logres tu visión)',
      placeholder: 'Es [fecha]. Estoy en [lugar]. Acabo de [hecho concreto]. El equipo/yo sentimos...',
      type: 'textarea',
      rows: 4,
    },
    {
      id: 'you_see',
      label: '👁️ ¿Qué ves en ese momento?',
      placeholder: 'Las pantallas muestran... El equipo está... Los clientes dicen...',
      type: 'textarea',
      rows: 3,
    },
    {
      id: 'you_feel',
      label: '🤲 ¿Qué sientes en ese momento?',
      placeholder: 'Siento... porque hemos logrado...',
      type: 'textarea',
      rows: 3,
    },
    {
      id: 'you_say',
      label: '💬 ¿Qué le dices a alguien sobre lo que construiste?',
      placeholder: 'Cuando me preguntan qué hicimos, digo: "Construimos..."',
      type: 'textarea',
      rows: 3,
    },
  ],
};

export default function Component3Content({ locale }: { locale: string }) {
  return <ComponentTemplate config={config} locale={locale} />;
}
