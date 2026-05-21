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
    color: "from-pink-500 to-violet-500",
  },
  {
    href: "/swipe",
    icon: Flame,
    label: "Swipe",
    color: "from-orange-500 to-pink-500",
  },
  {
    href: "/food",
    icon: UtensilsCrossed,
    label: "Food",
    color: "from-yellow-500 to-orange-500",
  },
  {
    href: "/taxi",
    icon: Car,
    label: "Taxi",
    color: "from-cyan-500 to-blue-500",
  },
  {
    href: "/profile",
    icon: User,
    label: "Profil",
    color: "from-violet-500 to-indigo-500",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-5 left-1/2 z-[999] -translate-x-1/2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          flex
          items-center
          gap-2
          rounded-[34px]
          border
          border-white/10
          bg-black/40
          px-3
          py-3
          backdrop-blur-3xl
          shadow-[0_0_60px_rgba(168,85,247,0.25)]
        "
      >
        <div className="absolute inset-0 rounded-[34px] bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-cyan-500/10" />

        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ y: -4 }}
                className={`
                  relative
                  flex
                  h-[72px]
                  w-[72px]
                  flex-col
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[24px]
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-white/10 shadow-[0_0_35px_rgba(168,85,247,0.45)]"
                      : "bg-white/[0.03]"
                  }
                `}
              >
                {active && (
                  <>
                    <motion.div
                      layoutId="active-pill"
                      className={`
                        absolute
                        inset-0
                        bg-gradient-to-br
                        ${item.color}
                        opacity-20
                      `}
                    />

                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className={`
                        absolute
                        h-16
                        w-16
                        rounded-full
                        bg-gradient-to-r
                        ${item.color}
                        blur-2xl
                      `}
                    />
                  </>
                )}

                <motion.div
                  animate={
                    active
                      ? {
                          y: [-1, -5, -1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="relative z-10"
                >
                  <Icon
                    size={24}
                    strokeWidth={2.4}
                    className={
                      active
                        ? "text-white"
                        : "text-zinc-500"
                    }
                  />
                </motion.div>

                <span
                  className={`
                    relative
                    z-10
                    mt-1
                    text-[11px]
                    font-medium
                    ${
                      active
                        ? "text-white"
                        : "text-zinc-500"
                    }
                  `}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}