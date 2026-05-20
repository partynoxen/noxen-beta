"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function BetaBanner() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mb-6 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 p-[1px]"
    >
      <div className="rounded-3xl bg-black/60 p-4 backdrop-blur-2xl">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
            <ShieldCheck size={20} />
          </div>

          <div className="flex-1">
            <p className="mb-1 text-sm font-black uppercase tracking-[0.2em] text-purple-300">
              NOXEN BETA
            </p>

            <p className="text-sm leading-relaxed text-white/70">
              Diese Version ist exklusiv für Tester.
              Events, Clubs und Inhalte dienen aktuell
              nur zur Demonstration der Plattform.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}