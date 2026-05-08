'use client';

import { useEffect, useState } from 'react';
import {
  MessageCircle,
  Send,
  Star,
  Trash2,
  Bug,
  Lightbulb,
  Heart,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';

type FeedbackItem = {
  id: string;
  type: string;
  rating: number;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = 'vybe_beta_feedback';

export default function FeedbackPage() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [type, setType] = useState('Idee');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setItems(saved);
  }, []);

  const saveFeedback = () => {
    if (!message.trim()) return;

    const next = [
      {
        id: crypto.randomUUID(),
        type,
        rating,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      },
      ...items,
    ];

    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setMessage('');
    setRating(5);
    setType('Idee');
  };

  const deleteItem = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="mx-auto max-w-4xl">
        <section className="mb-6 rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-purple-700/30 via-pink-600/20 to-blue-700/15 p-6 shadow-[0_0_80px_rgba(168,85,247,0.16)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-purple-300">
                TESTPHASE
              </p>

              <h1 className="text-5xl font-black leading-none">
                Feedback geben.
              </h1>
            </div>

            <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10">
              <MessageCircle size={32} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            Sammle direkt Meinungen von Freunden: Bugs, Ideen, Wow-Momente und ehrliches Nutzerfeedback.
          </p>
        </section>

        <section className="vybe-card mb-6 p-5">
          <div className="mb-5 grid gap-3 md:grid-cols-3">
            {[
              { label: 'Idee', icon: <Lightbulb size={18} /> },
              { label: 'Bug', icon: <Bug size={18} /> },
              { label: 'Wow', icon: <Heart size={18} /> },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setType(item.label)}
                className={`flex h-14 items-center justify-center gap-2 rounded-2xl text-sm font-black ${
                  type === item.label
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                    : 'border border-white/10 bg-white/[0.05] text-white/45'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-white/35">
              Bewertung
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    rating >= star
                      ? 'bg-yellow-500 text-black'
                      : 'border border-white/10 bg-white/[0.05] text-white/30'
                  }`}
                >
                  <Star size={20} className={rating >= star ? 'fill-black' : ''} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Was ist geil, was fehlt, was nervt?"
            className="mb-5 min-h-[150px] w-full rounded-[1.7rem] border border-white/10 bg-black/30 p-5 text-sm font-bold text-white outline-none placeholder:text-white/25 focus:border-purple-400"
          />

          <button
            onClick={saveFeedback}
            className="vybe-button flex h-16 w-full items-center justify-center gap-3 rounded-[1.6rem] text-sm font-black"
          >
            <Send size={20} />
            Feedback speichern
          </button>
        </section>

        <section className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="vybe-card flex items-start gap-4 p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
                {item.type === 'Bug' ? <Bug size={22} /> : item.type === 'Wow' ? <Heart size={22} /> : <Lightbulb size={22} />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/60">
                    {item.type}
                  </span>

                  <span className="text-xs font-bold text-yellow-300">
                    {'★'.repeat(item.rating)}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-white/65">
                  {item.message}
                </p>
              </div>

              <button
                onClick={() => deleteItem(item.id)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-300"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}

          {items.length === 0 && (
            <div className="vybe-card p-8 text-center">
              <MessageCircle className="mx-auto mb-4 text-purple-300" size={42} />
              <h2 className="text-2xl font-black">Noch kein Feedback</h2>
              <p className="mt-2 text-sm text-white/45">
                Perfekt. Jetzt Freunde testen lassen und knallhart Meinungen sammeln.
              </p>
            </div>
          )}
        </section>
      </div>

      <BottomNav />
    </div>
  );
}