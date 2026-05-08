'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Calendar,
  Car,
  Flame,
  Heart,
  Map,
  ShieldAlert,
  Sparkles,
  Ticket,
  Users,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import { loadDB, type EventItem } from '@/lib/data-store';

type Activity = {
  id: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  time: string;
  color: string;
};

export default function ActivityPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [pulse, setPulse] = useState(218);

  useEffect(() => {
    const db = loadDB();
    setEvents(db.events || []);

    const interval = setInterval(() => {
      setPulse((prev) => prev + Math.floor(Math.random() * 5));
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const topEvent = events[0];

  const activities: Activity[] = [
    {
      id: '1',
      icon: <Flame size={22} />,
      title: 'Event trendet',
      text: `${topEvent?.title || 'BLACKOUT'} zieht gerade massiv an.`,
      time: 'Gerade eben',
      color: 'from-orange-500 to-pink-600',
    },
    {
      id: '2',
      icon: <Users size={22} />,
      title: 'Neue Crew geplant',
      text: 'Eine Gruppe hat gerade einen kompletten Abend erstellt.',
      time: '2 Min',
      color: 'from-blue-500 to-purple-600',
    },
    {
      id: '3',
      icon: <Ticket size={22} />,
      title: 'Tickets werden knapp',
      text: 'Bei mehreren Events sind nur noch wenige Plätze verfügbar.',
      time: '5 Min',
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: '4',
      icon: <Car size={22} />,
      title: 'Ride Nachfrage steigt',
      text: 'Taxi-Auslastung für später nimmt deutlich zu.',
      time: '8 Min',
      color: 'from-green-500 to-blue-600',
    },
    {
      id: '5',
      icon: <ShieldAlert size={22} />,
      title: 'Safe Mode aktiv',
      text: 'Mehr Nutzer öffnen gerade den Drunk Mode.',
      time: '11 Min',
      color: 'from-red-500 to-orange-600',
    },
    {
      id: '6',
      icon: <Heart size={22} />,
      title: 'Favoriten steigen',
      text: 'Events werden gerade auffällig oft gespeichert.',
      time: '14 Min',
      color: 'from-pink-500 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="mx-auto max-w-5xl">
        <section className="mb-6 rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-purple-700/30 via-pink-600/20 to-blue-700/15 p-6 shadow-[0_0_80px_rgba(168,85,247,0.16)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-purple-300">
                VYBE LIVE
              </p>

              <h1 className="text-5xl font-black leading-none">
                Was gerade abgeht.
              </h1>
            </div>

            <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10">
              <Bell size={32} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            Live-Feeling für Events, Crews, Tickets und Heimweg. In der Demo simuliert — später echte Plattformdaten.
          </p>
        </section>

        <section className="mb-6 grid gap-3 md:grid-cols-3">
          <StatCard
            icon={<Flame size={22} />}
            label="Live Pulse"
            value={`${pulse}`}
            text="Aktionen heute"
          />

          <StatCard
            icon={<Users size={22} />}
            label="Crews"
            value="37"
            text="planen gerade"
          />

          <StatCard
            icon={<Ticket size={22} />}
            label="Tickets"
            value="Knapp"
            text="bei Top Events"
          />
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
          <main className="vybe-card p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                  Activity Feed
                </p>

                <h2 className="mt-1 text-3xl font-black">
                  Live Bewegung
                </h2>
              </div>

              <div className="rounded-full bg-green-500/15 px-4 py-2 text-xs font-black text-green-300">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,1)]" />
                LIVE
              </div>
            </div>

            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-4 rounded-[1.7rem] border border-white/10 bg-black/25 p-4"
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${activity.color}`}
                  >
                    {activity.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-black">
                        {activity.title}
                      </h3>

                      <span className="shrink-0 text-xs font-bold text-white/30">
                        {activity.time}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-relaxed text-white/45">
                      {activity.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <aside className="space-y-4">
            <div className="vybe-card vybe-border p-5">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
                <Sparkles size={26} />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                Smart Hint
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Jetzt planen lohnt sich
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/45">
                Wenn Tickets knapp werden und Taxi-Nachfrage steigt, sollte der Abend vorher stehen.
              </p>

              <Link
                href="/plan"
                className="vybe-button mt-5 flex h-14 items-center justify-center gap-2 rounded-2xl text-sm font-black"
              >
                <Map size={18} />
                Planer öffnen
              </Link>
            </div>

            <Quick href="/events" icon={<Calendar size={20} />} title="Events" />
            <Quick href="/crew" icon={<Users size={20} />} title="Crew Mode" />
            <Quick href="/drunk" icon={<ShieldAlert size={20} />} title="Safe Mode" />
          </aside>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function StatCard({
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
    <div className="vybe-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-purple-300">
          {icon}
        </div>

        <div className="live-dot" />
      </div>

      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black">
        {value}
      </p>

      <p className="mt-1 text-sm text-white/40">
        {text}
      </p>
    </div>
  );
}

function Quick({
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
      className="vybe-card flex h-16 items-center gap-3 px-5 active:scale-[0.99]"
    >
      <div className="text-purple-300">
        {icon}
      </div>

      <span className="font-black">
        {title}
      </span>
    </Link>
  );
}