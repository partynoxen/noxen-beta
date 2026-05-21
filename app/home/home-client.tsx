"use client";

import CinematicBackground from "../components/cinematic-background";

export default function HomeClient() {
  return (
    <>
      <CinematicBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-8xl font-black tracking-tight">
            NOXEN
          </h1>

          <p className="mt-6 text-zinc-400 text-xl">
            Nightlife reimagined.
          </p>
        </div>
      </div>
    </>
  );
}