"use client";

import { motion } from "framer-motion";

const cities = [
  {
    city: "Köln",
    score: 92,
    color: "from-purple-500 to-pink-500",
  },
  {
    city: "Saarbrücken",
    score: 84,
    color: "from-cyan-500 to-blue-500",
  },
  {
    city: "Düren",
    score: 76,
    color: "from-orange-500 to-red-500",
  },
];

export default function FloatingCityCards() {
  return (
    <div className="mb-6 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
      {cities.map((city, index) => (
        <motion.div
          key={city.city}
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: index * 0.1,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="relative min-w-[170px] overflow-hidden rounded-[28px] border border-white/10 bg-black/30 p-5 backdrop-blur-3xl"
        >
          {/* Glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${city.color} opacity-10`}
          />

          <div className="relative z-10">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              NIGHT SCORE
            </p>

            <h3 className="mb-4 text-2xl font-black">
              {city.city}
            </h3>

            <div className="mb-3 flex items-end gap-2">
              <p className="text-5xl font-black">
                {city.score}
              </p>

              <span className="mb-1 text-lg text-white/40">
                /100
              </span>
            </div>

            {/* Progress */}
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${city.score}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className={`h-full rounded-full bg-gradient-to-r ${city.color}`}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}