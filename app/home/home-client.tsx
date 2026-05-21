"use client";

import CinematicBackground from "../components/cinematic-background";
import LiveEnergyOrbs from "../components/live-energy-orbs";

export default function HomeClient() {
  return (
    <>
      <CinematicBackground />
      <LiveEnergyOrbs />

      <div className="relative z-10">
        {/* TOP FEED */}
        <div className="px-6 pt-8">
          <div className="flex gap-4 overflow-x-auto rounded-full border border-white/10 bg-black/40 px-6 py-5 backdrop-blur-xl">
            {[
              "Köln explodiert heute",
              "BLACKROOM trendet gerade",
              "1.2K feiern aktuell",
              "Techno Night live",
            ].map((item, i) => (
              <div
                key={i}
                className="flex min-w-fit items-center gap-3 text-white/80"
              >
                <div className="h-3 w-3 rounded-full bg-fuchsia-500 shadow-[0_0_20px_#d946ef]" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* HERO */}
        <section className="relative mx-6 mt-8 overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-3">
                <div className="rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-sm text-green-300">
                  ● LIVE NOW
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70">
                  Köln · 24 Events
                </div>
              </div>

              <div className="rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm text-red-300">
                🔥 HOT NIGHT
              </div>
            </div>

            <div className="max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-fuchsia-300">
                NOXEN NIGHTLIFE
              </p>

              <h1 className="text-7xl font-black leading-none tracking-tight text-white">
                Tonight
                <br />
                Hits Different.
              </h1>

              <p className="mt-8 max-w-2xl text-2xl leading-relaxed text-white/60">
                Entdecke live die besten Events, Clubs, Foodspots und Nächte
                deiner Stadt.
              </p>
            </div>
          </div>
        </section>

        {/* LIVE TICKER */}
        <div className="mt-8 flex gap-4 overflow-x-auto px-6 pb-4">
          {[
            "🚕 Viele buchen gerade Taxis",
            "🍔 Midnight Burger komplett voll",
            "🕺 127 Leute feiern gerade im Bootshaus",
            "⚡ ENERGY LEVEL steigt gerade",
            "🎟️ Tickets fast ausverkauft",
          ].map((item, i) => (
            <div
              key={i}
              className="min-w-fit rounded-full border border-white/10 bg-black/40 px-5 py-4 text-white/70 backdrop-blur-xl"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}