'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Beer,
  Car,
  Droplets,
  ShieldAlert,
  Sparkles,
  Wine,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';

type DrinkType = 'beer' | 'wine' | 'shots';

export default function NightCheckPage() {
  const [weight, setWeight] = useState(80);
  const [hours, setHours] = useState(3);
  const [beer, setBeer] = useState(2);
  const [wine, setWine] = useState(0);
  const [shots, setShots] = useState(2);

  const promille = useMemo(() => {
    const alcohol =
      beer * 12 +
      wine * 16 +
      shots * 8;

    const value =
      alcohol / (weight * 0.7) -
      hours * 0.12;

    return Math.max(0, Number(value.toFixed(2)));
  }, [beer, wine, shots, weight, hours]);

  const status = useMemo(() => {
    if (promille < 0.3) {
      return {
        label: 'Locker unterwegs',
        text: 'Du wirkst wahrscheinlich noch relativ fit.',
        color: 'from-green-500 to-emerald-600',
      };
    }

    if (promille < 0.8) {
      return {
        label: 'Wild unterwegs',
        text: 'NOXEN empfiehlt Wasser & entspanntes Tempo.',
        color: 'from-yellow-500 to-orange-600',
      };
    }

    if (promille < 1.3) {
      return {
        label: 'Safe Mode empfohlen',
        text: 'Taxi und Drunk Mode wären jetzt smart.',
        color: 'from-orange-500 to-pink-600',
      };
    }

    return {
      label: 'Bruder…',
      text: 'Wasser trinken. Handy laden. Heimweg sichern.',
      color: 'from-red-500 to-pink-700',
    };
  }, [promille]);

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="mx-auto max-w-4xl">
        <section className="mb-6 overflow-hidden rounded-[2.3rem] border border-white/10 bg-gradient-to-br from-purple-700/30 via-pink-600/20 to-red-600/15 p-6 shadow-[0_0_90px_rgba(168,85,247,0.18)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-pink-300">
                NOXEN NIGHT CHECK
              </p>

              <h1 className="text-5xl font-black leading-none">
                How cooked are you?
              </h1>
            </div>

            <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.6rem] bg-white/10">
              <Beer size={30} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            Nur eine ungefähre Schätzung für die Testphase.
            NICHT zur Einschätzung der Fahrtüchtigkeit verwenden.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <main className="space-y-4">
            <ControlCard
              title="Bier"
              icon={<Beer size={22} />}
              value={beer}
              setValue={setBeer}
              type="beer"
            />

            <ControlCard
              title="Wein"
              icon={<Wine size={22} />}
              value={wine}
              setValue={setWine}
              type="wine"
            />

            <ControlCard
              title="Shots"
              icon={<Sparkles size={22} />}
              value={shots}
              setValue={setShots}
              type="shots"
            />

            <div className="vybe-card p-5">
              <div className="mb-4 flex items-center gap-3">
                <Droplets className="text-blue-300" size={22} />

                <h2 className="text-2xl font-black">
                  Körper & Zeit
                </h2>
              </div>

              <div className="space-y-5">
                <Range
                  label={`Gewicht: ${weight} kg`}
                  value={weight}
                  setValue={setWeight}
                  min={40}
                  max={160}
                />

                <Range
                  label={`Stunden unterwegs: ${hours}`}
                  value={hours}
                  setValue={setHours}
                  min={1}
                  max={12}
                />
              </div>
            </div>
          </main>

          <aside className="space-y-4">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-5">
              <div className={`mb-5 rounded-[1.8rem] bg-gradient-to-br ${status.color} p-5`}>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                  Geschätzter Status
                </p>

                <h2 className="mt-2 text-5xl font-black">
                  {promille}‰
                </h2>

                <p className="mt-3 text-sm font-bold text-white/80">
                  {status.label}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-white/55">
                {status.text}
              </p>

              <div className="mt-5 rounded-[1.5rem] border border-yellow-500/20 bg-yellow-500/10 p-4">
                <div className="mb-2 flex items-center gap-2 text-yellow-300">
                  <AlertTriangle size={18} />

                  <p className="text-xs font-black uppercase tracking-[0.18em]">
                    Hinweis
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-white/55">
                  Die Werte sind nur geschätzt und dürfen NICHT zur Einschätzung der Fahrtüchtigkeit verwendet werden.
                </p>
              </div>
            </div>

            <a
              href="/drunk"
              className="flex h-16 items-center justify-center gap-3 rounded-[1.7rem] bg-gradient-to-r from-red-500 to-pink-600 text-sm font-black shadow-[0_0_35px_rgba(239,68,68,0.25)]"
            >
              <ShieldAlert size={20} />
              Safe Mode öffnen
            </a>

            <a
              href="/taxi"
              className="flex h-16 items-center justify-center gap-3 rounded-[1.7rem] border border-white/10 bg-white/[0.05] text-sm font-black"
            >
              <Car size={20} />
              Taxi sichern
            </a>
          </aside>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function ControlCard({
  title,
  icon,
  value,
  setValue,
}: {
  title: string;
  icon: React.ReactNode;
  value: number;
  setValue: (value: number) => void;
  type: DrinkType;
}) {
  return (
    <div className="vybe-card p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
          {icon}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
            Getränke
          </p>

          <h2 className="text-2xl font-black">
            {title}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setValue(Math.max(0, value - 1))}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-2xl font-black"
        >
          -
        </button>

        <div className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-black/30 text-2xl font-black">
          {value}
        </div>

        <button
          onClick={() => setValue(value + 1)}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-2xl font-black"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Range({
  label,
  value,
  setValue,
  min,
  max,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-black text-white/65">
          {label}
        </p>

        <span className="text-xs font-black text-purple-300">
          {value}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="w-full accent-purple-500"
      />
    </div>
  );
}