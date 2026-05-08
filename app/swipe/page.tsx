'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Bookmark,
  Calendar,
  Flame,
  Heart,
  MapPin,
  Share2,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';
import { loadDB, type EventItem } from '@/lib/data-store';
import { STORAGE_KEYS } from '@/lib/storage-keys';

export default function SwipePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [swipeLabel, setSwipeLabel] = useState<'LIKE' | 'SKIP' | null>(null);

  useEffect(() => {
    const db = loadDB();
    setEvents(db.events || []);

    setLiked(JSON.parse(localStorage.getItem(STORAGE_KEYS.likedEvents) || '[]'));
    setSaved(JSON.parse(localStorage.getItem(STORAGE_KEYS.savedEvents) || '[]'));
  }, []);

  const current = events[index];

  const goNext = () => {
    setSwipeLabel(null);
    setIndex((prev) => Math.min(prev + 1, events.length - 1));
  };

  const likeAndNext = () => {
    if (!current) return;

    const updated = liked.includes(current.id)
      ? liked
      : [...liked, current.id];

    setLiked(updated);
    localStorage.setItem(STORAGE_KEYS.likedEvents, JSON.stringify(updated));
    setSwipeLabel('LIKE');

    setTimeout(goNext, 220);
  };

  const skipAndNext = () => {
    setSwipeLabel('SKIP');
    setTimeout(goNext, 220);
  };

  const toggleSave = () => {
    if (!current) return;

    const updated = saved.includes(current.id)
      ? saved.filter((id) => id !== current.id)
      : [...saved, current.id];

    setSaved(updated);
    localStorage.setItem(STORAGE_KEYS.savedEvents, JSON.stringify(updated));
  };

  const shareEvent = async () => {
    if (!current) return;

    const url = `${window.location.origin}/events/${current.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: current.title,
          text: `${current.title} im ${current.clubName}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link kopiert.');
      }
    } catch {}
  };

  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050509] px-6 text-center text-white">
        <div className="vybe-card max-w-sm p-8">
          <Flame className="mx-auto mb-4 text-purple-300" size={44} />
          <h1 className="text-3xl font-black">Keine Events mehr</h1>
          <p className="mt-2 text-white/45">Check später neue Events.</p>
          <Link
            href="/home"
            className="vybe-button mt-6 flex h-14 items-center justify-center rounded-2xl text-sm font-black"
          >
            Zur Home
          </Link>
        </div>
      </div>
    );
  }

  const isLiked = liked.includes(current.id);
  const isSaved = saved.includes(current.id);

  return (
    <div className="relative h-screen overflow-hidden bg-black text-white">
      <div className="noise" />

      <AnimatePresence mode="popLayout">
        <motion.div
          key={current.id}
          className="absolute inset-0"
          initial={{ scale: 0.96, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: 0.92,
            x: swipeLabel === 'LIKE' ? 260 : swipeLabel === 'SKIP' ? -260 : 0,
            rotate: swipeLabel === 'LIKE' ? 12 : swipeLabel === 'SKIP' ? -12 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 240,
            damping: 26,
          }}
          drag="x"
          dragElastic={0.16}
          dragConstraints={{ left: 0, right: 0 }}
          whileDrag={{ scale: 1.015 }}
          onDrag={(event, info) => {
            if (info.offset.x > 80) setSwipeLabel('LIKE');
            else if (info.offset.x < -80) setSwipeLabel('SKIP');
            else setSwipeLabel(null);
          }}
          onDragEnd={(event, info) => {
            if (info.offset.x > 130) {
              likeAndNext();
              return;
            }

            if (info.offset.x < -130) {
              skipAndNext();
              return;
            }

            setSwipeLabel(null);
          }}
        >
          <div className="absolute inset-0">
            {current.mediaUrl ? (
              <Image
                src={current.mediaUrl}
                alt={current.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-purple-950 via-black to-pink-950" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.32),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.22),transparent_35%)]" />
          </div>

          {swipeLabel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: swipeLabel === 'LIKE' ? -8 : 8 }}
              animate={{ opacity: 1, scale: 1, rotate: swipeLabel === 'LIKE' ? -8 : 8 }}
              className={`absolute top-28 z-40 rounded-[1.5rem] border-4 px-8 py-4 text-4xl font-black ${
                swipeLabel === 'LIKE'
                  ? 'right-8 border-green-400 text-green-300'
                  : 'left-8 border-red-400 text-red-300'
              }`}
            >
              {swipeLabel}
            </motion.div>
          )}

          <div className="absolute left-0 right-0 top-0 z-20 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-pink-300">
                  NOXEN SWIPE
                </p>
                <h1 className="mt-1 text-2xl font-black">Discover</h1>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl">
                <p className="text-sm font-black">
                  {index + 1} / {events.length}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-48 right-4 z-30 flex flex-col gap-4">
            <SideButton
              active={isLiked}
              color="bg-red-500"
              onClick={likeAndNext}
              icon={<Heart size={24} className={isLiked ? 'fill-white' : ''} />}
            />

            <SideButton
              active={isSaved}
              color="bg-yellow-500"
              onClick={toggleSave}
              icon={<Bookmark size={24} className={isSaved ? 'fill-white' : ''} />}
            />

            <SideButton onClick={shareEvent} icon={<Share2 size={24} />} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 pb-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-purple-600 px-4 py-2 text-xs font-black">
                {current.genre}
              </span>

              <div className="flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-xs font-black text-orange-300 backdrop-blur-xl">
                <Flame size={14} />
                HOT
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white/70 backdrop-blur-xl">
                <Sparkles size={14} />
                NOXEN PICK
              </div>
            </div>

            <h2 className="max-w-xl text-5xl font-black leading-none">
              {current.title}
            </h2>

            <p className="mt-3 text-xl font-semibold text-white/75">
              {current.clubName}
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/75">
              <InfoBadge icon={<MapPin size={16} />} text={current.city} />
              <InfoBadge icon={<Calendar size={16} />} text={formatDate(current.date)} />
              <InfoBadge text={current.price === 0 ? 'Gratis' : `${current.price}€`} />
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 line-clamp-3">
              {current.description || 'Keine Beschreibung vorhanden.'}
            </p>

            <div className="mt-7 grid grid-cols-[64px_1fr_64px] gap-3">
              <button
                onClick={skipAndNext}
                className="flex h-16 items-center justify-center rounded-[1.7rem] bg-white/10 backdrop-blur-xl active:scale-95"
              >
                <X size={24} />
              </button>

              <Link
                href={`/events/${current.id}`}
                className="vybe-button flex h-16 items-center justify-center gap-3 rounded-[1.7rem] text-lg font-black"
              >
                <Ticket size={22} />
                Event öffnen
              </Link>

              <button
                onClick={likeAndNext}
                className="flex h-16 items-center justify-center rounded-[1.7rem] bg-red-500/80 backdrop-blur-xl active:scale-95"
              >
                <Heart size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SideButton({
  icon,
  active,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  active?: boolean;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.04 }}
      onClick={onClick}
      className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-xl transition-all ${
        active
          ? `${color} text-white shadow-[0_0_30px_rgba(255,255,255,0.18)]`
          : 'bg-black/35 text-white'
      }`}
    >
      {icon}
    </motion.button>
  );
}

function InfoBadge({
  icon,
  text,
}: {
  icon?: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
      {icon}
      {text}
    </div>
  );
}

function formatDate(dateString: string) {
  if (!dateString) return 'Datum offen';

  try {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return dateString;
  }
}