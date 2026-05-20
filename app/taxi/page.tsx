"use client";

import {
  Car,
  Clock3,
  MapPin,
  Star,
  Navigation,
  Shield,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";

const taxis = [
  {
    id: 1,
    name: "NightDrive",
    city: "Köln",
    eta: "3 min",
    rating: "4.9",
  },
  {
    id: 2,
    name: "CityCab",
    city: "Düren",
    eta: "5 min",
    rating: "4.8",
  },
  {
    id: 3,
    name: "SafeRide",
    city: "Saarbrücken",
    eta: "4 min",
    rating: "4.7",
  },
];

export default function TaxiPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden pb-32">

      <div className="absolute top-[-200px] left-[-100px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 px-5 pt-14 max-w-md mx-auto">

        <div className="mb-10">

          <p className="text-cyan-400 tracking-[0.3em] text-xs mb-3 uppercase">
            Safe Ride Home
          </p>

          <h1 className="text-5xl font-bold leading-none mb-4">
            Taxi
          </h1>

          <p className="text-white/50 text-lg">
            Finde den schnellsten Weg nach Hause.
          </p>

        </div>

        <div className="rounded-[36px] bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 p-[1px] mb-8">

          <div className="rounded-[36px] bg-black/80 backdrop-blur-2xl p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-white/50 text-sm mb-2">
                  Schnellste Fahrt
                </p>

                <h2 className="text-3xl font-bold">
                  NightDrive
                </h2>

              </div>

              <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center">

                <Car className="w-8 h-8 text-cyan-300" />

              </div>

            </div>

            <div className="flex items-center gap-5 text-white/60 mb-6">

              <div className="flex items-center gap-2">
                <Clock3 className="w-4 h-4" />

                <span>
                  3 Minuten entfernt
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />

                <span>
                  Verifiziert
                </span>
              </div>

            </div>

            <button className="w-full h-16 rounded-3xl bg-white text-black font-semibold text-lg hover:scale-[1.01] transition-all">
              Fahrt buchen
            </button>

          </div>

        </div>

        <div className="space-y-5">

          {taxis.map((taxi) => (
            <div
              key={taxi.id}
              className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 hover:bg-white/[0.06] transition-all"
            >

              <div className="flex items-start justify-between mb-5">

                <div>

                  <h3 className="text-3xl font-bold mb-2">
                    {taxi.name}
                  </h3>

                  <p className="text-white/50 text-lg">
                    Premium Ride
                  </p>

                </div>

                <div className="bg-green-500/20 border border-green-500/20 rounded-full px-4 py-2 text-green-300 text-sm">
                  ONLINE
                </div>

              </div>

              <div className="flex items-center gap-5 text-white/60 mb-6">

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />

                  <span>
                    {taxi.city}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />

                  <span>
                    {taxi.rating}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 className="w-4 h-4" />

                  <span>
                    {taxi.eta}
                  </span>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <button className="h-16 rounded-3xl bg-white text-black font-semibold hover:scale-[1.01] transition-all">
                  Jetzt buchen
                </button>

                <button className="h-16 rounded-3xl bg-white/[0.05] border border-white/10 flex items-center justify-center gap-3 hover:bg-white/[0.08] transition-all">

                  Navigation

                  <Navigation className="w-5 h-5" />

                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      <BottomNav />

    </main>
  );
}