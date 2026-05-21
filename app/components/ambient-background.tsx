"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Hintergrund */}
      <div className="absolute inset-0 bg-[#050510]" />

      {/* Glow oben */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 left-[-120px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/30 blur-3xl"
      />

      {/* Glow rechts */}
      <motion.div
        animate={{
          x: [0, -60, 30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-140px] top-[20%] h-[380px] w-[380px] rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* Glow unten */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-200px] left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
    </div>
  );
}