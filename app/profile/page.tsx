"use client";

import {
  Crown,
  Heart,
  Bookmark,
  Flame,
  MapPin,
  Settings,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden pb-32">

      <div className="absolute top-[-200px] left-[-100px] w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 px-5 pt-14 max-w-md mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>
            <p className="text-white/40 uppercase tracking-[0.3em] text-xs mb-2">
              Profil
            </p>

            <h1 className="text-5xl font-bold">
              Ben Jolas
            </h1>
          </div>

          <button className="w-14 h-14 rounded-3xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </button>

        </div>

        <div className="rounded-[40px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl mb-6">

          <div className="flex items-center gap-5">

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold shadow-2xl shadow-pink-500/30">
              B
            </div>

            <div>

              <div className="flex items-center gap-2 mb-2">

                <h2 className="text-2xl font-bold">
                  @ben.jolas
                </h2>

                <BadgeCheck className="w-5 h-5 text-blue-400" />

              </div>

              <p className="text-white/50 mb-4">
                NOXEN Beta Tester
              </p>

              <div className="flex items-center gap-3">

                <div className="bg-pink-500/20 border border-pink-500/20 rounded-full px-4 py-2 text-pink-300 text-sm">
                  Nightlife Lover
                </div>

                <div className="bg-orange-500/20 border border-orange-500/20 rounded-full px-4 py-2 text-orange-300 text-sm">
                  VIP
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <BottomNav />

    </main>
  );
}