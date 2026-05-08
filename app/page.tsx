"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const BETA_PASSWORD = "noxen2026";

  useEffect(() => {
    try {
      const savedUnlock = localStorage.getItem("noxen_beta_unlocked");

      if (savedUnlock === "true") {
        setUnlocked(true);
      }
    } catch (error) {
      console.error("LocalStorage Fehler:", error);
    }
  }, []);

  useEffect(() => {
    if (unlocked) {
      router.replace("/events");
    }
  }, [unlocked, router]);

  function unlockApp() {
    setLoading(true);
    setErrorMsg("");

    try {
      const cleanPassword = password.trim();

      if (cleanPassword !== BETA_PASSWORD) {
        setErrorMsg("Falsches Beta-Passwort.");
        setLoading(false);
        return;
      }

      localStorage.setItem("noxen_beta_unlocked", "true");
      setUnlocked(true);
    } catch (error) {
      console.error("Unlock Fehler:", error);
      setErrorMsg("Fehler beim Öffnen der Beta.");
      setLoading(false);
    }
  }

  if (unlocked) {
    return (
      <main className="min-h-dvh w-full bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
          <p className="text-white/50 text-sm">NOXEN wird geöffnet...</p>

          <button
            onClick={() => {
              localStorage.removeItem("noxen_beta_unlocked");
              setUnlocked(false);
              setLoading(false);
              setPassword("");
            }}
            className="mt-6 rounded-xl border border-white/10 px-4 py-2 text-xs text-white/50"
          >
            Beta zurücksetzen
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh w-full bg-black text-white overflow-hidden">
      <section className="relative flex min-h-dvh w-full flex-col items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed66,transparent_35%),radial-gradient(circle_at_bottom,#ec489966,transparent_35%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-7 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">
              Closed Beta
            </p>

            <h1 className="mb-3 text-5xl font-black tracking-tight">
              NOXEN
            </h1>

            <p className="text-sm leading-6 text-white/60">
              Diese Beta-Version enthält Demo-Inhalte. Clubs, Events, Logos,
              Taxi-Anbieter oder Marken werden nur beispielhaft dargestellt und
              sind keine offiziellen Partner, sofern nicht ausdrücklich angegeben.
            </p>
          </div>

          <div className="space-y-4">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") unlockApp();
              }}
              type="password"
              placeholder="Beta-Passwort eingeben"
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-5 text-center text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30"
            />

            {errorMsg && (
              <p className="text-center text-sm font-medium text-red-400">
                {errorMsg}
              </p>
            )}

            <button
              onClick={unlockApp}
              disabled={loading}
              className="h-14 w-full rounded-2xl bg-white text-sm font-black text-black transition active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Wird geöffnet..." : "Beta öffnen"}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Closed Beta · Build v0.3
          </div>
        </motion.div>
      </section>
    </main>
  );
}