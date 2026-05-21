"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 35 });

export default function CinematicParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((_, index) => {
        const size = Math.random() * 6 + 2;

        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/30"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}