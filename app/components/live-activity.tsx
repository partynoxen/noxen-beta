"use client";

import { motion } from "framer-motion";

const activities = [
  "🔥 24 Leute speichern gerade BLACKROOM",
  "🎧 TECHNO NIGHT trendet in Köln",
  "🚕 Viele buchen gerade Taxis",
  "🍔 Midnight Burger komplett voll",
  "💃 127 Leute feiern gerade im Bootshaus",
  "⚡ ENERGY LEVEL steigt gerade",
  "🎟️ Tickets fast ausverkauft",
  "🍻 Studenten Night explodiert gerade",
];

export default function LiveActivity() {
  return (
    <div className="overflow-hidden mb-6">

      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "linear",
        }}
        className="flex gap-4 whitespace-nowrap"
      >
        {[...activities, ...activities].map(
          (activity, index) => (
            <div
              key={index}
              className="px-5 py-3 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl text-white/80 text-sm"
            >
              {activity}
            </div>
          )
        )}
      </motion.div>

    </div>
  );
}