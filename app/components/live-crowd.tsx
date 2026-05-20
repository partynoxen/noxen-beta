'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Flame,
  TrendingUp,
} from 'lucide-react';

const crowdData = [
  {
    city: 'Köln',
    people: '1.284',
    growth: '+18%',
    energy: '98%',
  },
  {
    city: 'Düren',
    people: '742',
    growth: '+12%',
    energy: '87%',
  },
  {
    city: 'Saarbrücken',
    people: '981',
    growth: '+26%',
    energy: '91%',
  },
];

export default function LiveCrowd() {
  return (
    <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(255,255,255,0.03)] backdrop-blur-3xl">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_35%)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-pink-400">
            LIVE CROWD
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            Städte eskalieren gerade
          </h2>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-300">

          <Flame className="h-4 w-4" />

          LIVE

        </div>

      </div>

      {/* Cards */}
      <div className="relative z-10 mt-10 grid gap-5 md:grid-cols-3">

        {crowdData.map((city, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
            }}
            className="rounded-[30px] border border-white/10 bg-black/30 p-5 backdrop-blur-2xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-white/40">
                  LIVE IN
                </p>

                <h3 className="mt-2 text-3xl font-black text-white">
                  {city.city}
                </h3>

              </div>

              <div className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-4 py-2 text-sm font-bold text-white shadow-[0_0_25px_rgba(168,85,247,0.45)]">
                {city.energy}
              </div>

            </div>

            <div className="mt-8 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">

                <Users className="h-6 w-6 text-white" />

              </div>

              <div>

                <p className="text-3xl font-black text-white">
                  {city.people}
                </p>

                <p className="text-sm text-white/40">
                  feiern gerade
                </p>

              </div>

            </div>

            <div className="mt-8 flex items-center gap-2 text-green-400">

              <TrendingUp className="h-4 w-4" />

              <span className="text-sm font-semibold">
                {city.growth} mehr Aktivität
              </span>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}