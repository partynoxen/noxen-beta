'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Clock,
  ExternalLink,
  Flame,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Utensils,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import { loadDB, type FoodItem } from '@/lib/data-store';

export default function FoodPage() {
  const [food, setFood] = useState<FoodItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const db = loadDB();
    setFood(db.food || []);
  }, []);

  const filteredFood = useMemo(() => {
    return food.filter((item) => {
      const haystack = `${item.name} ${item.city} ${item.address} ${item.cuisine} ${item.note} ${item.tags?.join(' ')}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [food, search]);

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="mx-auto max-w-5xl">
        <section className="mb-6 rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-orange-600/25 via-pink-600/15 to-purple-700/15 p-6 shadow-[0_0_80px_rgba(249,115,22,0.14)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-orange-300">
                VYBE FOOD
              </p>

              <h1 className="text-5xl font-black leading-none">
                Erst essen. Dann eskalieren.
              </h1>
            </div>

            <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10">
              <Utensils size={32} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            Pre-Party-Dinner, Late-Night-Food und schnelle Spots für Gruppen.
          </p>
        </section>

        <div className="vybe-card mb-6 flex items-center gap-3 px-5">
          <Search size={20} className="text-white/35" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Burger, Döner, Italienisch, Köln, Düren..."
            className="h-14 w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/25"
          />
        </div>

        <section className="mb-6 grid gap-3 md:grid-cols-3">
          <MiniLive label="Heute beliebt" value="Burger" icon={<Flame size={20} />} />
          <MiniLive label="Ø Preis" value="22 €" icon={<Utensils size={20} />} />
          <MiniLive label="Late Night" value="4 Spots" icon={<Clock size={20} />} />
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredFood.map((item, index) => {
            const hype = 78 + index * 5;
            const openLabel = index % 2 === 0 ? 'Jetzt offen' : 'Heute beliebt';

            return (
              <div key={item.id} className="vybe-card vybe-border p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black">
                        {item.cuisine}
                      </span>

                      <span className="flex items-center gap-1 rounded-full bg-green-500/15 px-3 py-1 text-xs font-black text-green-300">
                        <span className="live-dot" />
                        {openLabel}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black leading-tight">
                      {item.name}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-sm text-white/45">
                      <MapPin size={15} className="text-pink-300" />
                      {item.address || item.city}
                    </p>
                  </div>

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-orange-500 to-pink-600">
                    <Utensils size={30} />
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-white/50">
                  {item.note || 'Perfekter Spot für vor oder nach der Party.'}
                </p>

                <div className="mb-5 grid grid-cols-3 gap-3">
                  <SmallInfo label="p. P." value={`${item.pricePerPerson}€`} />
                  <SmallInfo label="Hype" value={`${hype}%`} />
                  <SmallInfo label="City" value={item.city} />
                </div>

                <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
                    style={{ width: `${hype}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {item.phone ? (
                    <a
                      href={`tel:${item.phone}`}
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white/10 text-sm font-black"
                    >
                      <Phone size={18} />
                      Anrufen
                    </a>
                  ) : (
                    <div className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white/10 text-sm font-black text-white/35">
                      <Phone size={18} />
                      Keine Nummer
                    </div>
                  )}

                  {item.reservationUrl ? (
                    <a
                      href={item.reservationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-600 text-sm font-black shadow-[0_0_35px_rgba(249,115,22,0.25)]"
                    >
                      <ExternalLink size={18} />
                      Reservieren
                    </a>
                  ) : (
                    <div className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white/10 text-sm font-black text-white/35">
                      <Sparkles size={18} />
                      Kein Link
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredFood.length === 0 && (
          <div className="vybe-card mt-10 p-8 text-center">
            <Utensils className="mx-auto mb-4 text-orange-300" size={44} />
            <h2 className="text-3xl font-black">Kein Food Spot gefunden</h2>
            <p className="mt-3 text-white/45">
              Lege im Mitarbeiterbereich weitere Restaurants an.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function MiniLive({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="vybe-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-orange-300">
          {icon}
        </div>
        <div className="live-dot" />
      </div>

      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function SmallInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/30 p-3">
      <p className="text-xs text-white/35">{label}</p>
      <p className="mt-1 truncate text-lg font-black">{value}</p>
    </div>
  );
}