'use client';

import { useEffect, useState } from 'react';
import { Bookmark, Heart, Camera, MapPin, Calendar, Trash2 } from 'lucide-react';
import BottomNav from '../components/bottom-nav';
import type { EventData } from '../components/event-card-mini';
import { displayCity } from '@/lib/constants';

export default function ProfileClient() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [likedCount, setLikedCount] = useState(0);
  const [savedEvents, setSavedEvents] = useState<EventData[]>([]);

  useEffect(() => {
    async function loadProfileData() {
      const savedRaw = localStorage.getItem('vybe_saved_events');
      const likedRaw = localStorage.getItem('vybe_liked_events');

      const nextSavedIds: string[] = savedRaw ? JSON.parse(savedRaw) : [];
      const likedIds: string[] = likedRaw ? JSON.parse(likedRaw) : [];

      setSavedIds(nextSavedIds);
      setLikedCount(likedIds.length);

      try {
        const res = await fetch('/api/events');
        const allEvents: EventData[] = await res.json();

        setSavedEvents(allEvents.filter((event) => nextSavedIds.includes(event.id)));
      } catch (error) {
        console.error('Gespeicherte Events konnten nicht geladen werden:', error);
      }
    }

    loadProfileData();
  }, []);

  const removeSavedEvent = (eventId: string) => {
    const nextSavedIds = savedIds.filter((id) => id !== eventId);

    setSavedIds(nextSavedIds);
    setSavedEvents((prev) => prev.filter((event) => event.id !== eventId));
    localStorage.setItem('vybe_saved_events', JSON.stringify(nextSavedIds));
  };

  return (
    <div className="min-h-screen bg-black text-white px-5 pt-10 pb-28">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-[0_0_35px_rgba(168,85,247,0.45)]">
            <span className="text-2xl font-black">B</span>
          </div>

          <h1 className="text-2xl font-black">Demo User</h1>
          <p className="text-sm text-white/40">demo@vybe.app</p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center">
            <Bookmark className="mx-auto mb-2 text-purple-300" size={20} />
            <p className="text-xl font-black">{savedIds.length}</p>
            <p className="text-xs text-white/45">Gespeichert</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center">
            <Heart className="mx-auto mb-2 text-pink-300" size={20} />
            <p className="text-xl font-black">{likedCount}</p>
            <p className="text-xs text-white/45">Geliked</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center">
            <Camera className="mx-auto mb-2 text-blue-300" size={20} />
            <p className="text-xl font-black">0</p>
            <p className="text-xs text-white/45">Vibes</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black">Gespeicherte Events</h2>
          <span className="text-xs text-white/35">{savedEvents.length} Events</span>
        </div>

        {savedEvents.length === 0 ? (
          <div className="mt-16 text-center">
            <Heart className="mx-auto mb-4 text-white/15" size={52} />
            <p className="text-white/35">Noch keine gespeicherten Events</p>
            <p className="mt-2 text-sm text-white/25">
              Swipe durch Events und speichere deine Favoriten.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
              >
                <div className="mb-2 flex items-start justify-between gap-4">
                  <a href={`/event/${event.id}`} className="block flex-1">
                    <h3 className="text-base font-black leading-tight">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/45">
                      {event.clubName}
                    </p>
                  </a>

                  <button
                    onClick={() => removeSavedEvent(event.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                    aria-label="Gespeichertes Event entfernen"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <a href={`/event/${event.id}`} className="block">
                  <div className="flex flex-wrap gap-2 text-xs text-white/55">
                    <span className="flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1">
                      <MapPin size={12} />
                      {displayCity(event.city)}
                    </span>

                    <span className="flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1">
                      <Calendar size={12} />
                      {new Date(event.date).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}