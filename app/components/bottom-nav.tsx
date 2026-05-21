"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Flame,
  UtensilsCrossed,
  Car,
  User,
} from "lucide-react";

const navItems = [
  {
    href: "/home",
    icon: Home,
    label: "Home",
  },
  {
    href: "/swipe",
    icon: Flame,
    label: "Swipe",
  },
  {
    href: "/food",
    icon: UtensilsCrossed,
    label: "Food",
  },
  {
    href: "/taxi",
    icon: Car,
    label: "Taxi",
  },
  {
    href: "/profile",
    icon: User,
    label: "Profil",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 z-[999] -translate-x-1/2">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 p-3 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl">
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-cyan-500/10 to-fuchsia-500/10" />

        <div className="relative flex items-center gap-2">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="relative"
                >
                  {/* ACTIVE BACKGROUND */}
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-cyan-500 shadow-[0_0_30px_rgba(217,70,239,0.6)]"
                    />
                  )}

                  {/* BUTTON */}
                  <div
                    className={`relative flex w-[72px] flex-col items-center justify-center rounded-[24px] px-4 py-3 transition-all duration-300 ${
                      active
                        ? "text-white"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {/* FLOATING ORB */}
                    {active && (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute top-1 h-8 w-8 rounded-full bg-white/20 blur-xl"
                      />
                    )}

                    <motion.div
                      animate={
                        active
                          ? {
                              y: [-1, -4, -1],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Icon size={22} strokeWidth={2.4} />
                    </motion.div>

                    <span
                      className={`mt-1 text-[11px] font-medium ${
                        active
                          ? "text-white"
                          : "text-zinc-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}