'use client';

import ComponentTemplate, { ComponentConfig } from '@/components/ComponentTemplate';

const config: ComponentConfig = {
  number: 7,
  title: 'Contagiosa',
  subtitle: 'Que otros quieran unirse sin que lo pidas',
  tag: 'COMPONENTE 7',
  color: 'amber',
  icon: '✨',
  supabaseField: 'component_7_data',
  nextComponent: 8,
  exerciseTitle: 'Escribe tu Pitch de Visión',
  exerciseDescription: 'No un pitch de ventas. Una declaración de visión tan clara y poderosa que quien la escuche quiera ser parte.',
  completionMessage: 'Tu visión ahora puede moverse sola. Las personas correctas se acercarán a ella.',
  educationalSections: [
    {
      id: 'contagious',
      title: '¿Qué hace una visión contagiosa?',
      content: (
        <div className="space-y-4">
          <p>
            Una visión contagiosa no necesita persuasión. <strong className="text-white">Las personas correctas la sienten y se acercan solas.</strong>
          </p>
          <p>No es técnica de pitch. No es marketing. Es que la visión misma tenga elementos inherentes que la hacen propagarse.</p>
          <div className="bg-amber-950 border border-amber-800 rounded-xl p-4">
            <p className="text-amber-300 font-semibold mb-2">La prueba real:</p>
            <p className="text-gray-300">Si cuando describes tu visión la gente dice "¡qué interesante, cuéntame más!" → contagiosa.</p>
            <p className="text-gray-300 mt-2">Si dicen "ah sí, claro, bien" → no lo es todavía.</p>
            <p className="text-gray-300 mt-2">Si preguntan "¿y cómo puedo ayudar?" → la tienes.</p>
          </div>
          <p>¿Cuál es la diferencia? Las visiones contagiosas tienen 3 características que las hacen irresistibles para las personas correctas.</p>
        </div>
      ),
    },
    {
      id: 'elements',
      title: '3 Elementos que hacen una visión irresistible',
      content: (
        <div className="space-y-4">
          {[
            {
              element: '1. Crea un enemigo común',
              desc: 'No un enemigo de personas. Un enemigo de IDEAS: el statu quo, el problema que existe, la forma incorrecta de hacer algo. Cuando nombras lo que está mal, quienes también lo ven se identifican.',
              example: '"El 80% de empresas fracasan por falta de visión. Eso es inaceptable. Nosotros lo cambiamos."',
            },
            {
              element: '2. Pinta un mundo diferente',
              desc: 'No describes tu empresa. Describes el mundo que EXISTIRÁ cuando hayas ganado. Ese mundo es tan atractivo que la gente quiere vivir en él.',
              example: '"Imagina un LATAM donde cada emprendedor llega a su primer año con visión clara, dirección definida, y recursos enfocados."',
            },
            {
              element: '3. Da un rol a las personas',
              desc: 'Las visiones contagiosas no dicen "yo voy a". Dicen "juntos vamos a". Invitan. Dan a cada persona un lugar en la historia que estás contando.',
              example: '"Y tú, si estás leyendo esto, eres exactamente el tipo de líder que necesitamos para que eso ocurra."',
            },
          ].map((item) => (
            <div key={item.element} className="bg-gray-900 rounded-xl p-4 border-l-4 border-amber-500">
              <p className="text-amber-300 font-semibold mb-2">{item.element}</p>
              <p className="text-gray-300 text-sm mb-2">{item.desc}</p>
              <p className="text-gray-500 text-xs italic">"{item.example}"</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'cases',
      title: 'Visiones contagiosas que cambiaron industrias',
      content: (
        <div className="space-y-3">
          {[
            {
              company: 'Apple — "Think Different" (1997)',
              analysis: 'No hablaba del producto. Hablaba de identidad. "Las personas locas que creen que pueden cambiar el mundo, son las que lo hacen." Quien se identificaba con eso, compraba Apple para declararlo.',
            },
            {
              company: 'Tesla — "Acelerar la transición del mundo a energía sostenible"',
              analysis: 'No "vender autos eléctricos". La visión era tan grande que comprar un Tesla te hacía parte del movimiento. Los primeros clientes eran evangelistas, no consumidores.',
            },
            {
              company: 'Disney — "Hacer felices a las personas"',
              analysis: 'Tan simple que cualquiera puede participar. Desde el empleado que limpia hasta el director creativo. Todos tienen el mismo norte y saben exactamente qué hacer.',
            },
          ].map((item) => (
            <div key={item.company} className="bg-gray-900 rounded-xl p-4">
              <p className="text-amber-300 font-semibold text-sm mb-2">{item.company}</p>
              <p className="text-gray-300 text-sm">{item.analysis}</p>
            </div>
          ))}
        </div>
      ),
    },
  ],
  fields: [
    {
      id: 'common_enemy',
      label: '⚔️ El enemigo común que combates (el problema/statu quo que estás cambiando)',
      placeholder: 'El mundo tiene un problema: [describe el statu quo inaceptable que tu visión combate]...',
      type: 'textarea',
      rows: 3,
    },
    {
      id: 'future_world',
      label: '🌍 El mundo que existirá cuando tu visión gane',
      placeholder: 'Imagina un mundo donde [cómo será diferente gracias a lo que construyes]...',
      type: 'textarea',
      rows: 3,
    },
    {
      id: 'vision_pitch',
      label: '✨ Tu Pitch de Visión completo (3-5 oraciones que alguien querría repetir)',
      placeholder: 'Escribe tu visión de forma que un aliado, inversor o cliente la quiera compartir...',
      type: 'textarea',
      rows: 5,
    },
  ],
};

export default function Component7Content({ locale }: { locale: string }) {
  return <ComponentTemplate config={config} locale={locale} />;
}
