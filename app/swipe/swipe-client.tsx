"use client";

import { useState } from "react";

import {
  Heart,
  X,
  Flame,
  MapPin,
  Music4,
  Users,
  ChevronRight,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";

const events = [
  {
    id: 1,
    title: "BLACKROOM",
    club: "Bootshaus",
    city: "Köln",
    genre: "Techno",
    crowd: "1.2K",
    energy: "98%",
  },
  {
    id: 2,
    title: "NEON RAVE",
    club: "Club Z",
    city: "Düren",
    genre: "EDM",
    crowd: "740",
    energy: "87%",
  },
  {
    id: 3,
    title: "STUDENT NIGHT",
    club: "Campus Club",
    city: "Saarbrücken",
    genre: "Mixed",
    crowd: "980",
    energy: "91%",
  },
];

export default function SwipeClient() {
  const [index, setIndex] = useState(0);

  const current = events[index];

  const nextCard = () => {
    if (index < events.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(events.length);
    }
  };

  if (!current) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-5">

        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 blur-3xl absolute" />

        <div className="relative z-10 text-center">

          <h1 className="text-5xl font-bold mb-4">
            Keine Events mehr
          </h1>

          <p className="text-white/50 text-lg mb-8">
            Neue Events kommen bald.
          </p>

          <button
            onClick={() => setIndex(0)}
            className="h-16 px-8 rounded-3xl bg-white text-black font-semibold text-lg"
          >
            Neu starten
          </button>

        </div>

        <BottomNav />

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden pb-32">

      <div className="fixed inset-0 bg-black" />

      <div className="fixed top-[-200px] left-[-100px] w-[350px] h-[350px] bg-pink-500/20 rounded-full blur-[140px]" />

      <div className="fixed bottom-[-200px] right-[-100px] w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[140px]" />

      <div className="relative z-10 px-5 pt-14">

        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-pink-400 tracking-[0.3em] text-xs mb-3 uppercase">
              Swipe Events
            </p>

            <h1 className="text-5xl font-bold">
              Discover
            </h1>

          </div>

          <div className="bg-red-500/20 border border-red-500/20 rounded-full px-5 py-3 text-red-300 flex items-center gap-2 backdrop-blur-xl">

            <Flame className="w-4 h-4" />

            LIVE

          </div>

        </div>

        <div className="mb-6">

          <div className="flex items-center justify-between mb-3">

            <p className="text-white/50 text-sm">
              Event Progress
            </p>

            <p className="text-white/50 text-sm">
              {index + 1} / {events.length}
            </p>

          </div>

          <div className="h-3 rounded-full bg-white/10 overflow-hidden">

            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-500"
              style={{
                width: `${
                  ((index + 1) / events.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

        <div className="relative h-[620px]">

          <div className="absolute inset-0 scale-95 opacity-40 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-xl" />

          <div className="absolute inset-0 translate-y-3 scale-[0.98] opacity-60 rounded-[40px] bg-white/[0.04] border border-white/10 backdrop-blur-xl" />

          <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-2xl">

            <div className="h-72 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 relative overflow-hidden">

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute top-5 left-5 flex items-center gap-3">

                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 text-sm text-white">

                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                  LIVE NOW

                </div>

                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-sm">

                  {current.genre}

                </div>

              </div>

              <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-xl rounded-full px-4 py-2 text-orange-300 text-sm border border-orange-500/20">

                {current.energy}

              </div>

              <div className="absolute bottom-6 left-6">

                <p className="text-white/50 text-sm mb-1">
                  Tonight's vibe
                </p>

                <h2 className="text-5xl font-bold">
                  Peak Energy
                </h2>

              </div>

            </div>

            <div className="p-6">

              <h2 className="text-5xl font-bold mb-2">
                {current.title}
              </h2>

              <p className="text-white/50 text-2xl mb-6">
                {current.club}
              </p>

              <div className="flex items-center gap-5 text-white/60 mb-6">

                <div className="flex items-center gap-2">

                  <MapPin className="w-4 h-4" />

                  {current.city}

                </div>

                <div className="flex items-center gap-2">

                  <Music4 className="w-4 h-4" />

                  {current.genre}

                </div>

              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 mb-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-white/50 text-sm mb-2">
                      LIVE CROWD
                    </p>

                    <h3 className="text-4xl font-bold">
                      {current.crowd}
                    </h3>

                  </div>

                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-pink-500/30">

                    <Users className="w-8 h-8" />

                  </div>

                </div>

              </div>

              <button className="w-full h-16 rounded-3xl bg-white text-black font-semibold text-lg flex items-center justify-center gap-3 mb-4 hover:scale-[1.01] transition-all">

                Event öffnen

                <ChevronRight className="w-5 h-5" />

              </button>

              <div className="grid grid-cols-2 gap-4">

                <button
                  onClick={nextCard}
                  className="h-16 rounded-3xl bg-red-500/20 border border-red-500/20 text-red-300 font-semibold flex items-center justify-center gap-3 hover:bg-red-500/30 transition-all"
                >

                  <X className="w-5 h-5" />

                  Skip

                </button>

                <button
                  onClick={nextCard}
                  className="h-16 rounded-3xl bg-green-500/20 border border-green-500/20 text-green-300 font-semibold flex items-center justify-center gap-3 hover:bg-green-500/30 transition-all"
                >

                  <Heart className="w-5 h-5" />

                  Like

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      <BottomNav />

    </main>
  );
}