'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Database,
  Lock,
  LogOut,
  ShieldCheck,
  Users,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';

const EMPLOYEE_PIN = '2026';
const STORAGE_KEY = 'vybe_employee_auth';

export default function MitarbeiterClient() {
  const [pin, setPin] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setIsAuthed(saved === 'true');
  }, []);

  const login = () => {
    if (pin === EMPLOYEE_PIN) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthed(true);
      setError('');
      setPin('');
      return;
    }

    setError('Falscher Mitarbeiter-PIN.');
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthed(false);
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#050509] px-5 pb-32 pt-10 text-white">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-[0_0_35px_rgba(168,85,247,0.35)]">
              <Lock size={30} />
            </div>

            <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-purple-300">
              Mitarbeiterbereich
            </p>

            <h1 className="text-3xl font-black">Zugriff geschützt</h1>

            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Dieser Bereich ist nur für Mitarbeiter gedacht. Hier werden Events,
              Food-Spots, Taxi-Anbieter und interne Daten gepflegt.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
            <label className="mb-4 block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/35">
                Mitarbeiter-PIN
              </span>

              <input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(event) => setPin(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') login();
                }}
                placeholder="PIN eingeben"
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-center text-xl font-black tracking-[0.3em] text-white outline-none focus:border-purple-400"
              />
            </label>

            {error && (
              <p className="mb-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">
                {error}
              </p>
            )}

            <button
              onClick={login}
              className="w-full rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-4 text-sm font-black shadow-[0_0_35px_rgba(168,85,247,0.35)] active:scale-[0.98]"
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
    <div className="min-h-screen bg-[#050509] px-5 pb-32 pt-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-purple-300">
              <ShieldCheck size={20} />
              <span className="text-xs font-black uppercase tracking-[0.22em]">
                Mitarbeiterbereich
              </span>
            </div>

            <h1 className="text-3xl font-black">Internes Dashboard</h1>

            <p className="mt-2 text-sm text-white/45">
              Pflege hier die Inhalte der App. Dieser Bereich ist nicht für normale Nutzer gedacht.
            </p>
          </div>

          <button
            onClick={logout}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-300"
          >
            <LogOut size={18} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/database"
            className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 active:scale-[0.98]"
          >
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
              <Database size={26} />
            </div>

            <h2 className="text-xl font-black">Datenbank verwalten</h2>

            <p className="mt-2 text-sm leading-relaxed text-white/45">
              Events, Essen, Taxi-Anbieter, Links, Preise und Notizen bearbeiten.
            </p>

            <div className="mt-5 rounded-2xl bg-black/35 px-4 py-3 text-sm font-black text-purple-200">
              Datenbank öffnen →
            </div>
          </Link>

          <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 opacity-70">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-white/10">
              <Users size={26} />
            </div>

            <h2 className="text-xl font-black">Team & Rollen</h2>

            <p className="mt-2 text-sm leading-relaxed text-white/45">
              Später: Mitarbeiter verwalten, Rollen vergeben und Rechte steuern.
            </p>

            <div className="mt-5 rounded-2xl bg-black/35 px-4 py-3 text-sm font-black text-white/30">
              Kommt später
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}