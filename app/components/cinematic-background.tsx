"use client";

import { motion } from "framer-motion";

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      
      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* LEFT GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute left-[-10%] top-[10%] h-[600px] w-[600px] rounded-full bg-fuchsia-700 blur-[180px]"
      />

      {/* RIGHT BLUE GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute right-[-10%] top-[20%] h-[700px] w-[700px] rounded-full bg-cyan-600 blur-[220px]"
      />

      {/* CENTER GLOW */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 blur-[180px]"
      />

      {/* PARTICLES */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i % 5,
            repeat: Infinity,
          }}
          className="absolute h-[2px] w-[2px] rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* NOISE */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
    </div>
  );
}