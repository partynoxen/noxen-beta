"use client";

import BottomNav from "../components/bottom-nav";

export default function HomeClient() {
  return (
    <>
      <div className="relative z-10 min-h-screen pb-40">
        <div className="px-4 pt-10">
          <div className="rounded-[40px] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-pink-400">
              NOXEN NIGHTLIFE
            </p>

            <h1 className="max-w-3xl text-7xl font-black leading-[0.9] text-white">
              Tonight
              <br />
              Hits Different.
            </h1>

            <p className="mt-8 max-w-2xl text-2xl leading-relaxed text-zinc-400">
              Entdecke live die besten Events, Clubs,
              Foodspots und Nächte deiner Stadt.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[34px] border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-violet-500/10 p-8 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-300">
                  LIVE
                </span>

                <span className="text-pink-300">98%</span>
              </div>

              <h2 className="text-4xl font-bold text-white">
                Köln
              </h2>

              <p className="mt-3 text-zinc-400">
                1.284 feiern gerade
              </p>
            </div>

            <div className="rounded-[34px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300">
                  HOT
                </span>

                <span className="text-cyan-300">87%</span>
              </div>

              <h2 className="text-4xl font-bold text-white">
                Düren
              </h2>

              <p className="mt-3 text-zinc-400">
                742 feiern gerade
              </p>
            </div>

            <div className="rounded-[34px] border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-8 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-300">
                  CHAOS
                </span>

                <span className="text-violet-300">91%</span>
              </div>

              <h2 className="text-4xl font-bold text-white">
                Saarbrücken
              </h2>

              <p className="mt-3 text-zinc-400">
                981 feiern gerade
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}