'use client';

import { motion } from 'framer-motion';
import {
  Flame,
  Users,
  Music4,
  MapPin,
} from 'lucide-react';

const statuses = [
  {
    icon: Flame,
    text: 'BLACKROOM eskaliert gerade',
    color:
      'from-pink-500 to-orange-500',
  },
  {
    icon: Users,
    text: '1.284 feiern live',
    color:
      'from-blue-500 to-cyan-500',
  },
  {
    icon: Music4,
    text: 'Techno trendet in Köln',
    color:
      'from-purple-500 to-pink-500',
  },
  {
    icon: MapPin,
    text: 'Düren wird aktiv',
    color:
      'from-green-500 to-emerald-500',
  },
];

export default function FloatingStatus() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">

      {statuses.map((status, index) => {
        const Icon = status.icon;

        return (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [40, 0, 0, -40],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 2,
            }}
            className={`absolute ${
              index === 0
                ? 'left-[8%] top-[18%]'
                : index === 1
                ? 'right-[8%] top-[28%]'
                : index === 2
                ? 'left-[12%] bottom-[28%]'
                : 'right-[10%] bottom-[22%]'
            }`}
          >

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-4 shadow-[0_0_50px_rgba(168,85,247,0.2)] backdrop-blur-3xl">

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${status.color}`}
              >

                <Icon className="h-5 w-5 text-white" />

              </div>

              <span className="text-sm font-medium text-white/80">
                {status.text}
              </span>

            </div>

          </motion.div>
        );
      })}
    </div>
  );
}