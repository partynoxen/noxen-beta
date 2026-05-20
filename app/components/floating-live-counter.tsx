"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Users,
} from "lucide-react";

export default function FloatingLiveCounter() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.5,
      }}
      className="fixed bottom-28 left-1/2 z-[60] w-[92%] max-w-sm -translate-x-1/2"
    >
      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black/40 p-4 backdrop-blur-3xl">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10" />

        {/* Pulse Border */}
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-[30px] border border-purple-500/20"
        />

        <div className="relative z-10 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl shadow-pink-500/30"
            >
              <Users size={22} />
            </motion.div>

            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-purple-300">
                LIVE USERS
              </p>

              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black">
                  248
                </h3>

                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="h-2 w-2 rounded-full bg-green-400"
                />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="text-right">
            <div className="mb-1 flex items-center justify-end gap-1">
              <Flame
                size={15}
                className="text-orange-400"
              />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
                Activity
              </p>
            </div>

            <p className="text-lg font-black">
              EXTREME
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}