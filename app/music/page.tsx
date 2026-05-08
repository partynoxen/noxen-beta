'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Disc3,
  Flame,
  Headphones,
  Music2,
  Play,
  Radio,
  Sparkles,
  Volume2,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';

const moods = [
  {
    id: 'techno',
    title: 'Techno Tunnel',
    subtitle: 'Dunkel, schnell, komplett fokussiert.',
    bpm: '142 BPM',
    vibe: 'Hard',
  },
  {
    id: 'hiphop',
    title: 'Hip Hop Heat',
    subtitle: 'Bass, Crowd, Hände oben.',
    bpm: '96 BPM',
    vibe: 'Hot',
  },
  {
    id: 'house',
    title: 'House Glow',
    subtitle: 'Groovy, warm, Premium Night.',
    bpm: '124 BPM',
    vibe: 'Smooth',
  },
  {
    id: 'mixed',
    title: 'Mainstream Chaos',
    subtitle: 'Alles, was die Gruppe mitsingt.',
    bpm: '128 BPM',
    vibe: 'Wild',
  },
];

export default function MusicPage() {
  const [active, setActive] = useState(moods[0]);

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="mx-auto max-w-5xl">
        <section className="mb-6 rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-green-500/20 via-purple-600/20 to-pink-600/20 p-6 shadow-[0_0_80px_rgba(34,197,94,0.12)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-green-300">
                VYBE MUSIC
              </p>

              <h1 className="text-5xl font-black leading-none">
                Soundtrack für die Nacht.
              </h1>
            </div>

            <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10">
              <Headphones size={32} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            Demo-Modul für spätere Spotify-Integration: Mood wählen, Abend planen, Playlist passend zur Energie.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <main className="vybe-card p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-purple-600">
                <Disc3 size={28} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                  Aktueller Mood
                </p>

                <h2 className="text-3xl font-black">{active.title}</h2>
              </div>
            </div>

            <div className="mb-6 rounded-[2rem] border border-white/10 bg-black/30 p-6 text-center">
              <div className="mx-auto mb-6 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-green-400 via-purple-600 to-pink-600 shadow-[0_0_80px_rgba(168,85,247,0.3)]">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black/60">
                  <Play size={38} className="ml-1 fill-white" />
                </div>
              </div>

              <h3 className="text-4xl font-black">{active.title}</h3>

              <p className="mt-3 text-white/50">{active.subtitle}</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <SmallStat label="BPM" value={active.bpm} />
                <SmallStat label="Vibe" value={active.vibe} />
                <SmallStat label="Energy" value="94%" />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setActive(mood)}
                  className={`rounded-[1.7rem] p-4 text-left transition-all active:scale-[0.98] ${
                    active.id === mood.id
                      ? 'bg-gradient-to-br from-green-500/25 to-purple-600/20 border border-green-400/20'
                      : 'border border-white/10 bg-white/[0.045]'
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <Music2 className="text-green-300" size={22} />
                    {active.id === mood.id && (
                      <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-black text-green-300">
                        AKTIV
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-black">{mood.title}</h4>
                  <p className="mt-1 text-sm text-white/45">{mood.subtitle}</p>
                </button>
              ))}
            </div>
          </main>

          <aside className="space-y-4">
            <div className="vybe-card vybe-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-green-300">
                  <Radio size={24} />
                </div>

                <div className="live-dot" />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                Live Vibe
              </p>

              <h3 className="mt-2 text-3xl font-black">Köln hört Techno</h3>

              <p className="mt-2 text-sm leading-relaxed text-white/45">
                Demo-Signal: später könnten hier Spotify-Trends, Club-Sounds oder Nutzer-Moods einfließen.
              </p>
            </div>

            <Link
              href="/swipe"
              className="vybe-button flex h-16 items-center justify-center gap-3 rounded-[1.6rem] text-sm font-black"
            >
              <Flame size={20} />
              Passende Events swipen
            </Link>

            <Link
              href="/plan"
              className="flex h-16 items-center justify-center gap-3 rounded-[1.6rem] border border-white/10 bg-white/10 text-sm font-black"
            >
              <Sparkles size={20} />
              Abend damit planen
            </Link>

            <div className="vybe-card p-5">
              <div className="mb-3 flex items-center gap-2 text-purple-300">
                <Volume2 size={18} />
                <p className="text-xs font-black uppercase tracking-[0.18em]">
                  Coming Soon
                </p>
              </div>

              <p className="text-sm leading-relaxed text-white/45">
                Spotify Login, Gruppenplaylist, Club-Soundcheck und automatische Playlist passend zum Event.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <p className="text-xs text-white/35">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}