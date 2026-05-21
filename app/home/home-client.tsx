"use client";

import CinematicBackground from "../components/cinematic-background";
import CinematicParticles from "../components/cinematic-particles";
import AuroraLights from "../components/aurora-lights";

export default function HomeClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND */}
      <CinematicBackground />
      <AuroraLights />
      <CinematicParticles />

      {/* CONTENT */}
      <div className="relative z-10 px-5 pt-24">

        {/* TOP BAR */}
        <div className="mb-8 overflow-hidden rounded-full border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex gap-8 whitespace-nowrap px-6 py-5 text-sm text-zinc-300">

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-fuchsia-500 shadow-[0_0_20px_#d946ef]" />
              Köln explodiert heute
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_20px_#9333ea]" />
              BLACKROOM trendet gerade
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-pink-500 shadow-[0_0_20px_#ec4899]" />
              1.2K feiern aktuell
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-violet-500 shadow-[0_0_20px_#8b5cf6]" />
              Techno Night live
            </div>

          </div>
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 via-transparent to-cyan-500/20" />

          <div className="relative z-10 max-w-3xl">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-sm text-green-300">
                ● LIVE NOW
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300">
                Köln · 24 Events
              </div>

            </div>

            <p className="mb-4 text-sm uppercase tracking-[0.5em] text-fuchsia-300">
              NOXEN NIGHTLIFE
            </p>

            <h1 className="mb-8 text-7xl font-black leading-[0.9] tracking-tight">
              Tonight
              <br />
              Hits Different.
            </h1>

            <p className="max-w-2xl text-2xl leading-relaxed text-zinc-400">
              Entdecke live die besten Events, Clubs, Foodspots
              und Nächte deiner Stadt.
            </p>

          </div>

          <div className="absolute right-10 top-10 rounded-full border border-red-500/20 bg-red-500/10 px-6 py-3 text-red-300 backdrop-blur-xl">
            🔥 HOT NIGHT
          </div>

        </section>

        {/* LIVE CHIPS */}
        <div className="mt-8 flex flex-wrap gap-4">

          {[
            "🚕 Viele buchen gerade Taxis",
            "🍔 Midnight Burger komplett voll",
            "🕺 127 Leute feiern gerade im Bootshaus",
            "⚡ ENERGY LEVEL steigt gerade",
            "🎟️ Tickets fast ausverkauft",
          ].map((item) => (
            <div
              key={item}
              className="rounded-full border border-white/10 bg-black/40 px-6 py-4 text-sm text-zinc-300 backdrop-blur-xl"
            >
              {item}
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}