"use client";

import {
  Flame,
  Clock3,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";

const foodSpots = [
  {
    id: 1,
    name: "Midnight Burger",
    city: "Köln",
    type: "Burger",
    rating: "4.9",
    open: true,
  },
  {
    id: 2,
    name: "Pizza Central",
    city: "Düren",
    type: "Pizza",
    rating: "4.7",
    open: true,
  },
  {
    id: 3,
    name: "Kebab Factory",
    city: "Saarbrücken",
    type: "Döner",
    rating: "4.8",
    open: true,
  },
];

export default function FoodPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden pb-32">

      <div className="absolute top-[-200px] left-[-100px] w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[300px] h-[300px] bg-red-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 px-5 pt-14 max-w-md mx-auto">

        <div className="mb-10">

          <p className="text-orange-400 tracking-[0.3em] text-xs mb-3 uppercase">
            Late Night Food
          </p>

          <h1 className="text-5xl font-bold leading-none mb-4">
            Food
          </h1>

          <p className="text-white/50 text-lg">
            Entdecke die besten Foodspots nach der Party.
          </p>

        </div>

        <div className="rounded-[36px] bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-[1px] mb-8">

          <div className="rounded-[36px] bg-black/80 backdrop-blur-2xl p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-white/50 text-sm mb-2">
                  Trending Spot
                </p>

                <h2 className="text-3xl font-bold">
                  Midnight Burger
                </h2>

              </div>

              <div className="w-16 h-16 rounded-3xl bg-orange-500/20 border border-orange-500/20 flex items-center justify-center">

                <Flame className="w-8 h-8 text-orange-300" />

              </div>

            </div>

            <div className="flex items-center gap-5 text-white/60 mb-6">

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />

                <span>
                  Köln
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="w-4 h-4" />

                <span>
                  Jetzt geöffnet
                </span>
              </div>

            </div>

            <button className="w-full h-16 rounded-3xl bg-white text-black font-semibold text-lg hover:scale-[1.01] transition-all">
              Spot öffnen
            </button>

          </div>

        </div>

        <div className="space-y-5">

          {foodSpots.map((spot) => (
            <div
              key={spot.id}
              className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 hover:bg-white/[0.06] transition-all"
            >

              <div className="flex items-start justify-between mb-5">

                <div>

                  <h3 className="text-3xl font-bold mb-2">
                    {spot.name}
                  </h3>

                  <p className="text-white/50 text-lg">
                    {spot.type}
                  </p>

                </div>

                <div className="bg-green-500/20 border border-green-500/20 rounded-full px-4 py-2 text-green-300 text-sm">
                  OPEN
                </div>

              </div>

              <div className="flex items-center gap-5 text-white/60 mb-6">

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />

                  <span>
                    {spot.city}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />

                  <span>
                    {spot.rating}
                  </span>
                </div>

              </div>

              <button className="w-full h-16 rounded-3xl bg-white/[0.05] border border-white/10 flex items-center justify-center gap-3 hover:bg-white/[0.08] transition-all">

                Spot öffnen

                <ChevronRight className="w-5 h-5" />

              </button>

            </div>
          ))}

        </div>

      </div>

      <BottomNav />

    </main>
  );
}