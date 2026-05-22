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
      <div className="relative z-10 px-6 pt-24 pb-32">

        {/* TOP LIVE BAR */}
        <div className="mb-8 overflow-hidden rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl">

          <div className="flex gap-10 whitespace-nowrap px-8 py-5 text-sm text-zinc-300">

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-fuchsia-500 shadow-[0_0_20px_#d946ef]" />
              Köln explodiert heute
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_20px_#9333ea]" />
              BLACKROOM trendet gerade
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-pink-500 shadow-[0_0_20px_#ec4899]" />
              1.2K feiern aktuell
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-violet-500 shadow-[0_0_20px_#8b5cf6]" />
              Techno Night live
            </div>

          </div>

        </div>

        {/* HERO */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT SIDE */}
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-12 backdrop-blur-2xl">

            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 via-transparent to-cyan-500/20" />

            <div className="relative z-10">

              {/* BADGES */}
              <div className="mb-8 flex items-center gap-4">

                <div className="rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-sm text-green-300">
                  ● LIVE NOW
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300">
                  Köln · 24 Events
                </div>

              </div>

              {/* LABEL */}
              <p className="mb-5 text-sm uppercase tracking-[0.5em] text-fuchsia-300">
                NOXEN NIGHTLIFE
              </p>

              {/* HEADLINE */}
              <h1 className="mb-8 text-8xl font-black leading-[0.9] tracking-tight">

                Tonight
                <br />
                Hits Different.

              </h1>

              {/* SUBTEXT */}
              <p className="max-w-2xl text-2xl leading-relaxed text-zinc-400">

                Entdecke live die besten Events,
                Clubs, Foodspots und Nächte
                deiner Stadt.

              </p>

              {/* BUTTONS */}
              <div className="mt-12 flex gap-5">

                <button className="rounded-2xl bg-white px-8 py-5 text-lg font-bold text-black transition hover:scale-105">

                  Jetzt entdecken

                </button>

                <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">

                  Live Map

                </button>

              </div>

            </div>

          </div>

          {/* RIGHT EVENT CARD */}
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-2xl">

            {/* IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1571266028243-d220c9c3b3f4?q=80&w=1600&auto=format&fit=crop"
              className="h-full w-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* LIVE BADGE */}
            <div className="absolute left-6 top-6 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-sm text-green-300 backdrop-blur-xl">

              ● LIVE EVENT

            </div>

            {/* HEAT */}
            <div className="absolute right-6 top-6 rounded-full bg-fuchsia-500/20 px-5 py-3 text-sm font-bold text-fuchsia-200 backdrop-blur-xl">

              98% HEAT

            </div>

            {/* CONTENT */}
            <div className="absolute bottom-0 left-0 right-0 p-8">

              <div className="mb-3 text-sm uppercase tracking-[0.4em] text-fuchsia-300">
                TRENDING NOW
              </div>

              <h2 className="mb-4 text-6xl font-black">
                BLACKROOM
              </h2>

              <p className="mb-8 text-xl text-zinc-300">
                Bootshaus Köln · Techno · 23:00
              </p>

              <button className="rounded-2xl bg-white px-8 py-5 text-lg font-bold text-black transition hover:scale-105">

                Event ansehen

              </button>

            </div>

          </div>

        </section>

        {/* LIVE STATUS CHIPS */}
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