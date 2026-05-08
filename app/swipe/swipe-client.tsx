'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  X,
  ArrowLeft,
  Bookmark,
  Flame,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import GenreBadge from '../components/genre-badge';
import HeatScore from '../components/heat-score';
import { displayCity } from '@/lib/constants';
import type { EventData } from '../components/event-card-mini';

export default function SwipeClient() {
  const router = useRouter();

  const [events, setEvents] = useState<EventData[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-10, 0, 10]);
  const likeOpacity = useTransform(x, [50, 160], [0, 1]);
  const nopeOpacity = useTransform(x, [-160, -50], [1, 0]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data ?? []);
    } catch (error) {
      console.error('Events konnten nicht geladen werden:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();

    const saved = localStorage.getItem('vybe_saved_events');
    const liked = localStorage.getItem('vybe_liked_events');

    if (saved) setSavedIds(JSON.parse(saved));
    if (liked) setLikedIds(JSON.parse(liked));
  }, [fetchEvents]);

  const current = events[index];
  const next = events[index + 1];

  const goNext = () => {
    setIndex((prev) => prev + 1);
    x.set(0);
  };

  const like = () => {
    if (!current) return;

    const updated = likedIds.includes(current.id)
      ? likedIds
      : [...likedIds, current.id];

    setLikedIds(updated);
    localStorage.setItem('vybe_liked_events', JSON.stringify(updated));
    goNext();
  };

  const skip = () => {
    goNext();
  };

  const toggleSave = () => {
    if (!current) return;

    const updated = savedIds.includes(current.id)
      ? savedIds.filter((id) => id !== current.id)
      : [...savedIds, current.id];

    setSavedIds(updated);
    localStorage.setItem('vybe_saved_events', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050509]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
          <p className="text-xs font-bold tracking-[0.25em] text-white/35">
            VYBE LÄDT
          </p>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#050509] px-6 text-center text-white">
        <Flame className="mb-5 text-purple-300" size={42} />
        <h2 className="mb-2 text-3xl font-black">Alles durchgeswiped</h2>
        <p className="max-w-xs text-sm text-white/40">
          Du hast alle Events gesehen. Starte neu oder check später nochmal rein.
        </p>

        <button
          onClick={() => {
            setIndex(0);
            x.set(0);
          }}
          className="mt-7 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-7 py-4 text-sm font-black shadow-[0_0_35px_rgba(168,85,247,0.35)]"
        >
          Nochmal starten
        </button>

        <BottomNav />
      </div>
    );
  }

  const price = Number(current.price ?? 0);
  const isSaved = savedIds.includes(current.id);
  const isLiked = likedIds.includes(current.id);

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#050509] text-white">
      {next && (
        <div className="absolute inset-x-4 top-6 bottom-24 scale-[0.94] overflow-hidden rounded-[2rem] border border-white/10 opacity-35 blur-[1px]">
          {next.mediaUrl ? (
            <Image
              src={next.mediaUrl}
              alt={next.title ?? 'Nächstes Event'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-purple-950 via-black to-pink-950" />
          )}
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          drag="x"
          style={{ x, rotate }}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.velocity.x > 500 || info.offset.x > 120) {
              like();
            } else if (info.velocity.x < -500 || info.offset.x < -120) {
              skip();
            } else {
              x.set(0);
            }
          }}
          className="absolute inset-x-3 top-3 bottom-[5.7rem] overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.65)] sm:inset-x-[22%] sm:top-8 sm:bottom-28"
        >
          {current.mediaUrl ? (
            <Image
              src={current.mediaUrl}
              alt={current.title ?? 'Event'}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-purple-950 via-black to-pink-950" />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.35),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.28),transparent_35%)]" />

          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute left-6 top-24 z-40 rotate-12 rounded-2xl border-4 border-green-400 px-5 py-2 text-4xl font-black text-green-400 shadow-[0_0_35px_rgba(74,222,128,0.45)]"
          >
            LIKE
          </motion.div>

          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute right-6 top-24 z-40 -rotate-12 rounded-2xl border-4 border-red-400 px-5 py-2 text-4xl font-black text-red-400 shadow-[0_0_35px_rgba(248,113,113,0.45)]"
          >
            NOPE
          </motion.div>

          <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/80 backdrop-blur-xl active:scale-95"
            >
              <ArrowLeft size={21} />
            </button>

            <span className="rounded-full border border-white/10 bg-black/45 px-3 py-2 text-xs font-bold text-white/70 backdrop-blur-xl">
              {index + 1} / {events.length}
            </span>
          </div>

          <section className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-7">
            <div className="mb-3 flex items-center gap-2">
              <GenreBadge genre={current.genre} />
              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-bold text-white/80 backdrop-blur-xl">
                {price === 0 ? 'GRATIS' : `${price.toFixed(0)}€`}
              </span>
            </div>

            <h1 className="mb-2 text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl">
              {current.title}
            </h1>

            <p className="mb-4 text-base font-semibold text-white/62">
              {current.clubName}
            </p>

            <div className="mb-4 flex flex-wrap gap-2 text-sm text-white/75">
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-xl">
                <MapPin size={14} className="text-pink-300" />
                {displayCity(current.city)}
              </span>

              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-xl">
                <Calendar size={14} className="text-purple-300" />
                {new Date(current.date).toLocaleDateString('de-DE')}
              </span>

              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-xl">
                <Clock size={14} className="text-blue-300" />
                {current.startTime}
              </span>
            </div>

            <HeatScore score={current.heatScore ?? 0} />

            <div className="mt-5 grid grid-cols-[56px_56px_1fr_56px] gap-3">
              <button
                onClick={skip}
                className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl active:scale-95"
              >
                <X size={25} />
              </button>

              <button
                onClick={like}
                className={`flex h-14 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-xl active:scale-95 ${
                  isLiked
                    ? 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.45)]'
                    : 'bg-white/10 text-red-300'
                }`}
              >
                <Heart size={25} fill={isLiked ? 'white' : 'none'} />
              </button>

              <button
                onClick={() => router.push(`/event/${current.id}`)}
                className="h-14 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-sm font-black shadow-[0_0_35px_rgba(168,85,247,0.35)] active:scale-95"
              >
                Details ansehen
              </button>

              <button
                onClick={toggleSave}
                className={`flex h-14 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-xl active:scale-95 ${
                  isSaved
                    ? 'bg-purple-600 text-white shadow-[0_0_30px_rgba(147,51,234,0.45)]'
                    : 'bg-white/10 text-purple-300'
                }`}
              >
                <Bookmark size={24} fill={isSaved ? 'white' : 'none'} />
              </button>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <BottomNav />
    </main>
  );
}