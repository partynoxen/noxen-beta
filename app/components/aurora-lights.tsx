"use client";

import { motion } from "framer-motion";

export default function AuroraLights() {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-[-200px] top-[-200px] z-0 h-[700px] w-[700px] rounded-full bg-fuchsia-500/20 blur-[140px]"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none fixed bottom-[-250px] right-[-200px] z-0 h-[800px] w-[800px] rounded-full bg-cyan-500/20 blur-[160px]"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, -80, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none fixed left-[30%] top-[40%] z-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}