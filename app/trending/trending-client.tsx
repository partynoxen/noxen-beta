'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, SlidersHorizontal, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '../components/bottom-nav';
import EventCardMini from '../components/event-card-mini';
import FilterModal, { FilterState, DEFAULT_FILTERS, hasActiveFilters } from '../components/filter-modal';
import { DATE_API_MAP, PRICE_API_MAP } from '@/lib/constants';
import type { EventData } from '../components/event-card-mini';

export default function TrendingClient() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const fetchEvents = useCallback(async (f: FilterState) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('sort', 'heat');
      if ((f?.genres?.length ?? 0) > 0) params.set('genres', (f?.genres ?? []).join(','));
      if ((f?.cities?.length ?? 0) > 0) params.set('cities', (f?.cities ?? []).join(','));
      if (f?.date) params.set('date', DATE_API_MAP[f.date] ?? f.date);
      if ((f?.prices?.length ?? 0) > 0) params.set('prices', (f?.prices ?? []).map((p: string) => PRICE_API_MAP[p] ?? p).join(','));
      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();
      setEvents(data ?? []);
    } catch (e: any) {
      console.error(e);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(filters); }, [fetchEvents, filters]);

  const handleApplyFilters = (f: FilterState) => {
    setFilters(f);
  };

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const hotTonight = (events ?? []).filter((e: EventData) => {
    const eDate = new Date(e?.date ?? '');
    return eDate.toISOString().split('T')[0] === todayStr;
  });

  const thisWeekend = (events ?? []).filter((e: EventData) => {
    const eDate = new Date(e?.date ?? '');
    const eDay = eDate.getDay();
    const diffDays = Math.ceil(((eDate?.getTime?.() ?? 0) - (today?.getTime?.() ?? 0)) / 86400000);
    return (eDay === 5 || eDay === 6 || eDay === 0) && diffDays >= 0 && diffDays <= 7 && eDate.toISOString().split('T')[0] !== todayStr;
  });

  const rising = (events ?? []).filter((e: EventData) => {
    const eDate = new Date(e?.date ?? '');
    const diffDays = Math.ceil(((eDate?.getTime?.() ?? 0) - (today?.getTime?.() ?? 0)) / 86400000);
    return diffDays > 2;
  });

  const sections = [
    { title: 'Hei\u00df heute Nacht \ud83d\udd25', icon: Flame, events: hotTonight, color: 'from-orange-500 to-red-500' },
    { title: 'Am Wochenende', icon: TrendingUp, events: thisWeekend, color: 'from-purple-500 to-pink-500' },
    { title: 'Aufsteiger', icon: TrendingUp, events: rising, color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">
      <div className="sticky top-0 z-40 glass-strong">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <TrendingUp size={22} className="text-pink-400" />
            <h1 className="text-xl font-display font-bold">Trending</h1>
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="relative p-2.5 rounded-xl glass hover:bg-white/10 transition-colors"
          >
            <SlidersHorizontal size={20} className="text-white/70" />
            {hasActiveFilters(filters) && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-pink-500 neon-glow-pink" />
            )}
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center h-60">
            <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          sections.map((section: any, sIdx: number) => {
            const sectionEvents = section?.events ?? [];
            if (sectionEvents.length === 0) return null;
            return (
              <motion.div
                key={section?.title ?? sIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sIdx * 0.15 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${section?.color ?? ''}`} />
                  <h2 className="text-lg font-display font-bold">{section?.title ?? ''}</h2>
                  <span className="text-xs text-white/30 ml-auto">{sectionEvents.length} Events</span>
                </div>
                <div className="flex flex-col gap-3">
                  {sectionEvents.map((event: EventData, idx: number) => (
                    <EventCardMini key={event?.id ?? idx} event={event} index={idx} />
                  ))}
                </div>
              </motion.div>
            );
          })
        )}
        {!loading && (events?.length ?? 0) === 0 && (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg mb-2">Keine Trending-Events gefunden</p>
            <p className="text-sm">Versuch mal andere Filter</p>
          </div>
        )}
      </div>

      <FilterModal isOpen={showFilter} onClose={() => setShowFilter(false)} filters={filters} onApply={handleApplyFilters} />
      <BottomNav />
    </div>
  );
}
