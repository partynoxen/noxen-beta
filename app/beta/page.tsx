'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BetaPage() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const access = localStorage.getItem('noxen_beta_access');

    if (access === 'granted') {
      router.push('/home');
    }
  }, [router]);

  const handleLogin = () => {
    if (password === 'Test2026!') {
      localStorage.setItem('noxen_beta_access', 'granted');

      router.push('/onboarding');
    } else {
      setError('Falscher Beta Code');
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      {/* Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_40%)]" />

      <div className="absolute bottom-[-300px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[180px]" />

      {/* Grid */}
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

      {/* Floating Glow */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute left-10 top-10 h-52 w-52 rounded-full bg-pink-500/20 blur-[120px]"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md rounded-[38px] border border-white/10 bg-white/5 p-8 shadow-[0_0_80px_rgba(168,85,247,0.18)] backdrop-blur-3xl"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Image
              src="/noxen-logo.png"
              alt="NOXEN"
              width={130}
              height={130}
              priority
              className="drop-shadow-[0_0_40px_rgba(168,85,247,0.9)]"
            />
          </motion.div>
        </div>

        {/* Title */}
        <div className="mt-8 text-center">
          <div className="inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-purple-300">
            Closed Beta
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight text-white">
            Willkommen bei NOXEN
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/50">
            Die nächste Generation von Nightlife beginnt hier.
          </p>
        </div>

        {/* Input */}
        <div className="mt-10">
          <input
            type="password"
            placeholder="Beta Zugangscode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-5 text-white outline-none transition-all placeholder:text-white/30 focus:border-purple-500"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          className="mt-6 h-14 w-full rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-sm font-black uppercase tracking-[0.25em] text-white shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all hover:scale-[1.02]"
        >
          Beta betreten
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-xs uppercase tracking-[0.35em] text-white/20">
          NOXEN NIGHTLIFE
        </p>
      </motion.div>
    </main>
  );
}