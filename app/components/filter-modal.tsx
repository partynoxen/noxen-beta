'use client';

import { useState, useEffect } from 'react';
import { X, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GENRES, CITIES, DATE_OPTIONS, PRICE_OPTIONS } from '@/lib/constants';

export interface FilterState {
  genres: string[];
  date: string;
  distance: string;
  prices: string[];
  cities: string[];
}

export const DEFAULT_FILTERS: FilterState = {
  genres: [],
  date: '',
  distance: '',
  prices: [],
  cities: [],
};

export function hasActiveFilters(f: FilterState): boolean {
  return (
    (f?.genres?.length ?? 0) > 0 ||
    !!(f?.date) ||
    !!(f?.distance) ||
    (f?.prices?.length ?? 0) > 0 ||
    (f?.cities?.length ?? 0) > 0
  );
}

export default function FilterModal({
  isOpen,
  onClose,
  filters,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (f: FilterState) => void;
}) {
  const [local, setLocal] = useState<FilterState>(filters ?? DEFAULT_FILTERS);

  useEffect(() => {
    if (isOpen) setLocal(filters ?? DEFAULT_FILTERS);
  }, [isOpen, filters]);

  const toggleArray = (key: 'genres' | 'prices' | 'cities', val: string) => {
    setLocal((prev: FilterState) => {
      const arr = [...(prev?.[key] ?? [])];
      const idx = arr.indexOf(val);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(val);
      return { ...prev, [key]: arr };
    });
  };

  const setRadio = (key: 'date' | 'distance', val: string) => {
    setLocal((prev: FilterState) => ({ ...prev, [key]: prev?.[key] === val ? '' : val }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/70 flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-full max-w-lg glass-strong rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto scrollbar-hide"
            onClick={(e: any) => e?.stopPropagation?.()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-purple-400" />
                <h2 className="text-lg font-display font-bold">Filter</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Genre */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-white/70 mb-2">Genre</h3>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((g: string) => (
                  <button
                    key={g}
                    onClick={() => toggleArray('genres', g)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      (local?.genres ?? []).includes(g)
                        ? 'bg-purple-600 text-white neon-glow-purple'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Datum */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-white/70 mb-2">Datum</h3>
              <div className="flex flex-wrap gap-2">
                {DATE_OPTIONS.map((d: string) => (
                  <button
                    key={d}
                    onClick={() => setRadio('date', d)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      local?.date === d
                        ? 'bg-blue-600 text-white neon-glow-blue'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Preis */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-white/70 mb-2">Preis</h3>
              <div className="flex flex-wrap gap-2">
                {PRICE_OPTIONS.map((p: string) => (
                  <button
                    key={p}
                    onClick={() => toggleArray('prices', p)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      (local?.prices ?? []).includes(p)
                        ? 'bg-pink-600 text-white neon-glow-pink'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Stadt */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/70 mb-2">Stadt</h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => toggleArray('cities', c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      (local?.cities ?? []).includes(c)
                        ? 'bg-purple-600 text-white neon-glow-purple'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setLocal(DEFAULT_FILTERS);
                  onApply(DEFAULT_FILTERS);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 font-medium transition-colors"
              >
                <RotateCcw size={16} />
                Zur\u00fccksetzen
              </button>
              <button
                onClick={() => {
                  onApply(local);
                  onClose();
                }}
                className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-500 hover:to-pink-500 transition-all neon-glow-purple"
              >
                Filter anwenden
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
