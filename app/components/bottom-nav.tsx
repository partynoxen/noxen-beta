"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  Flame,
  UtensilsCrossed,
  Car,
  User,
} from "lucide-react";

const items = [
  {
    href: "/home",
    label: "Home",
    icon: House,
  },
  {
    href: "/swipe",
    label: "Swipe",
    icon: Flame,
  },
  {
    href: "/food",
    label: "Food",
    icon: UtensilsCrossed,
  },
  {
    href: "/taxi",
    label: "Taxi",
    icon: Car,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

      <div className="flex items-center gap-3 px-4 py-4 rounded-[32px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)]">

        {items.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                active
                  ? "scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            >

              <div
                className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 shadow-2xl shadow-pink-500/30"
                    : "bg-white/[0.04] border border-white/10"
                }`}
              >

                <Icon className="w-6 h-6 text-white" />

              </div>

              <span
                className={`text-xs mt-2 transition-all ${
                  active
                    ? "text-white"
                    : "text-white/40"
                }`}
              >
                {item.label}
              </span>

              {active && (
                <div className="absolute -bottom-2 w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              )}

            </Link>
          );
        })}

      </div>

    </div>
  );
}