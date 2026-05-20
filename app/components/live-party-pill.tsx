"use client";

import { motion } from "framer-motion";

export default function LivePartyPill() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 0.8,
      }}
      className="fixed right-5 top-32 z-[70]"
    >
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="relative overflow-hidden rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-3xl"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10" />

        <div className="relative z-10 flex items-center gap-3">
          {/* Live Dot */}
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-green-400" />

            <motion.div
              animate={{
                scale: [1, 2.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full bg-green-400"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Live
            </p>

            <h3 className="text-sm font-black">
              37 Parties active
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}