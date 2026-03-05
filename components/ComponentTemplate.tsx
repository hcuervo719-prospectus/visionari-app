'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface ExerciseField {
  id: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'textarea';
  rows?: number;
}

export interface ComponentConfig {
  number: number;          // 2-8
  title: string;           // "Visión Clara"
  subtitle: string;        // "El Poder de Ver con Precisión"
  tag: string;             // "COMPONENTE 2"
  color: string;           // Tailwind color class base, e.g. "purple"
  icon: string;            // emoji
  educationalSections: Section[];
  exerciseTitle: string;
  exerciseDescription: string;
  fields: ExerciseField[];
  completionMessage: string;
  nextComponent?: number;
  supabaseField: string;   // "component_2_data"
}

// ─── Color map ────────────────────────────────────────────────────────────────

const colors: Record<string, { bg: string; border: string; text: string; badge: string; btn: string; progress: string }> = {
  purple: {
    bg: 'bg-purple-950',
    border: 'border-purple-500',
    text: 'text-purple-400',
    badge: 'bg-purple-900 text-purple-300 border border-purple-700',
    btn: 'bg-purple-600 hover:bg-purple-500',
    progress: 'bg-purple-500',
  },
  blue: {
    bg: 'bg-blue-950',
    border: 'border-blue-500',
    text: 'text-blue-400',
    badge: 'bg-blue-900 text-blue-300 border border-blue-700',
    btn: 'bg-blue-600 hover:bg-blue-500',
    progress: 'bg-blue-500',
  },
  emerald: {
    bg: 'bg-emerald-950',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    badge: 'bg-emerald-900 text-emerald-300 border border-emerald-700',
    btn: 'bg-emerald-600 hover:bg-emerald-500',
    progress: 'bg-emerald-500',
  },
  orange: {
    bg: 'bg-orange-950',
    border: 'border-orange-500',
    text: 'text-orange-400',
    badge: 'bg-orange-900 text-orange-300 border border-orange-700',
    btn: 'bg-orange-600 hover:bg-orange-500',
    progress: 'bg-orange-500',
  },
  rose: {
    bg: 'bg-rose-950',
    border: 'border-rose-500',
    text: 'text-rose-400',
    badge: 'bg-rose-900 text-rose-300 border border-rose-700',
    btn: 'bg-rose-600 hover:bg-rose-500',
    progress: 'bg-rose-500',
  },
  amber: {
    bg: 'bg-amber-950',
    border: 'border-amber-500',
    text: 'text-amber-400',
    badge: 'bg-amber-900 text-amber-300 border border-amber-700',
    btn: 'bg-amber-600 hover:bg-amber-500',
    progress: 'bg-amber-500',
  },
  cyan: {
    bg: 'bg-cyan-950',
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    badge: 'bg-cyan-900 text-cyan-300 border border-cyan-700',
    btn: 'bg-cyan-600 hover:bg-cyan-500',
    progress: 'bg-cyan-500',
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ComponentTemplate({ config, locale }: { config: ComponentConfig; locale: string }) {
  const router = useRouter();
  const c = colors[config.color] || colors.purple;

  // Sections: 0 = intro/education (multi-step), last = exercise
  const totalEducational = config.educationalSections.length;
  const [step, setStep] = useState(0); // 0..totalEducational-1 = education, totalEducational = exercise
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const isExercise = step === totalEducational;
  const progress = Math.round((step / (totalEducational + 1)) * 100);

  const handleNext = () => setStep((s) => Math.min(s + 1, totalEducational));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const allFilled = config.fields.every((f) => answers[f.id]?.trim());

  const handleSave = async () => {
    if (!allFilled) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/component/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          componentNumber: config.number,
          field: config.supabaseField,
          data: answers,
        }),
      });
      if (!res.ok) throw new Error('Error al guardar');
      setSaved(true);
    } catch (e) {
      setError('No se pudo guardar. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const handleContinue = () => {
    if (config.nextComponent) {
      router.push(`/${locale}/dashboard/component-${config.nextComponent}`);
    } else {
      router.push(`/${locale}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className={`${c.bg} border-b ${c.border} border-opacity-30`}>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>{config.tag}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-400 text-sm">Módulo Foundation</span>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-4xl">{config.icon}</span>
            <div>
              <h1 className={`text-2xl font-bold ${c.text}`}>{config.title}</h1>
              <p className="text-gray-400 text-sm mt-1">{config.subtitle}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{isExercise ? 'Ejercicio' : `Sección ${step + 1} de ${totalEducational}`}</span>
              <span>{progress}% completado</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${c.progress}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {!isExercise ? (
          // ── Educational section ──
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                {config.educationalSections[step].title}
              </h2>
              <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed space-y-4">
                {config.educationalSections[step].content}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 transition-colors"
                >
                  ← Anterior
                </button>
              )}
              <button
                onClick={handleNext}
                className={`flex-1 py-3 rounded-xl text-white font-semibold transition-colors ${c.btn}`}
              >
                {step === totalEducational - 1 ? 'Ir al Ejercicio →' : 'Siguiente →'}
              </button>
            </div>
          </div>
        ) : (
          // ── Exercise section ──
          <div className="animate-fade-in">
            {!saved ? (
              <>
                <div className={`p-4 rounded-xl ${c.bg} border ${c.border} border-opacity-30 mb-6`}>
                  <h2 className="text-lg font-bold text-white mb-1">{config.exerciseTitle}</h2>
                  <p className="text-gray-400 text-sm">{config.exerciseDescription}</p>
                </div>

                <div className="space-y-5">
                  {config.fields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {field.label}
                      </label>
                      {field.type === 'textarea' || field.rows ? (
                        <textarea
                          rows={field.rows || 4}
                          placeholder={field.placeholder}
                          value={answers[field.id] || ''}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 resize-none text-sm leading-relaxed"
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={answers[field.id] || ''}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {error && (
                  <p className="mt-4 text-red-400 text-sm">{error}</p>
                )}

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={handlePrev}
                    className="py-3 px-6 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 transition-colors"
                  >
                    ← Volver
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!allFilled || saving}
                    className={`flex-1 py-3 rounded-xl text-white font-semibold transition-all ${
                      allFilled && !saving
                        ? `${c.btn} cursor-pointer`
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {saving ? 'Guardando...' : 'Guardar y Completar ✓'}
                  </button>
                </div>
              </>
            ) : (
              // ── Saved / Completion screen ──
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-white mb-3">¡Componente Completado!</h2>
                <p className="text-gray-400 mb-2">{config.completionMessage}</p>
                <p className="text-gray-500 text-sm mb-8">Tu progreso ha sido guardado automáticamente.</p>

                <div className={`inline-block p-4 rounded-xl ${c.bg} border ${c.border} border-opacity-30 mb-8`}>
                  <div className="space-y-2 text-left">
                    {config.fields.map((field) => (
                      <div key={field.id}>
                        <span className={`text-xs font-medium ${c.text}`}>{field.label}</span>
                        <p className="text-gray-300 text-sm mt-0.5">{answers[field.id]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-colors ${c.btn}`}
                >
                  {config.nextComponent
                    ? `Continuar → Componente ${config.nextComponent}`
                    : '🏁 Ver mi Visión Completa'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
