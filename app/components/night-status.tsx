"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";

const statuses = [
  {
    icon: Flame,
    title: "Köln eskaliert gerade",
    sub: "+28% mehr Aktivität",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "248 Leute unterwegs",
    sub: "Live auf NOXEN",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Bootshaus trendet",
    sub: "Heat steigt schnell",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    title: "Neue Hotspots entdeckt",
    sub: "Saarbrücken nightlife",
    color: "from-pink-500 to-purple-500",
  },
];

export default function NightStatus() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statuses.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const current = statuses[index];
  const Icon = current.icon;

  return (
    <div className="fixed left-1/2 top-5 z-[70] w-[92%] max-w-md -translate-x-1/2">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/40 p-4 backdrop-blur-3xl">
        {/* Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${current.color} opacity-10`}
        />

        {/* Animated Border */}
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-[28px] border border-white/10"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.35,
            }}
            className="relative z-10 flex items-center gap-4"
          >
            {/* Icon */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${current.color}`}
            >
              <Icon size={22} />
            </motion.div>

            {/* Text */}
            <div className="flex-1">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                LIVE NIGHT STATUS
              </p>

              <h3 className="text-sm font-bold">
                {current.title}
              </h3>

              <p className="text-xs text-white/50">
                {current.sub}
              </p>
            </div>

            {/* Live Dot */}
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-green-400" />

              <motion.div
                animate={{
                  scale: [1, 2.2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-green-400"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}