"use client";

import { motion } from "framer-motion";

import {
  Calendar,
  Car,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";

const actions = [
  {
    icon: Calendar,
    title: "Events",
    color: "from-pink-500 to-purple-500",
  },
  {
    icon: MapPin,
    title: "Live Map",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: UtensilsCrossed,
    title: "Food",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Car,
    title: "Taxi",
    color: "from-green-500 to-emerald-500",
  },
];

export default function QuickActions() {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3">
      {actions.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            whileTap={{
              scale: 0.96,
            }}
            className={`rounded-3xl bg-gradient-to-r ${item.color} p-[1px]`}
          >
            <div className="rounded-3xl bg-black/70 p-4 backdrop-blur-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Icon size={22} />
              </div>

              <p className="text-lg font-black">
                {item.title}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}