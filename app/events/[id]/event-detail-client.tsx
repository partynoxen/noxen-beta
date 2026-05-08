'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  Ticket,
  Navigation,
  MapPin,
  Calendar,
  Clock,
  Music,
  Users,
  UtensilsCrossed,
  Car,
  Sparkles,
} from 'lucide-react';

import BottomNav from '../../components/bottom-nav';
import HeatScore from '../../components/heat-score';
import GenreBadge from '../../components/genre-badge';
import { displayCity } from '@/lib/constants';
import type { EventData } from '../../components/event-card-mini';
import { createEveningPlan, savePlan } from '@/lib/plan-utils';

function safeParseArray(value: string | null): string[] {
  try {
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function EventDetailClient({
  eventId,
}: {
  eventId: string;
}) {
  const router = useRouter();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`);

        if (!res.ok) {
          setEvent(null);
          return;
        }

        const data = await res.json();
        setEvent(data ?? null);
      } catch (error) {
        console.error('Event laden fehlgeschlagen:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    const loadLocalInteractions = () => {
      try {
        const savedIds = safeParseArray(
          localStorage.getItem('vybe_saved_events')
        );

        const likedIds = safeParseArray(
          localStorage.getItem('vybe_liked_events')
        );

        setIsSaved(savedIds.includes(eventId));
        setIsLiked(likedIds.includes(eventId));
      } catch (error) {
        console.error('LocalStorage Fehler:', error);
      }
    };

    if (eventId) {
      fetchEvent();
      loadLocalInteractions();
    } else {
      setLoading(false);
    }
  }, [eventId]);

  const handleSave = () => {
    try {
      const savedIds = safeParseArray(
        localStorage.getItem('vybe_saved_events')
      );

      const nextSaved = savedIds.includes(eventId)
        ? savedIds.filter((id) => id !== eventId)
        : [...savedIds, eventId];

      localStorage.setItem(
        'vybe_saved_events',
        JSON.stringify(nextSaved)
      );

      setIsSaved(nextSaved.includes(eventId));
    } catch (error) {
      console.error('Speichern fehlgeschlagen:', error);
    }
  };

  const handleLike = () => {
    try {
      const likedIds = safeParseArray(
        localStorage.getItem('vybe_liked_events')
      );

      const nextLiked = likedIds.includes(eventId)
        ? likedIds.filter((id) => id !== eventId)
        : [...likedIds, eventId];

      localStorage.setItem(
        'vybe_liked_events',
        JSON.stringify(nextLiked)
      );

      setIsLiked(nextLiked.includes(eventId));
    } catch (error) {
      console.error('Like fehlgeschlagen:', error);
    }
  };

  const handleShare = async () => {
    try {
      const currentUrl =
        typeof window !== 'undefined'
          ? window.location.href
          : '';

      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: event?.title ?? 'NOXEN Event',
          text: `Check mal ${
            event?.title ?? 'dieses Event'
          } im ${event?.clubName ?? 'Club'} aus!`,
          url: currentUrl,
        });
      } else if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentUrl);
        alert('Link kopiert!');
      }
    } catch (error) {
      console.error('Teilen fehlgeschlagen:', error);
    }
  };

  const handleCreatePlan = () => {
    try {
      if (!event) return;

      const plan = createEveningPlan({
        id: event.id,
        title: event.title,
        date: event.date,
        startTime: event.startTime,
      });

      savePlan(plan);

      router.push('/');
    } catch (error) {
      console.error('Plan erstellen fehlgeschlagen:', error);
      alert('Plan konnte nicht erstellt werden.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-[#050509] flex items-center justify-center pb-20">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <BottomNav />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-dvh bg-[#050509] flex flex-col items-center justify-center pb-20 px-6 text-center">
        <p className="text-white/50 mb-4">
          Event nicht gefunden
        </p>

        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white"
        >
          Zurück
        </button>

        <BottomNav />
      </div>
    );
  }

  const price = Number(event.price ?? 0);

  const dateStr = event.date
    ? new Date(event.date).toLocaleDateString('de-DE', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const lineupArr = (event.lineup ?? '')
    .split(',')
    .map((item: string) => item.trim())
    .filter(Boolean);

  const mapsUrl =
    event.lat && event.lng
      ? `https://www.google.com/maps?q=${event.lat},${event.lng}`
      : `https://www.google.com/maps/search/${encodeURIComponent(
          `${event.location ?? ''} ${event.city ?? ''}`
        )}`;

  return (
    <div className="min-h-dvh bg-[#050509] pb-24 text-white">
      <div className="relative h-80">
        {event.mediaUrl ? (
          <Image
            src={event.mediaUrl}
            alt={event.title ?? 'Event'}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-black/45 to-black/20" />

        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 p-3 rounded-full border border-white/10 bg-black/45 backdrop-blur-xl"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={handleShare}
          className="absolute top-4 right-4 z-10 p-3 rounded-full border border-white/10 bg-black/45 backdrop-blur-xl"
        >
          <Share2 size={18} />
        </button>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <GenreBadge genre={event.genre ?? ''} />

              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-bold text-white/70">
                {price === 0
                  ? 'GRATIS'
                  : `${price.toFixed(0)}€`}
              </span>
            </div>

            <h1 className="text-4xl font-black leading-tight mb-2">
              {event.title ?? 'Event'}
            </h1>

            <p className="text-white/55 text-lg font-semibold">
              {event.clubName ?? ''}
            </p>
          </div>

          <button
            onClick={handleCreatePlan}
            className="mb-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-5 py-4 text-base font-black shadow-[0_0_35px_rgba(168,85,247,0.35)] active:scale-[0.98]"
          >
            <Sparkles size={20} />
            Abend automatisch planen
          </button>

          <div className="glass rounded-2xl p-4 mb-4">
            <HeatScore
              score={event.heatScore ?? 0}
              size="lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="glass rounded-xl p-3">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Calendar size={14} />
                <span className="text-xs font-semibold">
                  Datum
                </span>
              </div>

              <p className="text-sm text-white/80">
                {dateStr}
              </p>
            </div>

            <div className="glass rounded-xl p-3">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Clock size={14} />
                <span className="text-xs font-semibold">
                  Uhrzeit
                </span>
              </div>

              <p className="text-sm text-white/80">
                {event.startTime ?? ''} –{' '}
                {event.endTime ?? ''}
              </p>
            </div>

            <div className="glass rounded-xl p-3 col-span-2">
              <div className="flex items-center gap-2 text-pink-400 mb-1">
                <MapPin size={14} />
                <span className="text-xs font-semibold">
                  Location
                </span>
              </div>

              <p className="text-sm text-white/80">
                {event.location ?? ''},{' '}
                {displayCity(event.city ?? '')}
              </p>
            </div>
          </div>

          <div className="glass rounded-2xl p-4 mb-4">
            <h3 className="text-sm font-semibold text-white/70 mb-2 flex items-center gap-2">
              <Music
                size={14}
                className="text-purple-400"
              />
              Über das Event
            </h3>

            <p className="text-sm text-white/60 leading-relaxed">
              {event.description ?? ''}
            </p>
          </div>

          {lineupArr.length > 0 && (
            <div className="glass rounded-2xl p-4 mb-4">
              <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                <Users
                  size={14}
                  className="text-pink-400"
                />
                Lineup
              </h3>

              <div className="flex flex-wrap gap-2">
                {lineupArr.map(
                  (dj: string, i: number) => (
                    <span
                      key={`${dj}-${i}`}
                      className="px-3 py-1.5 rounded-full glass text-xs font-medium text-white/80"
                    >
                      {dj}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          <div className="glass rounded-2xl p-4 mb-5">
            <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
              <MapPin
                size={14}
                className="text-blue-400"
              />
              Karte
            </h3>

            <div className="relative h-40 rounded-xl bg-white/5 flex items-center justify-center mb-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />

              <div className="text-center z-10">
                <MapPin
                  size={32}
                  className="text-white/20 mx-auto mb-2"
                />

                <p className="text-xs text-white/30">
                  {event.location ?? ''}
                </p>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 rounded-xl bg-white/5 text-center text-sm text-white/70 hover:bg-white/10 transition-colors"
            >
              In Google Maps öffnen
            </a>
          </div>

          <BottomNav />
        </motion.div>
      </div>
    </div>
  );
}