'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface VisionData {
  component_2_data?: { vision_statement?: string; metrics?: string; target_date?: string };
  component_3_data?: { vision_moment?: string; you_see?: string; you_feel?: string; you_say?: string };
  component_4_data?: { proactive_version?: string };
  component_5_data?: { bhag_statement?: string; why_audacious?: string };
  component_6_data?: { core_why?: string; non_negotiables?: string; human_impact?: string; level_7_why?: string };
  component_7_data?: { common_enemy?: string; future_world?: string; vision_pitch?: string };
}

export default function Component8Content({ locale }: { locale: string }) {
  const router = useRouter();
  const [visionData, setVisionData] = useState<VisionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0); // 0=intro, 1=review, 2=final
  const [reflection, setReflection] = useState('');
  const [commitment, setCommitment] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchVisionData();
  }, []);

  const fetchVisionData = async () => {
    try {
      const res = await fetch('/api/component/get-all');
      if (res.ok) {
        const data = await res.json();
        setVisionData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndComplete = async () => {
    setSaving(true);
    try {
      await fetch('/api/component/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          componentNumber: 8,
          field: 'component_8_data',
          data: { reflection, commitment, completed_at: new Date().toISOString() },
        }),
      });
      setSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visionData, reflection, commitment }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mi-vision-empresarial.pdf';
        a.click();
      }
    } catch (e) {
      alert('El generador PDF estará disponible pronto. Tu visión está guardada.');
    }
  };

  const progress = Math.round(((step + 1) / 3) * 100);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-cyan-950 border-b border-cyan-500 border-opacity-30">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-900 text-cyan-300 border border-cyan-700">
              COMPONENTE 8
            </span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-400 text-sm">Módulo Foundation — Final</span>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-4xl">🏁</span>
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">Tu Visión Completa</h1>
              <p className="text-gray-400 text-sm mt-1">Integración de los 8 componentes en tu documento de visión</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-gray-800 rounded-full">
              <div
                className="h-1.5 rounded-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-white mb-3">Llegaste al final</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Completaste los 7 componentes de una visión empresarial poderosa. Ahora los integraremos en un documento único que será tu norte para los próximos años.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { n: 1, label: 'Importancia', icon: '💡' },
                { n: 2, label: 'Visión Clara', icon: '🎯' },
                { n: 3, label: 'Tangible', icon: '🔭' },
                { n: 4, label: 'Proactiva', icon: '⚡' },
                { n: 5, label: 'Desafiante', icon: '🚀' },
                { n: 6, label: 'Inquebrantable', icon: '🛡️' },
                { n: 7, label: 'Contagiosa', icon: '✨' },
              ].map((c) => (
                <div key={c.n} className="flex items-center gap-2 bg-gray-900 rounded-xl p-3">
                  <span className="text-lg">{c.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500">C{c.n}</p>
                    <p className="text-white text-sm font-medium">{c.label}</p>
                  </div>
                  <span className="ml-auto text-emerald-400 text-sm">✓</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors"
            >
              Ver mi Visión Completa →
            </button>
          </div>
        )}

        {/* Step 1: Review */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Tu Visión Empresarial</h2>
            <p className="text-gray-400 text-sm">Este es el documento que has construido. Lee cada sección con atención.</p>

            {loading ? (
              <div className="text-center py-12 text-gray-500">Cargando tu visión...</div>
            ) : (
              <div className="space-y-4">
                {[
                  {
                    title: '🎯 Visión Clara',
                    content: visionData?.component_2_data?.vision_statement,
                    sub: visionData?.component_2_data ? `📅 ${visionData.component_2_data.target_date || '—'}  |  📊 ${visionData.component_2_data.metrics || '—'}` : null,
                    color: 'purple',
                  },
                  {
                    title: '⚡ Versión Proactiva',
                    content: visionData?.component_4_data?.proactive_version,
                    color: 'emerald',
                  },
                  {
                    title: '🚀 Tu BHAG',
                    content: visionData?.component_5_data?.bhag_statement,
                    sub: visionData?.component_5_data?.why_audacious,
                    color: 'orange',
                  },
                  {
                    title: '🌳 Propósito Profundo',
                    content: visionData?.component_6_data?.core_why,
                    color: 'rose',
                  },
                  {
                    title: '⚓ Valores No Negociables',
                    content: visionData?.component_6_data?.non_negotiables,
                    color: 'rose',
                  },
                  {
                    title: '✨ Pitch de Visión',
                    content: visionData?.component_7_data?.vision_pitch,
                    color: 'amber',
                  },
                ].map((section) =>
                  section.content ? (
                    <div key={section.title} className="bg-gray-900 rounded-xl p-4 border-l-4 border-gray-700">
                      <p className="text-gray-400 text-xs font-semibold mb-2">{section.title}</p>
                      <p className="text-white text-sm leading-relaxed">{section.content}</p>
                      {section.sub && <p className="text-gray-500 text-xs mt-2">{section.sub}</p>}
                    </div>
                  ) : null
                )}
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors"
            >
              Completar y Descargar →
            </button>
          </div>
        )}

        {/* Step 2: Final commitment + download */}
        {step === 2 && !saved && (
          <div className="space-y-6">
            <div className="bg-cyan-950 border border-cyan-800 rounded-xl p-4">
              <p className="text-cyan-300 font-semibold mb-1">El último paso</p>
              <p className="text-gray-400 text-sm">Antes de descargar tu documento, un momento de reflexión.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                💭 ¿Qué cambió en ti después de este proceso?
              </label>
              <textarea
                rows={4}
                placeholder="Empecé pensando que... Ahora entiendo que..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 resize-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                🤝 Tu compromiso (en 1 oración)
              </label>
              <input
                type="text"
                placeholder="Me comprometo a..."
                value={commitment}
                onChange={(e) => setCommitment(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 text-sm"
              />
            </div>

            <button
              onClick={handleSaveAndComplete}
              disabled={!reflection.trim() || !commitment.trim() || saving}
              className={`w-full py-4 rounded-xl text-white font-bold transition-colors ${
                reflection.trim() && commitment.trim() && !saving
                  ? 'bg-cyan-600 hover:bg-cyan-500'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {saving ? 'Guardando...' : '🎯 Completar Módulo Foundation'}
            </button>
          </div>
        )}

        {/* Final screen */}
        {saved && (
          <div className="text-center py-12">
            <div className="text-7xl mb-6">🏆</div>
            <h2 className="text-3xl font-bold text-white mb-3">¡Módulo Foundation Completado!</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Has construido una visión empresarial con los 8 componentes. Este documento te acompañará en cada decisión estratégica.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleDownloadPDF}
                className="w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg transition-colors"
              >
                📄 Descargar mi Documento de Visión
              </button>
              <button
                onClick={() => router.push(`/${locale}/dashboard`)}
                className="w-full py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 transition-colors"
              >
                Volver al Dashboard
              </button>
            </div>

            <div className="mt-8 bg-gray-900 rounded-xl p-4">
              <p className="text-gray-400 text-sm">
                ¿Listo para el siguiente nivel? <span className="text-cyan-400 font-semibold">Visionari Pro</span> incluye un AI Coach que te guía en la ejecución de esta visión.
              </p>
              <p className="text-gray-500 text-xs mt-1">Disponible en Abril 2026</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
