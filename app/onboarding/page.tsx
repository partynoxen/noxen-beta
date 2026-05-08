'use client';

import Link from 'next/link';
import {
  Bot,
  CheckCircle2,
  Flame,
  Headphones,
  Map,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  Users,
} from 'lucide-react';

import { BRAND } from '@/lib/brand';
import { STORAGE_KEYS } from '@/lib/storage-keys';

const steps = [
  {
    icon: <Flame size={26} />,
    title: 'Events entdecken',
    text: 'Swipe durch Events und finde schnell, worauf du heute wirklich Bock hast.',
  },
  {
    icon: <Map size={26} />,
    title: 'Abend planen',
    text: 'Event, Essen, Taxi und Heimweg werden zu einer Timeline verbunden.',
  },
  {
    icon: <Users size={26} />,
    title: 'Crew organisieren',
    text: 'Freunde hinzufügen, Rollen vergeben und gemeinsam planen.',
  },
  {
    icon: <ShieldAlert size={26} />,
    title: 'Safe Mode',
    text: 'Große Buttons, Taxi, Standort teilen und Notfallhilfe.',
  },
];

export default function OnboardingPage() {
  const finish = () => {
    localStorage.setItem(STORAGE_KEYS.onboardingSeen, 'true');
    window.location.href = '/home';
  };

  return (
    <main className="min-h-screen bg-[#050509] px-4 py-8 text-white">
      <div className="noise" />

      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-purple-600/15 blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-pink-600/15 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <section className="mb-6 overflow-hidden rounded-[2.4rem] border border-white/10 bg-gradient-to-br from-purple-700/30 via-pink-600/20 to-blue-700/15 p-6 shadow-[0_0_90px_rgba(168,85,247,0.16)]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.26em] text-purple-300">
                {BRAND.betaLabel}
              </p>

              <h1 className="text-5xl font-black leading-none">
                Willkommen bei <br />
                {BRAND.name}
              </h1>
            </div>

            <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.7rem] bg-white/10">
              <Sparkles size={32} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            {BRAND.description}
            <br />
            Ziel der Testphase: herausfinden, ob sich NOXEN bereits wie ein echtes Produkt anfühlt.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="vybe-card vybe-border overflow-hidden p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                  {step.icon}
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-white/45">
                  0{index + 1}
                </div>
              </div>

              <h2 className="text-2xl font-black">
                {step.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/45">
                {step.text}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-6 rounded-[2rem] border border-yellow-500/15 bg-yellow-500/10 p-5">
          <div className="mb-4 flex items-center gap-3">
            <MessageCircle size={22} className="text-yellow-300" />

            <h2 className="text-2xl font-black">
              Worauf du achten sollst
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Checklist text="Findest du schnell ein Event?" />
            <Checklist text="Wirkt die App hochwertig?" />
            <Checklist text="Verstehst du den Planer sofort?" />
            <Checklist text="Ist der Safe Mode hilfreich?" />
            <Checklist text="Fühlt sich die App modern an?" />
            <Checklist text="Würdest du sie Freunden schicken?" />
          </div>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={finish}
            className="vybe-button flex h-16 items-center justify-center gap-3 rounded-[1.7rem] text-sm font-black shadow-[0_0_35px_rgba(168,85,247,0.35)]"
          >
            <CheckCircle2 size={22} />
            Test starten
          </button>

          <Link
            href="/feedback"
            className="flex h-16 items-center justify-center gap-3 rounded-[1.7rem] border border-white/10 bg-white/[0.05] text-sm font-black transition-all hover:bg-white/[0.08]"
          >
            <MessageCircle size={22} />
            Direkt Feedback geben
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Mini href="/assistant" icon={<Bot size={20} />} title="NOXEN AI" />
          <Mini href="/music" icon={<Headphones size={20} />} title="NOXEN Sound" />
          <Mini href="/crew" icon={<Users size={20} />} title="NOXEN Crew" />
        </div>
      </div>
    </main>
  );
}

function Checklist({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
      <CheckCircle2 size={18} className="text-green-300" />

      <span className="text-sm font-bold text-white/65">
        {text}
      </span>
    </div>
  );
}

function Mini({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="vybe-card flex h-14 items-center justify-center gap-2 text-sm font-black transition-all hover:scale-[1.02]"
    >
      <span className="text-purple-300">
        {icon}
      </span>

      {title}
    </Link>
  );
}