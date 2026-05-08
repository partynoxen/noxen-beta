'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Trash2, Map, Users } from 'lucide-react';

import BottomNav from '../../components/bottom-nav';

type SavedPlan = {
  id: string;
  title: string;
  eventTitle: string;
  persons: number;
  totalPrice: number;
  createdAt: string;
  steps: {
    time: string;
    title: string;
    text: string;
  }[];
};

const SAVED_PLANS_KEY = 'vybe_saved_plans';

export default function SavedPlansPage() {
  const [plans, setPlans] = useState<SavedPlan[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(SAVED_PLANS_KEY) || '[]');
    setPlans(saved);
  }, []);

  const deletePlan = (id: string) => {
    const updated = plans.filter((plan) => plan.id !== id);
    setPlans(updated);
    localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-32 pt-8 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-purple-300">
            VYBE PLÄNE
          </p>

          <h1 className="text-5xl font-black leading-none">
            Gespeicherte Abende
          </h1>

          <p className="mt-4 text-white/50">
            Deine gespeicherten Partypläne.
          </p>
        </div>

        {plans.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 text-center">
            <Map className="mx-auto mb-4 text-purple-300" size={40} />

            <h2 className="text-2xl font-black">
              Noch keine Pläne gespeichert
            </h2>

            <p className="mt-3 text-white/45">
              Erstelle im Planer deinen ersten Abend.
            </p>

            <Link
              href="/plan"
              className="mt-6 block rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 font-black"
            >
              Planer öffnen
            </Link>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-pink-300">
                    {plan.eventTitle}
                  </p>

                  <h2 className="text-2xl font-black">
                    {plan.title}
                  </h2>
                </div>

                <button
                  onClick={() => deletePlan(plan.id)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-3">
                <Info
                  icon={<Users size={16} />}
                  label="Personen"
                  value={String(plan.persons)}
                />

                <Info
                  icon={<Calendar size={16} />}
                  label="Gesamt p. P."
                  value={`${plan.totalPrice.toFixed(2)} €`}
                />
              </div>

              <div className="space-y-3">
                {plan.steps.map((step) => (
                  <div
                    key={`${step.time}-${step.title}`}
                    className="rounded-2xl bg-black/30 p-4"
                  >
                    <p className="text-sm font-black text-purple-300">
                      {step.time}
                    </p>

                    <p className="mt-1 font-black">
                      {step.title}
                    </p>

                    <p className="mt-1 text-sm text-white/45">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-black/25 p-4">
      <div className="mb-2 text-purple-300">
        {icon}
      </div>

      <p className="text-xs text-white/35">
        {label}
      </p>

      <p className="mt-1 font-black">
        {value}
      </p>
    </div>
  );
}