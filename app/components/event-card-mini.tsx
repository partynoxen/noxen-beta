'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import HeatScore from './heat-score';
import GenreBadge from './genre-badge';
import { displayCity } from '@/lib/constants';

export interface EventData {
  id: string;
  title: string;
  clubName: string;
  city: string;
  location: string;
  genre: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  mediaUrl: string | null;
  heatScore: number;
  description: string;
  lineup: string | null;
  lat: number | null;
  lng: number | null;
  ticketUrl: string | null;
  views: number;
  likes: number;
  saves: number;
  checkins: number;
}

export default function EventCardMini({ event, index = 0 }: { event: EventData; index?: number }) {
  const router = useRouter();
  const dateStr = event?.date ? new Date(event.date).toLocaleDateString('de-DE', { weekday: 'short', month: 'short', day: 'numeric' }) : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index ?? 0) * 0.05, duration: 0.3 }}
      onClick={() => router.push(`/event/${event?.id}`)}
      className="glass rounded-2xl overflow-hidden cursor-pointer group hover:neon-glow-purple transition-all duration-300"
    >
      <div className="flex gap-3 p-3">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
          {event?.mediaUrl ? (
            <Image
              src={event.mediaUrl}
              alt={event?.title ?? 'Event'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="96px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-800 to-pink-800" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-bold text-sm text-white truncate">{event?.title ?? 'Event'}</h3>
          </div>
          <p className="text-[11px] text-white/50 truncate mb-1">{event?.clubName ?? ''}</p>
          <div className="flex items-center gap-1 text-[11px] text-white/40 mb-1.5">
            <MapPin size={10} /> <span className="truncate">{displayCity(event?.city ?? '')}</span>
            <span className="mx-1">·</span>
            <Calendar size={10} /> <span>{dateStr}</span>
          </div>
          <div className="flex items-center justify-between">
            <GenreBadge genre={event?.genre ?? ''} />
            <span className="text-xs font-mono font-bold text-white/80">
              {(event?.price ?? 0) === 0 ? 'GRATIS' : `${(event?.price ?? 0).toFixed(0)}€`}
            </span>
          </div>
          <div className="mt-1.5">
            <HeatScore score={event?.heatScore ?? 0} size="sm" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
