"use client";

import { motion } from "framer-motion";

export default function CinematicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* BASE */}
      <div className="absolute inset-0 bg-black" />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.08]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* PURPLE AMBIENT */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-40
          top-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-fuchsia-500/20
          blur-[140px]
        "
      />

      {/* BLUE AMBIENT */}
      <motion.div
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-0
          right-0
          h-[700px]
          w-[700px]
          rounded-full
          bg-cyan-500/20
          blur-[160px]
        "
      />

      {/* CENTER GLOW */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/10
          blur-[120px]
        "
      />

      {/* PARTICLES */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -120],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i % 4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          className="
            absolute
            h-1
            w-1
            rounded-full
            bg-white/40
          "
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-20px",
          }}
        />
      ))}

      {/* NOISE */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
    </div>
  );
}