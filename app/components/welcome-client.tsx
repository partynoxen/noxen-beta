'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, MapPin, Music2, Flame } from 'lucide-react';

export default function WelcomeClient() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pb-20 bg-[#050509]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[18%] -left-32 w-96 h-96 bg-purple-600/25 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[18%] -right-32 w-96 h-96 bg-pink-600/25 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/2 left-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <motion.div
          className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/55 backdrop-blur-xl"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Flame size={14} className="text-pink-300" />
          Nightlife Discovery App
        </motion.div>

        <motion.h1
          className="mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-7xl font-black tracking-tighter text-transparent sm:text-8xl"
          initial={{ scale: 0.72, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 190, damping: 15, delay: 0.2 }}
        >
          VYBE
        </motion.h1>

        <motion.p
          className="mx-auto mb-8 max-w-sm text-lg font-medium leading-relaxed text-white/62 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Finde die <span className="font-bold text-purple-300">Party</span>, bevor die Party dich findet.
        </motion.p>

        <motion.div
          className="mb-7 grid grid-cols-3 gap-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl">
            <MapPin className="mx-auto mb-1 text-purple-300" size={18} />
            <p className="text-[11px] font-semibold text-white/45">Städte</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl">
            <Music2 className="mx-auto mb-1 text-pink-300" size={18} />
            <p className="text-[11px] font-semibold text-white/45">Genres</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl">
            <Flame className="mx-auto mb-1 text-blue-300" size={18} />
            <p className="text-[11px] font-semibold text-white/45">Hot Events</p>
          </div>
        </motion.div>

        <motion.div
          className="flex w-full flex-col gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => router.push('/swipe')}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-4 text-lg font-bold text-white shadow-[0_0_35px_rgba(168,85,247,0.35)] transition-all hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 active:scale-[0.98]"
          >
            <Zap size={22} className="transition-transform group-hover:rotate-12" />
            Los geht’s – Swipen
          </button>

          <button
            onClick={() => router.push('/trending')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] py-3.5 font-semibold text-white/72 backdrop-blur-xl transition-all hover:bg-white/10 active:scale-[0.98]"
          >
            <TrendingUp size={20} />
            Trending entdecken
          </button>
        </motion.div>

        <motion.p
          className="mt-7 text-xs text-white/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
        >
          Köln · Düsseldorf · Berlin · Bonn · Aachen
        </motion.p>
      </motion.section>
    </main>
  );
}
