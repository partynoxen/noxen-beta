"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Bookmark,
  ChevronRight,
  Flame,
  Heart,
  LogOut,
  Moon,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  User2,
  Zap,
} from "lucide-react";

import BottomNav from "@/app/components/bottom-nav";

export default function ProfileClient() {
  const [savedCount, setSavedCount] = useState(0);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("vybe_saved_events") || "[]");
      const liked = JSON.parse(localStorage.getItem("vybe_liked_events") || "[]");

      setSavedCount(Array.isArray(saved) ? saved.length : 0);
      setLikedCount(Array.isArray(liked) ? liked.length : 0);
    } catch {
      setSavedCount(0);
      setLikedCount(0);
    }
  }, []);

  return (
    <main className="app-screen bg-[#050509] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.30),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.18),transparent_30%),#050509]" />

      <div className="app-container pb-36 pt-7">
        <header className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-purple-300/80">
              NOXEN Profile
            </p>

            <h1 className="mt-2 text-5xl font-black leading-none tracking-tight">
              Dein
              <br />
              Nightlife.
            </h1>
          </div>

          <button className="tap flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl">
            <Settings size={21} />
          </button>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="mb-6 rounded-[2.4rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.48)] backdrop-blur-xl"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 shadow-[0_0_45px_rgba(236,72,153,0.35)]">
              <User2 size={34} />

              <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-black">
                <ShieldCheck size={16} />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black">Beta Tester</h2>
              <p className="mt-1 text-sm font-bold text-white/45">
                NOXEN Closed Beta
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={<Flame size={18} />} value="01" label="Streak" />
            <StatCard icon={<Heart size={18} />} value={likedCount} label="Likes" />
            <StatCard icon={<Bookmark size={18} />} value={savedCount} label="Saved" />
          </div>
        </motion.section>

        <section className="mb-6 grid grid-cols-2 gap-4">
          <FeatureCard
            icon={<Zap size={28} />}
            title="Swipe"
            subtitle="Finde deine Nacht"
            highlight
          />

          <FeatureCard
            icon={<Ticket size={28} />}
            title="Tickets"
            subtitle="Beta: bald live"
          />

          <FeatureCard
            icon={<Star size={28} />}
            title="Picks"
            subtitle="NOXEN Empfehlungen"
          />

          <FeatureCard
            icon={<Moon size={28} />}
            title="Night Mode"
            subtitle="Immer aktiv"
          />
        </section>

        <section className="space-y-3">
          <ProfileRow
            icon={<Bell size={20} />}
            title="Push-Benachrichtigungen"
            subtitle="Später: Hot Events & Updates"
          />

          <ProfileRow
            icon={<Sparkles size={20} />}
            title="Beta Feedback"
            subtitle="Sag uns, was mies oder krank ist"
          />

          <ProfileRow
            icon={<ShieldCheck size={20} />}
            title="Beta-Hinweis"
            subtitle="Demo-Inhalte, keine offiziellen Partner"
          />

          <button
            onClick={() => {
              localStorage.removeItem("noxen_beta_unlocked");
              window.location.href = "/";
            }}
            className="tap flex w-full items-center justify-between rounded-[1.7rem] border border-red-500/20 bg-red-500/10 p-5 text-left backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/20 text-red-300">
                <LogOut size={20} />
              </div>

              <div>
                <h3 className="text-base font-black text-red-200">
                  Beta verlassen
                </h3>

                <p className="mt-1 text-sm font-bold text-red-200/45">
                  Login zurücksetzen
                </p>
              </div>
            </div>

            <ChevronRight size={18} className="text-red-200/40" />
          </button>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
      <div className="mb-3 text-white/55">{icon}</div>
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  subtitle,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <button
      className={`tap rounded-[2rem] border border-white/10 p-5 text-left backdrop-blur-xl ${
        highlight
          ? "bg-gradient-to-br from-pink-500 to-orange-400 shadow-[0_0_45px_rgba(236,72,153,0.32)]"
          : "bg-white/[0.06]"
      }`}
    >
      <div className="mb-5">{icon}</div>

      <h3 className="text-2xl font-black leading-none">{title}</h3>

      <p className={`mt-3 text-sm font-bold ${highlight ? "text-white/70" : "text-white/45"}`}>
        {subtitle}
      </p>
    </button>
  );
}

function ProfileRow({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button className="tap flex w-full items-center justify-between rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 text-left backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08] text-white/70">
          {icon}
        </div>

        <div>
          <h3 className="text-base font-black">{title}</h3>

          <p className="mt-1 text-sm font-bold text-white/42">
            {subtitle}
          </p>
        </div>
      </div>

      <ChevronRight size={18} className="text-white/30" />
    </button>
  );
}