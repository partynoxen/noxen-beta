"use client";

import BottomNav from "../components/bottom-nav";
import {
  Flame,
  MapPin,
  Music2,
  Users,
} from "lucide-react";

export default function HomeClient() {
  return (
    <div className="relative z-10 min-h-screen px-6 pb-40 pt-10 text-white">
      {/* TOP LIVE BAR */}
      <div className="mb-6 flex gap-4 overflow-x-auto rounded-full border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
        {[
          "BLACKROOM trendet gerade",
          "1.2K feiern aktuell",
          "Techno Night live",
          "Köln explodiert heute",
        ].map((item, index) => (
          <div
            key={index}
            className="flex min-w-fit items-center gap-3 rounded-full bg-white/5 px-4 py-2"
          >
            <div className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-2">
              {index === 0 && <Flame size={14} />}
              {index === 1 && <Users size={14} />}
              {index === 2 && <Music2 size={14} />}
              {index === 3 && <MapPin size={14} />}
            </div>

            <span className="text-sm text-white/80">
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,128,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,255,255,0.15),transparent_35%)]" />

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-3">
              <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
                ● LIVE NOW
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                Köln · 24 Events
              </div>
            </div>

            <div className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              🔥 HOT NIGHT
            </div>
          </div>

          <div className="mt-20 max-w-2xl">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-pink-400">
              NOXEN NIGHTLIFE
            </p>

            <h1 className="mb-6 text-7xl font-black leading-none">
              Tonight
              <br />
              Hits Different.
            </h1>

            <p className="max-w-xl text-2xl text-white/60">
              Entdecke live die besten Events, Clubs,
              Foodspots und Nächte deiner Stadt.
            </p>
          </div>
        </div>
      </div>

      {/* LIVE CHIPS */}
      <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
        {[
          "🚕 Viele buchen gerade Taxis",
          "🍔 Midnight Burger komplett voll",
          "🕺 127 Leute feiern gerade im Bootshaus",
          "⚡ ENERGY LEVEL steigt gerade",
        ].map((chip, index) => (
          <div
            key={index}
            className="min-w-fit rounded-full border border-white/10 bg-black/30 px-5 py-3 text-sm text-white/70 backdrop-blur-xl"
          >
            {chip}
          </div>
        ))}
      </div>

      {/* LIVE MAP */}
      <div className="relative mt-10 overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_60%)]" />

        <div className="relative z-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.4em] text-pink-400">
                LIVE NIGHT MAP
              </p>

              <h2 className="text-5xl font-black">
                Wo geht
                <br />
                gerade was?
              </h2>

              <p className="mt-4 text-xl text-white/50">
                Live Heatmap der aktivsten Nightlife-Spots deiner Stadt.
              </p>
            </div>

            <div className="rounded-full border border-red-500/20 bg-red-500/10 px-5 py-3 text-red-300">
              🔥 LIVE
            </div>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-[30px] border border-white/10 bg-black/30">
            {[
              {
                name: "Bootshaus",
                people: "1.2K feiern gerade",
                top: "20%",
                left: "70%",
              },
              {
                name: "Belgisches",
                people: "540 feiern gerade",
                top: "55%",
                left: "60%",
              },
              {
                name: "Zülpicher",
                people: "860 feiern gerade",
                top: "35%",
                left: "42%",
              },
            ].map((spot, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  top: spot.top,
                  left: spot.left,
                }}
              >
                <div className="mb-3 h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shadow-[0_0_40px_rgba(236,72,153,0.9)]" />

                <div className="rounded-3xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl">
                  <p className="font-semibold">
                    {spot.name}
                  </p>

                  <p className="mt-1 text-sm text-white/50">
                    {spot.people}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}