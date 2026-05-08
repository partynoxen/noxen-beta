'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import {
  Flame,
  Home,
  Map,
  ShieldAlert,
} from 'lucide-react';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/swipe', label: 'Swipe', icon: Flame },
  { href: '/plan', label: 'Plan', icon: Map },
  { href: '/drunk', label: 'Safe', icon: ShieldAlert },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="bottom-fade z-[9997]" />

      <nav className="fixed bottom-3 left-3 right-3 z-[9999] mx-auto max-w-md rounded-[2rem] border border-white/10 bg-black/75 px-2 py-2 shadow-[0_20px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        <div className="grid grid-cols-4 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== '/home' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center rounded-2xl px-3 py-3"
              >
                {active && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-[0_0_30px_rgba(168,85,247,0.45)]"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 34,
                    }}
                  />
                )}

                <motion.div
                  animate={{
                    y: active ? -2 : 0,
                    scale: active ? 1.08 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 22,
                  }}
                  className={`relative z-10 flex flex-col items-center ${
                    active ? 'text-white' : 'text-white/38'
                  }`}
                >
                  <Icon size={21} />

                  <span className="mt-1 text-[11px] font-black leading-none">
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-white/30">
          <a
            href="https://jolas-media.de/impressum-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Impressum
          </a>

          <a
            href="https://jolas-media.de/datenschutzerklarung-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutz
          </a>
        </div>
      </nav>
    </>
  );
}