'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
  {
    title: 'Entdecke Nächte live.',
    text: 'Sieh in Echtzeit, wo gerade wirklich etwas geht.',
    badge: 'LIVE ENERGY',
  },
  {
    title: 'Plane mit Freunden.',
    text: 'Events, Foodspots und Taxis direkt in einer App.',
    badge: 'SOCIAL NIGHTLIFE',
  },
  {
    title: 'Nightlife neu gedacht.',
    text: 'NOXEN verbindet Clubs, Menschen und spontane Nächte.',
    badge: 'BETA ACCESS',
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.push('/home');
    }
  };

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-black">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.22),transparent_40%)]" />

      <div className="absolute bottom-[-300px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[180px]" />

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

      {/* Floating Orbs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute left-10 top-20 h-40 w-40 rounded-full bg-purple-500/20 blur-[100px]"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute bottom-20 right-0 h-52 w-52 rounded-full bg-blue-500/20 blur-[120px]"
      />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col px-8 pb-10 pt-16">
        {/* Logo */}
        <div className="flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Image
              src="/noxen-logo.png"
              alt="NOXEN"
              width={140}
              height={140}
              priority
              className="drop-shadow-[0_0_40px_rgba(168,85,247,0.9)]"
            />
          </motion.div>
        </div>

        {/* Slides */}
        <div className="relative mt-16 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -50,
              }}
              transition={{
                duration: 0.5,
              }}
              className="flex flex-col items-center text-center"
            >
              {/* Badge */}
              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 backdrop-blur-xl">
                {slides[current].badge}
              </div>

              {/* Title */}
              <h1 className="mt-10 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-5xl font-black leading-[1.1] tracking-tight text-transparent">
                {slides[current].title}
              </h1>

              {/* Text */}
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/55">
                {slides[current].text}
              </p>

              {/* Fake UI Card */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="mt-14 w-full max-w-sm rounded-[34px] border border-white/10 bg-white/5 p-5 shadow-[0_0_80px_rgba(168,85,247,0.12)] backdrop-blur-3xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                      LIVE IN
                    </p>

                    <h2 className="mt-2 text-3xl font-black text-white">
                      Köln
                    </h2>
                  </div>

                  <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-bold text-white">
                    98%
                  </div>
                </div>

                <div className="mt-10 overflow-hidden rounded-[28px] border border-white/10">
                  <div className="h-48 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" />

                  <div className="bg-black p-5">
                    <h3 className="text-2xl font-black text-white">
                      BLACKROOM
                    </h3>

                    <p className="mt-2 text-white/50">
                      Bootshaus · Techno · 23:00
                    </p>

                    <div className="mt-6 h-[6px] overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="h-full w-[50%] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <div className="mt-10">
          {/* Dots */}
          <div className="mb-8 flex justify-center gap-3">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? 'w-10 bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Button */}
          <button
            onClick={nextSlide}
            className="h-16 w-full rounded-[24px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-sm font-black uppercase tracking-[0.3em] text-white shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all hover:scale-[1.02]"
          >
            {current === slides.length - 1
              ? 'NOXEN STARTEN'
              : 'WEITER'}
          </button>
        </div>
      </div>
    </main>
  );
}