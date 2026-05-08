'use client';

import { useEffect, useState } from 'react';
import { MapPin, Phone, Search, Utensils, ExternalLink } from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import { loadDB, type VybeDB } from '@/lib/data-store';

export default function FoodClient() {
  const [db, setDb] = useState<VybeDB | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setDb(loadDB());
  }, []);

  if (!db) {
    return (
      <div className="min-h-screen bg-[#050509] text-white flex items-center justify-center">
        Lade Essen...
      </div>
    );
  }

  const filteredFood = db.food.filter((food) => {
    const haystack = [
      food.name,
      food.city,
      food.address,
      food.cuisine,
      food.note,
      food.tags.join(' '),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-32 pt-6 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-purple-300">
            VYBE Food
          </p>
          <h1 className="text-3xl font-black leading-tight">
            Essen vor oder nach der Party
          </h1>
          <p className="mt-2 text-sm text-white/45">
            Food-Spots aus deiner manuellen Datenbank.
          </p>
        </div>

        <label className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4">
          <Search size={18} className="text-purple-300" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Döner, Pizza, Restaurant, Stadt..."
            className="h-12 w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/30"
          />
        </label>

        <div className="space-y-4">
          {filteredFood.map((food) => (
            <div
              key={food.id}
              className="rounded-3xl border border-white/10 bg-white/[0.055] p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-black text-purple-200">
                      {food.cuisine}
                    </span>

                    {food.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-black leading-tight">
                    {food.name}
                  </h2>

                  <p className="mt-1 flex items-center gap-2 text-sm text-white/50">
                    <MapPin size={15} className="text-pink-300" />
                    {food.address || food.city}
                  </p>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 px-3 py-2 text-sm font-black">
                  {Number(food.pricePerPerson).toFixed(0)} €
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-white/45">
                {food.note || 'Kein Hinweis hinterlegt.'}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {food.phone ? (
                  <a
                    href={`tel:${food.phone}`}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 text-sm font-black"
                  >
                    <Phone size={16} />
                    Anrufen
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 py-3 text-sm font-black text-white/25">
                    <Phone size={16} />
                    Keine Nummer
                  </div>
                )}

                {food.reservationUrl ? (
                  <a
                    href={food.reservationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-purple-600 py-3 text-sm font-black"
                  >
                    <ExternalLink size={16} />
                    Reservieren
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 py-3 text-sm font-black text-white/25">
                    <Utensils size={16} />
                    Kein Link
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredFood.length === 0 && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.055] p-6 text-center">
            <p className="text-lg font-black">Nichts gefunden</p>
            <p className="mt-2 text-sm text-white/40">
              Geh zur Datenbank und füge neue Food-Spots hinzu.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}