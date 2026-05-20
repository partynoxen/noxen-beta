'use client';

import { motion } from 'framer-motion';

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">

      {/* ORB 1 */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-[-140px] top-[-140px] h-[420px] w-[420px] rounded-full bg-pink-500/20 blur-[140px]"
      />

      {/* ORB 2 */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-180px] right-[-100px] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[160px]"
      />

      {/* ORB 3 */}
      <motion.div
        animate={{
          y: [0, -80, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[120px]"
      />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

    </div>
  );
}