'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  Bookmark,
  Calendar,
  Heart,
  MapPin,
  Trash2,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';

import {
  loadDB,
  type EventItem,
} from '@/lib/data-store';

const LIKES_KEY = 'vybe_liked_events';
const SAVED_KEY = 'vybe_saved_events';

export default function SavedPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [tab, setTab] = useState<'saved' | 'liked'>(
    'saved'
  );

  useEffect(() => {
    const db = loadDB();

    setEvents(db.events || []);

    const liked = JSON.parse(
      localStorage.getItem(LIKES_KEY) || '[]'
    );

    const saved = JSON.parse(
      localStorage.getItem(SAVED_KEY) || '[]'
    );

    setLikedIds(liked);
    setSavedIds(saved);
  }, []);

  const filteredEvents = useMemo(() => {
    if (tab === 'saved') {
      return events.filter((event) =>
        savedIds.includes(event.id)
      );
    }

    return events.filter((event) =>
      likedIds.includes(event.id)
    );
  }, [events, likedIds, savedIds, tab]);

  const removeSaved = (id: string) => {
    const updated = savedIds.filter(
      (item) => item !== id
    );

    setSavedIds(updated);

    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify(updated)
    );
  };

  const removeLiked = (id: string) => {
    const updated = likedIds.filter(
      (item) => item !== id
    );

    setLikedIds(updated);

    localStorage.setItem(
      LIKES_KEY,
      JSON.stringify(updated)
    );
  };

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-32 pt-6 text-white">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-pink-300">
            VYBE COLLECTION
          </p>

          <h1 className="text-4xl font-black">
            Deine Events
          </h1>

          <p className="mt-3 text-sm text-white/45">
            Gespeicherte und gelikte Events.
          </p>
        </div>

        {/* TABS */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setTab('saved')}
            className={`flex h-14 items-center justify-center gap-3 rounded-2xl text-sm font-black transition-all ${
              tab === 'saved'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                : 'border border-white/10 bg-white/[0.05] text-white/45'
            }`}
          >
            <Bookmark size={18} />
            Gespeichert
          </button>

          <button
            onClick={() => setTab('liked')}
            className={`flex h-14 items-center justify-center gap-3 rounded-2xl text-sm font-black transition-all ${
              tab === 'liked'
                ? 'bg-gradient-to-r from-red-600 to-pink-600'
                : 'border border-white/10 bg-white/[0.05] text-white/45'
            }`}
          >
            <Heart size={18} />
            Geliked
          </button>
        </div>

        {/* GRID */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05]"
            >
              {/* IMAGE */}
              <div className="relative h-64">
                {event.mediaUrl ? (
                  <Image
                    src={event.mediaUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-purple-900 to-pink-900" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-black">
                    {event.genre}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-3xl font-black leading-tight">
                    {event.title}
                  </h2>

                  <p className="mt-1 text-white/75">
                    {event.clubName}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="mb-4 flex flex-wrap gap-3 text-sm text-white/50">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={15} />
                    {event.city}
                  </div>
                </div>

                <p className="line-clamp-2 text-sm leading-relaxed text-white/45">
                  {event.description ||
                    'Keine Beschreibung vorhanden.'}
                </p>

                {/* BUTTONS */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    href={`/events/${event.id}`}
                    className="flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-black"
                  >
                    Öffnen
                  </Link>

                  {tab === 'saved' ? (
                    <button
                      onClick={() =>
                        removeSaved(event.id)
                      }
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-red-500/15 text-sm font-black text-red-300"
                    >
                      <Trash2 size={18} />
                      Entfernen
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        removeLiked(event.id)
                      }
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-red-500/15 text-sm font-black text-red-300"
                    >
                      <Trash2 size={18} />
                      Entfernen
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {filteredEvents.length === 0 && (
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.05] p-10 text-center">
            <h2 className="text-3xl font-black">
              Keine Events vorhanden
            </h2>

            <p className="mt-3 text-white/45">
              Swipe durch Events und speichere deine Favoriten.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}