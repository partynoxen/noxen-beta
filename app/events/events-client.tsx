"use client";

import {
  Flame,
  MapPin,
  Calendar,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";

export default function EventsClient() {
  return (
    <main className="min-h-screen bg-black pb-32 text-white">
      <div className="px-5 pt-16">
        <p className="text-sm uppercase tracking-[0.3em] text-pink-400">
          NOXEN
        </p>

        <h1 className="mt-4 text-5xl font-black">
          Events
        </h1>

        <p className="mt-4 text-white/60">
          Live Events der NOXEN Beta.
        </p>

        <div className="mt-8 space-y-6">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04]">
            <div className="h-52 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" />

            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-pink-400">
                <Flame size={16} />
                LIVE
              </div>

              <h2 className="mt-3 text-3xl font-black">
                Neon District
              </h2>

              <div className="mt-4 flex items-center gap-2 text-white/60">
                <MapPin size={16} />
                Köln
              </div>

              <div className="mt-2 flex items-center gap-2 text-white/60">
                <Calendar size={16} />
                Samstag • 23:00
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}