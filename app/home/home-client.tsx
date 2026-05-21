"use client";

import BottomNav from "../components/bottom-nav";

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="px-8 pt-20">
        <h1 className="text-7xl font-black">
          NOXEN
        </h1>

        <p className="mt-6 text-2xl text-zinc-400">
          Cinematic nightlife experience.
        </p>
      </div>

      <BottomNav />
    </main>
  );
}