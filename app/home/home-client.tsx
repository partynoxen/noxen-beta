"use client";

import { motion } from "framer-motion";
import {
  Flame,
  MapPin,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";

const trendingEvents = [
  {
    title: "Techno Warehouse",
    city: "Köln",
    crowd: "2.4K live",
    heat: "98%",
  },
  {
    title: "Rooftop Session",
    city: "Düren",
    crowd: "740 live",
    heat: "87%",
  },
  {
    title: "Neon Dreams",
    city: "Saarbrücken",
    crowd: "1.1K live",
    heat: "91%",
  },
];

export default function HomeClient() {
  return (
    <div className="relative min-h-screen overflow-hidden px-5 pb-32 pt-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 text-xs font-semibold text-fuchsia-300 backdrop-blur-xl">
          <Sparkles size={14} />
          LIVE NIGHTLIFE EXPERIENCE
        </div>

        <h1 className="max-w-[320px] text-5xl font-black leading-none tracking-tight">
          Discover the
          <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            Night.
          </span>
        </h1>

        <p className="mt-5 max-w-[330px] text-sm leading-relaxed text-zinc-400">
          Finde live heraus, wo heute wirklich etwas geht.
          Events, Heat Scores, Crowd Vibes und spontane Nächte.
        </p>
      </motion.div>

      {/* Live Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            LIVE IN
          </p>

          <div className="mt-2 flex items-center gap-2 text-2xl font-bold">
            <MapPin className="text-fuchsia-400" size={22} />
            Köln
          </div>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-2xl shadow-fuchsia-500/30"
        >
          <Users />
        </motion.div>
      </motion.div>

      {/* Trending */}
      <div className="relative z-10 mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Tonight</h2>

          <button className="text-sm text-fuchsia-300">
            Alle ansehen
          </button>
        </div>

        <div className="space-y-4">
          {trendingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">
                    {event.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                    <MapPin size={14} />
                    {event.city}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
                      <Users size={12} />
                      {event.crowd}
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-fuchsia-500/20 px-3 py-1 text-xs text-fuchsia-300">
                      <Flame size={12} />
                      Heat {event.heat}
                    </div>
                  </div>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500">
                  <ArrowRight />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}