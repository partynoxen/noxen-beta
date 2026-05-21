"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  MapPin,
  Sparkles,
  Users,
  Music2,
} from "lucide-react";

const events = [
  {
    title: "Techno Warehouse",
    city: "Köln",
    crowd: "2.4K LIVE",
    heat: "98%",
    image:
      "https://images.unsplash.com/photo-1571266028243-d220c9f1c8b8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Neon Dreams",
    city: "Saarbrücken",
    crowd: "1.1K LIVE",
    heat: "91%",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Rooftop Session",
    city: "Düren",
    crowd: "740 LIVE",
    heat: "87%",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function HomeClient() {
  return (
    <div className="relative z-10 min-h-screen overflow-hidden px-5 pb-40 pt-8 text-white">
      {/* FLOATING BLUR ORBS */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, 60, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute left-[-120px] top-[120px] h-[260px] w-[260px] rounded-full bg-fuchsia-500/30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
        className="absolute right-[-120px] top-[260px] h-[240px] w-[240px] rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
              NOXEN LIVE
            </p>

            <h1 className="mt-2 text-5xl font-black leading-none tracking-tight">
              Discover
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                the night.
              </span>
            </h1>
          </div>

          <motion.div
            animate={{
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl"
          >
            <Music2 size={30} />
          </motion.div>
        </div>

        <p className="max-w-[340px] text-sm leading-relaxed text-zinc-400">
          Finde spontane Nächte, Live-Crowds und die heißesten Events
          in deiner Stadt.
        </p>
      </motion.div>

      {/* LIVE STATUS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.2,
        }}
        className="relative mt-8 overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-fuchsia-500/20 px-3 py-1 text-xs font-semibold text-fuchsia-300">
              <Sparkles size={12} />
              LIVE NOW
            </div>

            <div className="flex items-center gap-2 text-3xl font-black">
              <MapPin className="text-fuchsia-400" size={24} />
              Köln
            </div>

            <p className="mt-2 text-sm text-zinc-400">
              24 aktive Events heute Nacht
            </p>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-[0_0_60px_rgba(217,70,239,0.6)]"
          >
            <Users size={34} />
          </motion.div>
        </div>
      </motion.div>

      {/* TRENDING */}
      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black">
            Trending Tonight
          </h2>

          <button className="text-sm text-fuchsia-300">
            Mehr
          </button>
        </div>

        <div className="space-y-5">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{
                opacity: 0,
                y: 80,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.15,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-3xl"
            >
              {/* IMAGE */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold backdrop-blur-xl">
                  <Users size={12} />
                  {event.crowd}
                </div>

                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-fuchsia-500/30 px-3 py-1 text-xs font-semibold text-fuchsia-200 backdrop-blur-xl">
                  <Flame size={12} />
                  Heat {event.heat}
                </div>

                <div className="absolute bottom-5 left-5">
                  <h3 className="text-3xl font-black">
                    {event.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
                    <MapPin size={14} />
                    {event.city}
                  </div>
                </div>

                <motion.div
                  whileHover={{
                    scale: 1.1,
                  }}
                  className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-[0_0_40px_rgba(217,70,239,0.5)]"
                >
                  <ArrowRight />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}