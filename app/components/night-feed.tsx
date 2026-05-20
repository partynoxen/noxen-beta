'use client';

import { Flame } from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import LiveActivity from '../components/live-activity';
import LiveMap from '../components/live-map';
import AmbientBackground from '../components/ambient-background';
import LiveIsland from '../components/live-island';
import FloatingStatus from '../components/floating-status';
import LiveCrowd from '../components/live-crowd';
import TrendingEvents from '../components/trending-events';

export default function HomeClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-black pb-40 text-white">

      <AmbientBackground />
      <FloatingStatus />

      <div className="relative z-10 px-5 pt-10">

        <LiveIsland />

        {/* HERO */}
        <div className="relative mb-10 overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.03] shadow-[0_0_80px_rgba(255,255,255,0.03)] backdrop-blur-3xl">

          <div className="absolute inset-0">

            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571266028243-d220c9f5f7e8?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-40 scale-105" />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

          </div>

          <div className="relative z-20 flex min-h-[520px] flex-col justify-between p-8">

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300 backdrop-blur-xl">

                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                  LIVE NOW

                </div>

                <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-xl">

                  Köln • 24 Events

                </div>

              </div>

              <div className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-3 text-red-300 backdrop-blur-xl">

                <Flame className="h-4 w-4" />

                HOT NIGHT

              </div>

            </div>

            <div>

              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-pink-400">
                NOXEN NIGHTLIFE
              </p>

              <h1 className="text-7xl font-black leading-[0.9]">
                Tonight
                <br />
                Hits Different.
              </h1>

              <p className="mt-8 max-w-2xl text-2xl leading-relaxed text-white/60">
                Entdecke live die besten Events,
                Clubs, Foodspots und Nächte
                deiner Stadt.
              </p>

            </div>

          </div>

        </div>

        <LiveActivity />

        <div className="mb-10 mt-10">
          <LiveMap />
        </div>

        <div className="mb-10">
          <LiveCrowd />
        </div>

        <div className="mb-10">
          <TrendingEvents />
        </div>

      </div>

      <BottomNav />

    </main>
  );
}