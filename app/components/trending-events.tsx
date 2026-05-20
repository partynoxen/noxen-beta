'use client';

import { motion } from 'framer-motion';
import {
  Flame,
  MapPin,
  Clock3,
  ChevronRight,
} from 'lucide-react';

const trendingEvents = [
  {
    title: 'BLACKROOM',
    club: 'Bootshaus',
    city: 'Köln',
    time: '23:00',
    energy: '98%',
    image:
      'https://images.unsplash.com/photo-1571266028243-d220c9f5f7e8?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'NEON CHAOS',
    club: 'Club X',
    city: 'Düren',
    time: '22:30',
    energy: '91%',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1974&auto=format&fit=crop',
  },
];

export default function TrendingEvents() {
  return (
    <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(255,255,255,0.03)] backdrop-blur-3xl">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.12),transparent_35%)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-pink-400">
            TRENDING EVENTS
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            Heute komplett eskaliert
          </h2>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-orange-300">

          <Flame className="h-4 w-4" />

          HOT

        </div>

      </div>

      {/* Cards */}
      <div className="relative z-10 mt-10 grid gap-6 lg:grid-cols-2">

        {trendingEvents.map((event, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.02,
            }}
            className="group overflow-hidden rounded-[34px] border border-white/10 bg-black/30 backdrop-blur-2xl"
          >

            {/* Image */}
            <div className="relative h-[260px] overflow-hidden">

              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300 backdrop-blur-xl">

                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                LIVE NOW

              </div>

              <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-4 py-2 text-sm font-bold text-white shadow-[0_0_25px_rgba(168,85,247,0.45)]">

                {event.energy}

              </div>

            </div>

            {/* Content */}
            <div className="p-6">

              <h3 className="text-4xl font-black text-white">
                {event.title}
              </h3>

              <p className="mt-2 text-xl text-white/50">
                {event.club}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-white/60">

                <div className="flex items-center gap-2">

                  <MapPin className="h-4 w-4" />

                  {event.city}

                </div>

                <div className="flex items-center gap-2">

                  <Clock3 className="h-4 w-4" />

                  {event.time}

                </div>

              </div>

              <button className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white text-lg font-semibold text-black transition-all hover:scale-[1.02]">

                Event ansehen

                <ChevronRight className="h-5 w-5" />

              </button>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}