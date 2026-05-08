'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Car,
  Home,
  MapPin,
  Phone,
  ShieldAlert,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react';

import { loadDB, type VybeDB } from '@/lib/data-store';

export default function DrunkModePage() {
  const [db, setDb] = useState<VybeDB | null>(null);
  const [status, setStatus] = useState('');
  const [safeLevel, setSafeLevel] = useState(84);

  useEffect(() => {
    setDb(loadDB());

    const interval = setInterval(() => {
      setSafeLevel((prev) => {
        const next = prev + Math.floor(Math.random() * 5) - 2;
        return Math.max(72, Math.min(96, next));
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const taxi = db?.taxis?.[0];

  const shareLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Standort wird nicht unterstützt.');
      return;
    }

    setStatus('Standort wird geholt...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const text = `Ich bin hier: ${mapsLink}`;

        try {
          if (navigator.share) {
            await navigator.share({
              title: 'Mein Standort',
              text,
              url: mapsLink,
            });
            setStatus('Standort geteilt.');
          } else {
            await navigator.clipboard.writeText(text);
            setStatus('Standort-Link kopiert.');
          }
        } catch {
          setStatus('Teilen abgebrochen.');
        }
      },
      () => {
        setStatus('Standort konnte nicht geladen werden.');
      }
    );
  };

  const openMapsHome = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Zuhause',
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-black px-5 pb-10 pt-8 text-white">
      <div className="noise" />

      <div className="mx-auto max-w-md">
        <section className="mb-6 rounded-[2.3rem] border border-red-500/20 bg-gradient-to-br from-red-600/25 via-pink-600/15 to-purple-700/20 p-6 shadow-[0_0_80px_rgba(239,68,68,0.18)]">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-red-600 shadow-[0_0_45px_rgba(239,68,68,0.45)]">
              <ShieldAlert size={40} />
            </div>

            <div className="rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-black">
                <span className="live-dot" />
                SAFE MODE
              </div>
            </div>
          </div>

          <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-red-200">
            VYBE DRUNK MODE
          </p>

          <h1 className="text-5xl font-black leading-none">
            Ruhig. Einfach. Heim.
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Große Buttons, keine Ablenkung, schnelle Hilfe. Alles was du brauchst, wenn der Abend etwas zu wild war.
          </p>

          <div className="mt-6 rounded-[1.6rem] bg-black/35 p-4">
            <div className="mb-2 flex items-center justify-between text-xs font-black text-white/45">
              <span>Safety Score</span>
              <span>{safeLevel}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-700"
                style={{ width: `${safeLevel}%` }}
              />
            </div>
          </div>
        </section>

        {status && (
          <div className="mb-5 rounded-[1.7rem] border border-white/10 bg-white/10 p-4 text-center text-sm font-bold text-white/70">
            {status}
          </div>
        )}

        <div className="space-y-4">
          {taxi?.phone ? (
            <a
              href={`tel:${taxi.phone}`}
              className="flex min-h-[112px] items-center gap-5 rounded-[2rem] bg-gradient-to-r from-purple-600 to-pink-600 px-5 shadow-[0_0_45px_rgba(168,85,247,0.35)] active:scale-[0.98]"
            >
              <BigIcon>
                <Car size={38} />
              </BigIcon>

              <div>
                <h2 className="text-3xl font-black">Taxi anrufen</h2>
                <p className="mt-1 text-white/75">{taxi.name}</p>
              </div>
            </a>
          ) : (
            <Link
              href="/taxi"
              className="flex min-h-[112px] items-center gap-5 rounded-[2rem] bg-gradient-to-r from-purple-600 to-pink-600 px-5 shadow-[0_0_45px_rgba(168,85,247,0.35)] active:scale-[0.98]"
            >
              <BigIcon>
                <Car size={38} />
              </BigIcon>

              <div>
                <h2 className="text-3xl font-black">Taxi</h2>
                <p className="mt-1 text-white/75">Taxi-Liste öffnen</p>
              </div>
            </Link>
          )}

          <button
            onClick={openMapsHome}
            className="flex min-h-[112px] w-full items-center gap-5 rounded-[2rem] border border-white/10 bg-white/10 px-5 active:scale-[0.98]"
          >
            <BigIcon>
              <Home size={38} />
            </BigIcon>

            <div className="text-left">
              <h2 className="text-3xl font-black">Nach Hause</h2>
              <p className="mt-1 text-white/55">Navigation öffnen</p>
            </div>
          </button>

          <button
            onClick={shareLocation}
            className="flex min-h-[112px] w-full items-center gap-5 rounded-[2rem] border border-white/10 bg-white/10 px-5 active:scale-[0.98]"
          >
            <BigIcon>
              <Share2 size={38} />
            </BigIcon>

            <div className="text-left">
              <h2 className="text-3xl font-black">Standort teilen</h2>
              <p className="mt-1 text-white/55">An Freunde senden</p>
            </div>
          </button>

          <Link
            href="/drunk/contacts"
            className="flex min-h-[112px] items-center gap-5 rounded-[2rem] border border-white/10 bg-white/10 px-5 active:scale-[0.98]"
          >
            <BigIcon>
              <Users size={38} />
            </BigIcon>

            <div>
              <h2 className="text-3xl font-black">Kontakte</h2>
              <p className="mt-1 text-white/55">Notfallkontakte öffnen</p>
            </div>
          </Link>

          <a
            href="tel:112"
            className="flex min-h-[112px] items-center gap-5 rounded-[2rem] bg-red-600 px-5 shadow-[0_0_45px_rgba(239,68,68,0.45)] active:scale-[0.98]"
          >
            <BigIcon>
              <Phone size={38} />
            </BigIcon>

            <div>
              <h2 className="text-3xl font-black">Hilfe</h2>
              <p className="mt-1 text-white/80">Notruf 112</p>
            </div>
          </a>
        </div>

        <div className="mt-6 rounded-[2rem] border border-yellow-500/20 bg-yellow-500/10 p-5">
          <div className="mb-2 flex items-center gap-2 text-yellow-300">
            <AlertTriangle size={18} />
            <p className="text-xs font-black uppercase tracking-[0.18em]">
              Kurz checken
            </p>
          </div>

          <p className="text-sm leading-relaxed text-white/55">
            Trink Wasser, bleib bei deiner Gruppe und fahr nicht selbst. App schön und gut — aber Gehirn bleibt Chef.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href="/plan"
            className="flex h-16 items-center justify-center gap-2 rounded-[1.6rem] bg-white/10 text-lg font-black text-white/70"
          >
            <MapPin size={22} />
            Plan
          </Link>

          <Link
            href="/home"
            className="flex h-16 items-center justify-center gap-2 rounded-[1.6rem] bg-white/10 text-lg font-black text-white/70"
          >
            <Sparkles size={22} />
            Normal
          </Link>
        </div>
      </div>
    </div>
  );
}

function BigIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-white/10">
      {children}
    </div>
  );
}