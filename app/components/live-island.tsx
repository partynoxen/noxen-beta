'use client';

import { motion } from 'framer-motion';
import {
  Flame,
  Music4,
  Users,
  MapPin,
} from 'lucide-react';

const items = [
  {
    icon: Flame,
    text: 'BLACKROOM trendet gerade',
  },
  {
    icon: Users,
    text: '1.2K feiern aktuell',
  },
  {
    icon: Music4,
    text: 'Techno Night live',
  },
  {
    icon: MapPin,
    text: 'Köln explodiert heute',
  },
];

export default function LiveIsland() {
  return (
    <div className="relative mb-8 flex justify-center">

      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="relative overflow-hidden rounded-full border border-white/10 bg-black/40 px-5 py-4 shadow-[0_0_60px_rgba(168,85,247,0.2)] backdrop-blur-3xl"
      >

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)]" />

        {/* Content */}
        <motion.div
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative flex gap-12 whitespace-nowrap"
        >

          {[...items, ...items].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-3 text-white/70"
              >

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.45)]">

                  <Icon className="h-4 w-4 text-white" />

                </div>

                <span className="text-sm font-medium tracking-wide">
                  {item.text}
                </span>

              </div>
            );
          })}

        </motion.div>

      </motion.div>

    </div>
  );
}