'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Car,
  Database,
  Flame,
  ShieldCheck,
  Utensils,
  Users,
  Eye,
  BarChart3,
  Settings,
  Lock,
  UploadCloud,
} from 'lucide-react';

import BottomNav from '../../components/bottom-nav';

const PASSWORD = '2026';
const STORAGE_KEY = 'vybe_employee_dashboard_auth';

export default function MitarbeiterDashboardPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) === 'true';
    setAuthed(saved);
  }, []);

  const login = () => {
    if (password === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setAuthed(true);
      setError('');
      return;
    }

    setError('Falsches Kennwort.');
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword('');
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050509] px-5 py-10 text-white">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-purple-600 to-pink-600 shadow-[0_0_50px_rgba(168,85,247,0.35)]">
              <Lock size={36} />
            </div>

            <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-purple-300">
              VYBE INTERNAL
            </p>

            <h1 className="text-4xl font-black">Mitarbeiter Login</h1>

            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Dieser Bereich ist nur für interne Mitarbeiter gedacht.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
            <label className="mb-5 block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/35">
                Kennwort
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') login();
                }}
                placeholder="Kennwort eingeben"
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-center text-2xl font-black tracking-[0.2em] text-white outline-none focus:border-purple-500"
              />
            </label>

            {error && (
              <div className="mb-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">
                {error}
              </div>
            )}

            <button
              onClick={login}
              className="h-14 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-lg font-black shadow-[0_0_35px_rgba(168,85,247,0.35)]"
            >
              Einloggen
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-32 pt-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-purple-300">
              <ShieldCheck size={20} />
              <span className="text-xs font-black uppercase tracking-[0.22em]">
                VYBE INTERNAL
              </span>
            </div>

            <h1 className="text-4xl font-black leading-tight">
              Mitarbeiter Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
              Interne Verwaltung für Events, Food-Spots, Taxi-Anbieter und Plattformsteuerung.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-2xl bg-red-500/10 px-4 py-3 text-xs font-black text-red-300"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Events" value="148" icon={<Calendar size={22} />} />
          <StatCard label="Food Spots" value="62" icon={<Utensils size={22} />} />
          <StatCard label="Taxi Partner" value="19" icon={<Car size={22} />} />
          <StatCard label="Aktive Nutzer" value="4.2K" icon={<Users size={22} />} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DashboardCard
            href="/mitarbeiter/upload"
            title="Event Upload"
            text="Neue Events mit Bildern und Infos hochladen."
            icon={<UploadCloud size={28} />}
            color="from-purple-600 to-pink-600"
          />

          <DashboardCard
            href="/database"
            title="Datenbank"
            text="Events, Essen und Taxi manuell verwalten."
            icon={<Database size={28} />}
            color="from-blue-600 to-cyan-600"
          />

          <DashboardCard
            href="/events"
            title="Live Events"
            text="Alle aktuellen Events prüfen."
            icon={<Calendar size={28} />}
            color="from-blue-600 to-cyan-600"
          />

          <DashboardCard
            href="/food"
            title="Food Management"
            text="Restaurants und Partner verwalten."
            icon={<Utensils size={28} />}
            color="from-orange-600 to-red-600"
          />

          <DashboardCard
            href="/taxi"
            title="Taxi Management"
            text="Taxi-Anbieter und Preise verwalten."
            icon={<Car size={28} />}
            color="from-yellow-500 to-orange-600"
          />

          <DashboardCard
            href="/swipe"
            title="Swipe Feed"
            text="App Ansicht der Nutzer prüfen."
            icon={<Flame size={28} />}
            color="from-pink-600 to-red-600"
          />

          <DashboardCard
            href="/home"
            title="App Vorschau"
            text="Frontend der App live testen."
            icon={<Eye size={28} />}
            color="from-green-600 to-emerald-600"
          />
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Settings size={26} />
            </div>

            <div>
              <h2 className="text-2xl font-black">Nächste interne Features</h2>
              <p className="mt-1 text-sm text-white/40">Geplante Mitarbeiter-Tools</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <ComingSoon text="Club-Verifizierung" />
            <ComingSoon text="Live Heat Scores" />
            <ComingSoon text="Nutzer Moderation" />
            <ComingSoon text="Analytics Dashboard" />
            <ComingSoon text="Mitarbeiter Rollen" />
            <ComingSoon text="Push Benachrichtigungen" />
            <ComingSoon text="AI Party Empfehlungen" />
            <ComingSoon text="Club Dashboard für Veranstalter" />
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-600/15 via-pink-600/10 to-blue-600/10 p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
              <BarChart3 size={26} />
            </div>

            <div>
              <h2 className="text-2xl font-black">Plattform Analytics</h2>
              <p className="mt-1 text-sm text-white/40">Kommt als nächstes</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <MiniAnalytics label="Heute" value="842" />
            <MiniAnalytics label="Swipes" value="14K" />
            <MiniAnalytics label="Likes" value="2.1K" />
            <MiniAnalytics label="Planungen" value="398" />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function DashboardCard({
  href,
  title,
  text,
  icon,
  color,
}: {
  href: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 transition-all active:scale-[0.98]"
    >
      <div
        className={`mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${color}`}
      >
        {icon}
      </div>

      <h2 className="text-2xl font-black">{title}</h2>

      <p className="mt-2 text-sm leading-relaxed text-white/45">{text}</p>

      <div className="mt-5 rounded-2xl bg-black/35 px-4 py-3 text-sm font-black text-white/70">
        Öffnen →
      </div>
    </Link>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-purple-300">
        {icon}
      </div>

      <p className="text-3xl font-black">{value}</p>

      <p className="mt-1 text-sm text-white/40">{label}</p>
    </div>
  );
}

function ComingSoon({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white/60">
      {text}
    </div>
  );
}

function MiniAnalytics({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="text-2xl font-black">{value}</p>

      <p className="mt-1 text-sm text-white/40">{label}</p>
    </div>
  );
}