'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  CalendarDays,
  Car,
  Flame,
  Headphones,
  Heart,
  Map,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  Utensils,
  Zap,
  ClipboardList,
  Users,
  Radio,
  TrendingUp,
  Wand2,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import MotionCard from '../components/motion-card';

import { BRAND } from '@/lib/brand';
import { STORAGE_KEYS } from '@/lib/storage-keys';
import { loadDB, type EventItem } from '@/lib/data-store';

type Energy = 'chill' | 'wild' | 'destroy';
type Budget = 'low' | 'mid' | 'high';
type Music = 'TECHNO' | 'HIP HOP' | 'HOUSE' | 'MIXED';

export default function HomeClient() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [liveUsers, setLiveUsers] = useState(1248);
  const [plansCreated, setPlansCreated] = useState(384);

  const [energy, setEnergy] = useState<Energy>('wild');
  const [budget, setBudget] = useState<Budget>('mid');
  const [music, setMusic] = useState<Music>('TECHNO');

  useEffect(() => {
    const db = loadDB();
    setEvents(db.events || []);

    const interval = setInterval(() => {
      setLiveUsers((prev) => prev + Math.floor(Math.random() * 4));
      setPlansCreated((prev) => prev + Math.floor(Math.random() * 2));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const matchedEvent = useMemo(() => {
    const byGenre = events.find((event) => event.genre === music);
    return byGenre || events[0] || null;
  }, [events, music]);

  const matchScore = useMemo(() => {
    let score = 82;

    if (energy === 'destroy') score += 9;
    if (energy === 'wild') score += 6;
    if (budget === 'high') score += 4;
    if (music === matchedEvent?.genre) score += 5;

    return Math.min(score, 99);
  }, [energy, budget, music, matchedEvent]);

  const startMatchedPlan = () => {
    if (matchedEvent) {
      localStorage.setItem(STORAGE_KEYS.selectedPlanEvent, matchedEvent.id);
    }

    window.location.href = '/plan';
  };

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="pointer-events-none fixed left-[-120px] top-[-120px] z-0 h-[320px] w-[320px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-[-140px] right-[-140px] z-0 h-[360px] w-[360px] rounded-full bg-pink-600/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <MotionCard delay={0}>
          <section className="mb-6 overflow-hidden rounded-[2.3rem] border border-white/10 bg-gradient-to-br from-purple-700/30 via-pink-600/20 to-blue-700/20 p-6 shadow-[0_0_90px_rgba(168,85,247,0.18)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-200">
                  {BRAND.name} TESTPHASE
                </p>

                <h1 className="mt-3 text-5xl font-black leading-none">
                  {BRAND.tagline}
                </h1>
              </div>

              <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.7rem] bg-white/10 backdrop-blur-xl">
                <Zap size={32} />
              </div>
            </div>

            <p className="mb-6 max-w-xl text-base leading-relaxed text-white/60">
              Events entdecken, Essen planen, Taxi sichern, Crew organisieren und im Safe Mode sicher nach Hause kommen.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/swipe"
                className="vybe-button flex h-16 items-center justify-center gap-3 rounded-[1.5rem] text-lg font-black"
              >
                <Flame size={22} />
                Events swipen
              </Link>

              <Link
                href="/feedback"
                className="flex h-16 items-center justify-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 text-lg font-black"
              >
                <MessageCircle size={22} />
                Feedback geben
              </Link>
            </div>
          </section>
        </MotionCard>

        <MotionCard delay={0.06}>
          <section className="mb-6 rounded-[2.2rem] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/15 via-purple-600/15 to-pink-600/10 p-5 shadow-[0_0_70px_rgba(234,179,8,0.08)]">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-pink-600">
                <MessageCircle size={28} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                  Testphase
                </p>

                <h2 className="text-3xl font-black">
                  Hilf NOXEN besser zu machen
                </h2>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-white/55">
              Teste wie ein echter Nutzer: Was ist geil? Was nervt? Was fehlt? Dein Feedback entscheidet, was als Nächstes gebaut wird.
            </p>

            <Link
              href="/feedback"
              className="flex h-14 items-center justify-center gap-3 rounded-[1.5rem] bg-gradient-to-r from-yellow-500 to-pink-600 text-sm font-black shadow-[0_0_30px_rgba(234,179,8,0.18)]"
            >
              <MessageCircle size={20} />
              Feedback abgeben
            </Link>
          </section>
        </MotionCard>

        <MotionCard delay={0.12}>
          <section className="mb-6 rounded-[2.2rem] border border-purple-500/20 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-blue-600/10 p-5 shadow-[0_0_70px_rgba(168,85,247,0.14)]">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
                <Wand2 size={28} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-300">
                  NOXEN NIGHT MATCH
                </p>

                <h2 className="text-3xl font-black">Was bist du heute?</h2>
              </div>
            </div>

            <div className="mb-5 grid gap-4 md:grid-cols-3">
              <ChoiceGroup
                label="Energie"
                value={energy}
                options={[
                  ['chill', 'Chill'],
                  ['wild', 'Wild'],
                  ['destroy', 'Eskalation'],
                ]}
                onChange={(value) => setEnergy(value as Energy)}
              />

              <ChoiceGroup
                label="Budget"
                value={budget}
                options={[
                  ['low', 'Low'],
                  ['mid', 'Normal'],
                  ['high', 'Premium'],
                ]}
                onChange={(value) => setBudget(value as Budget)}
              />

              <ChoiceGroup
                label="Sound"
                value={music}
                options={[
                  ['TECHNO', 'Techno'],
                  ['HIP HOP', 'Hip Hop'],
                  ['HOUSE', 'House'],
                  ['MIXED', 'Mixed'],
                ]}
                onChange={(value) => setMusic(value as Music)}
              />
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-black/30 p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-white/35">
                    Dein Match
                  </p>

                  <h3 className="text-3xl font-black leading-tight">
                    {matchedEvent?.title || 'Noch kein Event'}
                  </h3>

                  <p className="mt-2 text-sm text-white/45">
                    {matchedEvent
                      ? `${matchedEvent.clubName} · ${matchedEvent.city} · ${matchedEvent.genre}`
                      : 'Lege Events im Mitarbeiterbereich an.'}
                  </p>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-green-500/20 to-purple-500/20 px-4 py-3 text-right">
                  <p className="text-xs font-black text-white/35">Match</p>
                  <p className="text-3xl font-black text-green-300">{matchScore}%</p>
                </div>
              </div>

              <div className="mb-5 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 via-purple-500 to-pink-500 transition-all duration-700"
                  style={{ width: `${matchScore}%` }}
                />
              </div>

              <button
                onClick={startMatchedPlan}
                className="vybe-button flex w-full items-center justify-center gap-3 rounded-[1.5rem] py-4 text-sm font-black"
              >
                <Sparkles size={20} />
                Abend mit Match planen
              </button>
            </div>
          </section>
        </MotionCard>

        <section className="mb-6 grid gap-4 md:grid-cols-2">
          <MotionCard delay={0.18}>
            <FeatureBanner
              href="/crew"
              icon={<Users size={36} />}
              title="NOXEN Crew"
              text="Freunde hinzufügen, Rollen vergeben, Crew teilen und gemeinsam planen."
              color="from-blue-600/25 via-purple-600/15 to-pink-500/10"
            />
          </MotionCard>

          <MotionCard delay={0.22}>
            <FeatureBanner
              href="/music"
              icon={<Headphones size={36} />}
              title="NOXEN Sound"
              text="Wähle den Sound für deinen Abend — Techno, Hip Hop, House oder Chaos."
              color="from-green-500/20 via-purple-600/15 to-pink-500/10"
            />
          </MotionCard>

          <MotionCard delay={0.26}>
            <FeatureBanner
              href="/assistant"
              icon={<Bot size={36} />}
              title="NOXEN AI"
              text="Frag nach Events, Budget, Taxi, Food oder dem besten Plan für heute."
              color="from-purple-600/25 via-blue-600/15 to-pink-500/10"
            />
          </MotionCard>

          <MotionCard delay={0.3}>
            <FeatureBanner
              href="/drunk"
              icon={<ShieldAlert size={36} />}
              title="Safe Mode"
              text="Große Buttons. Taxi. Standort teilen. Notfallhilfe."
              color="from-red-600/25 via-pink-600/15 to-orange-500/10"
            />
          </MotionCard>
        </section>

        <section className="mb-6 grid gap-3 md:grid-cols-3">
          <MotionCard delay={0.34}>
            <LiveCard
              icon={<Radio />}
              label="Live jetzt"
              value={`${liveUsers.toLocaleString('de-DE')} aktiv`}
              text="checken gerade Events"
            />
          </MotionCard>

          <MotionCard delay={0.38}>
            <LiveCard
              icon={<Users />}
              label="Heute"
              value={`${plansCreated} Pläne`}
              text="wurden erstellt"
            />
          </MotionCard>

          <MotionCard delay={0.42}>
            <LiveCard
              icon={<TrendingUp />}
              label="Trend"
              value="Köln eskaliert"
              text="Bootshaus zieht gerade an"
            />
          </MotionCard>
        </section>

        <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <MotionCard delay={0.46}>
            <QuickCard href="/events" icon={<CalendarDays />} title="Events" text="Alle Partys" />
          </MotionCard>

          <MotionCard delay={0.5}>
            <QuickCard href="/food" icon={<Utensils />} title="Food" text="Vorher & danach" />
          </MotionCard>

          <MotionCard delay={0.54}>
            <QuickCard href="/taxi" icon={<Car />} title="Taxi" text="Heimweg sichern" />
          </MotionCard>

          <MotionCard delay={0.58}>
            <QuickCard href="/saved" icon={<Heart />} title="Saved" text="Favoriten" />
          </MotionCard>
        </section>

        <section className="grid gap-3 md:grid-cols-2">
          <MotionCard delay={0.62}>
            <WideCard
              href="/plan/saved"
              icon={<ClipboardList />}
              title="Gespeicherte Pläne"
              text="Deine fertigen Abende später wieder öffnen."
            />
          </MotionCard>

          <MotionCard delay={0.66}>
            <WideCard
              href="/mitarbeiter/dashboard"
              icon={<Map />}
              title="Mitarbeiterbereich"
              text="Events, Datenbank und Uploads verwalten."
            />
          </MotionCard>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}

function FeatureBanner({
  href,
  icon,
  title,
  text,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-5 rounded-[2rem] border border-white/10 bg-gradient-to-r ${color} p-5 shadow-[0_0_55px_rgba(168,85,247,0.10)] active:scale-[0.99]`}
    >
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.6rem] bg-white/10">
        {icon}
      </div>

      <div>
        <h2 className="text-3xl font-black">{title}</h2>
        <p className="mt-1 text-sm text-white/55">{text}</p>
      </div>
    </Link>
  );
}

function ChoiceGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>

      <div className="grid gap-2">
        {options.map(([optionValue, optionLabel]) => (
          <button
            key={optionValue}
            onClick={() => onChange(optionValue)}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition-all ${
              value === optionValue
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                : 'border border-white/10 bg-white/[0.045] text-white/45'
            }`}
          >
            {optionLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

function LiveCard({
  icon,
  label,
  value,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  text: string;
}) {
  return (
    <div className="vybe-card vybe-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-purple-300">
          {icon}
        </div>

        <div className="live-dot" />
      </div>

      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <h3 className="mt-2 text-2xl font-black">{value}</h3>

      <p className="mt-1 text-sm text-white/40">{text}</p>
    </div>
  );
}

function QuickCard({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link href={href} className="vybe-card block p-4 active:scale-[0.98]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-purple-300">
        {icon}
      </div>

      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-1 text-sm text-white/40">{text}</p>
    </Link>
  );
}

function WideCard({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link href={href} className="vybe-card flex items-center gap-4 p-5 active:scale-[0.99]">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
        {icon}
      </div>

      <div>
        <h3 className="text-xl font-black">{title}</h3>
        <p className="mt-1 text-sm text-white/40">{text}</p>
      </div>
    </Link>
  );
}