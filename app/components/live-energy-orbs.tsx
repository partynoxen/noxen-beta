"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    size: 220,
    color: "bg-fuchsia-500",
    left: "10%",
    top: "20%",
    duration: 12,
  },
  {
    size: 280,
    color: "bg-cyan-500",
    left: "70%",
    top: "25%",
    duration: 16,
  },
  {
    size: 180,
    color: "bg-violet-500",
    left: "40%",
    top: "70%",
    duration: 14,
  },
];

export default function LiveEnergyOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: [-40, 40, -40],
            y: [-30, 30, -30],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full blur-[140px] ${orb.color}`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            opacity: 0.18,
          }}
        />
      ))}
    </div>
  );
}