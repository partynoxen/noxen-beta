'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_40%)]" />

      <div className="absolute bottom-[-250px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[160px]" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.06]">
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glow Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute h-[260px] w-[260px] rounded-full bg-purple-500/20 blur-[80px]" />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute h-[240px] w-[240px] rounded-full border border-purple-500/30 border-t-purple-400"
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="relative z-10"
          >
            <Image
              src="/noxen-logo.png"
              alt="NOXEN"
              width={180}
              height={180}
              priority
              className="drop-shadow-[0_0_35px_rgba(168,85,247,0.9)]"
            />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-10 text-center"
        >
          <h1 className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-3xl font-black tracking-[0.35em] text-transparent">
            NOXEN
          </h1>

          <p className="mt-3 text-sm tracking-[0.45em] text-white/40">
            NIGHTLIFE REINVENTED
          </p>
        </motion.div>

        {/* Loader */}
        <div className="mt-12 h-[6px] w-[220px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-full w-[40%] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_0_25px_rgba(168,85,247,0.9)]"
          />
        </div>

        {/* Bottom Text */}
        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-6 text-xs uppercase tracking-[0.4em] text-white/30"
        >
          Beta Experience Loading
        </motion.p>
      </div>
    </main>
  );
}