'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Car,
  Clock,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import { loadDB, type TaxiItem } from '@/lib/data-store';

export default function TaxiPage() {
  const [taxis, setTaxis] = useState<TaxiItem[]>([]);
  const [search, setSearch] = useState('');
  const [pickup, setPickup] = useState('Aktueller Standort');
  const [destination, setDestination] = useState('Nach Hause');

  useEffect(() => {
    const db = loadDB();
    setTaxis(db.taxis || []);
  }, []);

  const filteredTaxis = useMemo(() => {
    return taxis.filter((taxi) => {
      const haystack = `${taxi.name} ${taxi.city} ${taxi.note} ${taxi.tags?.join(' ')}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [taxis, search]);

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="mx-auto max-w-5xl">
        <section className="mb-6 rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-purple-700/25 via-pink-600/15 to-blue-700/15 p-6 shadow-[0_0_80px_rgba(168,85,247,0.16)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-purple-300">
                VYBE RIDE
              </p>

              <h1 className="text-5xl font-black leading-none">
                Heimweg sichern.
              </h1>
            </div>

            <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10">
              <Car size={32} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            Taxi, Uber oder regionale Anbieter. Schnell erreichbar, direkt aus dem Drunk Mode nutzbar.
          </p>
        </section>

        <section className="vybe-card mb-6 p-5">
          <div className="mb-4 grid gap-3 md:grid-cols-2">
            <InputCard
              label="Abholung"
              icon={<MapPin size={18} />}
              value={pickup}
              onChange={setPickup}
            />

            <InputCard
              label="Ziel"
              icon={<ShieldCheck size={18} />}
              value={destination}
              onChange={setDestination}
            />
          </div>

          <div className="flex items-center gap-3 rounded-[1.6rem] border border-white/10 bg-black/35 px-4">
            <Search size={18} className="text-white/35" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Taxi, Stadt oder Anbieter suchen..."
              className="h-14 w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/25"
            />
          </div>
        </section>

        <section className="mb-6 grid gap-3 md:grid-cols-3">
          <LiveRideCard label="Ø Wartezeit" value="7 Min" icon={<Clock size={20} />} />
          <LiveRideCard label="Aktive Fahrer" value="24" icon={<Car size={20} />} />
          <LiveRideCard label="Safe Score" value="96%" icon={<ShieldCheck size={20} />} />
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredTaxis.map((taxi, index) => {
            const eta = 5 + index * 3;
            const demand = 72 + index * 7;

            return (
              <div key={taxi.id} className="vybe-card vybe-border overflow-hidden p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-black">
                        {taxi.city}
                      </span>

                      <span className="flex items-center gap-1 rounded-full bg-green-500/15 px-3 py-1 text-xs font-black text-green-300">
                        <span className="live-dot" />
                        verfügbar
                      </span>
                    </div>

                    <h2 className="text-3xl font-black leading-tight">
                      {taxi.name}
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {taxi.note || 'Schnelle Fahrtoption für deinen Heimweg.'}
                    </p>
                  </div>

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-purple-600 to-pink-600">
                    <Car size={30} />
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-3 gap-3">
                  <SmallInfo label="ETA" value={`${eta} min`} />
                  <SmallInfo label="p. P." value={`${taxi.pricePerPerson}€`} />
                  <SmallInfo label="Demand" value={`${demand}%`} />
                </div>

                <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500"
                    style={{ width: `${demand}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {taxi.phone ? (
                    <a
                      href={`tel:${taxi.phone}`}
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-black shadow-[0_0_35px_rgba(168,85,247,0.25)]"
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

                  {taxi.bookingUrl ? (
                    <a
                      href={taxi.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 text-sm font-black"
                    >
                      <Zap size={18} />
                      App öffnen
                    </a>
                  ) : (
                    <Link
                      href="/drunk"
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 text-sm font-black"
                    >
                      <Sparkles size={18} />
                      Safe Mode
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTaxis.length === 0 && (
          <div className="vybe-card mt-10 p-8 text-center">
            <Car className="mx-auto mb-4 text-purple-300" size={44} />
            <h2 className="text-3xl font-black">Kein Taxi gefunden</h2>
            <p className="mt-3 text-white/45">
              Lege im Mitarbeiterbereich weitere Taxi-Anbieter an.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function InputCard({
  label,
  value,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <label className="block rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
      <div className="mb-2 flex items-center gap-2 text-purple-300">
        {icon}
        <span className="text-xs font-black uppercase tracking-[0.16em] text-white/35">
          {label}
        </span>
      </div>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full bg-transparent text-lg font-black text-white outline-none"
      />
    </label>
  );
}

function LiveRideCard({
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
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-purple-300">
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

function SmallInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-black/30 p-3">
      <p className="text-xs text-white/35">{label}</p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}