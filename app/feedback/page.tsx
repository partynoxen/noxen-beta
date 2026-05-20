"use client";

import { useState } from "react";
import {
  Send,
  Bug,
  Sparkles,
  HeartHandshake,
 MessageSquare,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");

  const sendFeedback = () => {
    const subject = encodeURIComponent(
      "NOXEN Beta Feedback"
    );

    const body = encodeURIComponent(feedback);

    window.location.href = `mailto:partynoxen@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden pb-32">

      <div className="absolute top-[-200px] left-[-100px] w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 px-5 pt-14 max-w-md mx-auto">

        <div className="mb-10">

          <p className="text-pink-400 tracking-[0.3em] text-xs mb-3 uppercase">
            Beta Feedback
          </p>

          <h1 className="text-5xl font-bold leading-none mb-4">
            Feedback
          </h1>

          <p className="text-white/50 text-lg">
            Hilf uns dabei, NOXEN besser zu machen.
          </p>

        </div>

        <div className="rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 mb-6">

          <div className="flex items-center gap-3 mb-6">

            <MessageSquare className="w-6 h-6 text-pink-400" />

            <h2 className="text-2xl font-bold">
              Dein Feedback
            </h2>

          </div>

          <textarea
            value={feedback}
            onChange={(e) =>
              setFeedback(e.target.value)
            }
            placeholder="Was gefällt dir? Was wirkt komisch? Welche Features sollen wir als Nächstes bauen?"
            className="w-full h-48 rounded-3xl bg-black/40 border border-white/10 p-5 text-white placeholder:text-white/30 resize-none outline-none focus:border-pink-500/40 transition-all"
          />

          <button
            onClick={sendFeedback}
            className="mt-6 w-full h-16 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.01] transition-all"
          >

            <Send className="w-5 h-5" />

            Feedback senden

          </button>

        </div>

      </div>

      <BottomNav />

    </main>
  );
}