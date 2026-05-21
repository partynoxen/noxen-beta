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
    <div className="fixed bottom-5 left-1/2 z-[9999] -translate-x-1/2">
      <motion.div
        initial={{
          opacity: 0,
          y: 60,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="
          relative
          flex
          items-center
          gap-2
          overflow-hidden
          rounded-[38px]
          border
          border-white/10
          bg-black/30
          px-4
          py-4
          backdrop-blur-[40px]
          shadow-[0_0_80px_rgba(168,85,247,0.35)]
        "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-cyan-500/10" />

        <div className="absolute inset-[1px] rounded-[36px] bg-black/70" />

        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="
            absolute
            left-10
            top-0
            h-24
            w-24
            rounded-full
            bg-fuchsia-500/20
            blur-3xl
          "
        />

        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
          className="
            absolute
            right-10
            bottom-0
            h-24
            w-24
            rounded-full
            bg-cyan-500/20
            blur-3xl
          "
        />

        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                className={`
                  relative
                  z-10
                  flex
                  h-[74px]
                  w-[74px]
                  flex-col
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[28px]
                  border
                  transition-all
                  duration-500
                  ${
                    active
                      ? "border-white/20 bg-white/10 shadow-[0_0_40px_rgba(168,85,247,0.5)]"
                      : "border-transparent bg-white/[0.02]"
                  }
                `}
              >
                {active && (
                  <>
                    <motion.div
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.4, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                      className={`
                        absolute
                        h-12
                        w-12
                        rounded-full
                        bg-gradient-to-r
                        ${item.color}
                        blur-2xl
                      `}
                    />

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