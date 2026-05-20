"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Flame,
  MapPin,
  Clock3,
  Users,
  Music4,
  Ticket,
  Car,
  UtensilsCrossed,
  Camera,
  Sparkles,
} from "lucide-react";

export default function EventDetailPage() {
  return (
    <main className="min-h-screen bg-black text-white pb-32 overflow-hidden">

      <div className="fixed top-[-200px] left-[-100px] w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[140px]" />

      <div className="fixed bottom-[-200px] right-[-100px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[140px]" />

      <div className="relative h-[430px] overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_40%)]" />

        <div className="absolute top-6 left-6 z-20">

          <Link
            href="/home"
            className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

        </div>

        <div className="absolute top-6 right-6 z-20 flex gap-3">

          <div className="bg-red-500/20 border border-red-500/20 rounded-full px-4 py-2 flex items-center gap-2 text-red-300 text-sm backdrop-blur-xl">

            <Flame className="w-4 h-4" />

            HOT EVENT

          </div>

          <div className="bg-black/40 border border-white/10 rounded-full px-4 py-2 text-sm backdrop-blur-xl">

            TECHNO

          </div>

        </div>

        <div className="absolute bottom-8 left-6 right-6 z-20">

          <p className="text-white/50 text-sm mb-2 uppercase tracking-[0.2em]">
            LIVE TONIGHT
          </p>

          <h1 className="text-6xl font-bold mb-3">
            BLACKROOM
          </h1>

          <p className="text-white/70 text-2xl">
            Bootshaus Köln
          </p>

        </div>

      </div>

      <div className="px-5 -mt-10 relative z-20">

        <div className="bg-white/[0.04] border border-white/10 rounded-[32px] backdrop-blur-2xl p-5">

          <div className="grid grid-cols-3 gap-3 mb-6">

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-4">

              <div className="flex items-center gap-2 text-white/50 text-sm mb-2">

                <Users className="w-4 h-4" />

                Crowd

              </div>

              <h3 className="text-2xl font-bold">
                1.2K
              </h3>

            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-4">

              <div className="flex items-center gap-2 text-white/50 text-sm mb-2">

                <Clock3 className="w-4 h-4" />

                Start

              </div>

              <h3 className="text-2xl font-bold">
                23:00
              </h3>

            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-4">

              <div className="flex items-center gap-2 text-white/50 text-sm mb-2">

                <Flame className="w-4 h-4" />

                Energy

              </div>

              <h3 className="text-2xl font-bold text-orange-300">
                98%
              </h3>

            </div>

          </div>

          <div className="mb-8">

            <div className="flex items-center justify-between mb-3">

              <div className="flex items-center gap-2">

                <Sparkles className="w-5 h-5 text-pink-400" />

                LIVE ENERGY

              </div>

              <span className="text-white/40 text-sm">
                steigt gerade
              </span>

            </div>

            <div className="h-4 rounded-full bg-white/10 overflow-hidden">

              <div className="h-full w-[98%] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full animate-pulse" />

            </div>

          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 mb-5">

            <p className="text-white/50 text-sm mb-4">
              FRIENDS ATTENDING
            </p>

            <div className="flex items-center">

              <div className="w-12 h-12 rounded-full bg-pink-500 border-2 border-black" />

              <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-black -ml-3" />

              <div className="w-12 h-12 rounded-full bg-purple-500 border-2 border-black -ml-3" />

              <div className="w-12 h-12 rounded-full bg-orange-500 border-2 border-black -ml-3" />

              <div className="ml-4 text-white/60">
                +24 weitere heute Abend
              </div>

            </div>

          </div>

          <div className="space-y-4 mb-8">

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">

              <p className="text-white/50 text-sm mb-2">
                DJ LINEUP
              </p>

              <h3 className="text-2xl font-bold mb-2">
                Klanglos • NOVA • VYBE
              </h3>

              <p className="text-white/50">
                Hard Techno • Industrial • Peak Time
              </p>

            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">

              <p className="text-white/50 text-sm mb-2">
                LOCATION
              </p>

              <div className="flex items-center gap-2 text-xl font-semibold">

                <MapPin className="w-5 h-5" />

                Aachener Straße 12, Köln

              </div>

            </div>

          </div>

          <div className="mb-8">

            <div className="flex items-center gap-2 mb-4">

              <Camera className="w-5 h-5 text-pink-400" />

              EVENT GALLERY

            </div>

            <div className="grid grid-cols-3 gap-3">

              <div className="h-32 rounded-3xl bg-gradient-to-br from-pink-500 to-purple-500" />

              <div className="h-32 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500" />

              <div className="h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-pink-500" />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <button className="h-16 rounded-3xl bg-white text-black font-semibold flex items-center justify-center gap-3 text-lg hover:scale-[1.02] transition-all">

              <Ticket className="w-5 h-5" />

              Tickets

            </button>

            <button className="h-16 rounded-3xl bg-white/[0.05] border border-white/10 text-white font-semibold flex items-center justify-center gap-3 text-lg hover:bg-white/10 transition-all">

              <Car className="w-5 h-5" />

              Taxi

            </button>

          </div>

          <button className="w-full h-16 rounded-3xl bg-white/[0.05] border border-white/10 text-white font-semibold flex items-center justify-center gap-3 text-lg mt-4 hover:bg-white/10 transition-all">

            <UtensilsCrossed className="w-5 h-5" />

            Essen in der Nähe

          </button>

        </div>

      </div>

    </main>
  );
}