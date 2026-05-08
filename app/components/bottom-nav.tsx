"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Flame,
  CalendarDays,
  Compass,
  Bookmark,
  User,
} from "lucide-react";

const navItems = [
  {
    label: "Swipe",
    href: "/swipe",
    icon: Flame,
  },
  {
    label: "Events",
    href: "/events",
    icon: CalendarDays,
  },
  {
    label: "Explore",
    href: "/nearby",
    icon: Compass,
  },
  {
    label: "Saved",
    href: "/saved",
    icon: Bookmark,
  },
  {
    label: "Profil",
    href: "/profile",
    icon: User,
  },
];

export default function BottomNav() {
  const router = useRouter();

  return (
    <>
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="
          fixed
          left-4
          top-[calc(env(safe-area-inset-top)+12px)]
          z-[120]
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-black/60
          text-white
          backdrop-blur-2xl
          active:scale-95
        "
      >
        <ArrowLeft size={22} />
      </button>

      {/* BOTTOM NAV */}
      <nav className="app-bottom-nav">
        <div className="mx-auto flex h-[76px] w-full max-w-[480px] items-center justify-around px-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className="tap flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2"
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/5
                    text-white/70
                    transition-all
                  "
                >
                  <Icon size={20} strokeWidth={2.5} />
                </div>

                <span className="text-[10px] font-bold tracking-tight text-white/40">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}