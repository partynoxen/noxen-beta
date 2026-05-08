'use client';

import { useEffect, useState } from 'react';
import {
  Calendar,
  Car,
  Plus,
  Trash2,
  Utensils,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import { loadDB, saveDB, type VybeDB } from '@/lib/data-store';

export default function DatabasePage() {
  const [db, setDb] = useState<VybeDB | null>(null);
  const [tab, setTab] = useState<'events' | 'food' | 'taxis'>('events');

  useEffect(() => {
    const isAuthed =
      localStorage.getItem('vybe_employee_auth') === 'true';

    if (!isAuthed) {
      window.location.href = '/mitarbeiter';
      return;
    }

    setDb(loadDB());
  }, []);

  if (!db) {
    return (
      <div className="min-h-screen bg-[#050509] text-white flex items-center justify-center">
        Lade Datenbank...
      </div>
    );
  }

  const updateDB = (updated: VybeDB) => {
    setDb(updated);
    saveDB(updated);
  };

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-32 pt-6 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-purple-300">
            VYBE DATABASE
          </p>

          <h1 className="text-3xl font-black">
            Datenbank verwalten
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Events, Essen und Taxi live bearbeiten.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          <TabButton
            active={tab === 'events'}
            onClick={() => setTab('events')}
            icon={<Calendar size={16} />}
            label="Events"
          />

          <TabButton
            active={tab === 'food'}
            onClick={() => setTab('food')}
            icon={<Utensils size={16} />}
            label="Food"
          />

          <TabButton
            active={tab === 'taxis'}
            onClick={() => setTab('taxis')}
            icon={<Car size={16} />}
            label="Taxi"
          />
        </div>

        {/* EVENTS */}
        {tab === 'events' && (
          <div className="space-y-4">
            {db.events.map((event, index) => (
              <div
                key={event.id}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-black">
                    Event #{index + 1}
                  </h2>

                  <button
                    onClick={() => {
                      const updated = {
                        ...db,
                        events: db.events.filter((e) => e.id !== event.id),
                      };

                      updateDB(updated);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20 text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid gap-3">
                  <Input
                    label="Titel"
                    value={event.title}
                    onChange={(value) => {
                      const updated = [...db.events];
                      updated[index].title = value;

                      updateDB({
                        ...db,
                        events: updated,
                      });
                    }}
                  />

                  <Input
                    label="Club"
                    value={event.clubName}
                    onChange={(value) => {
                      const updated = [...db.events];
                      updated[index].clubName = value;

                      updateDB({
                        ...db,
                        events: updated,
                      });
                    }}
                  />

                  <Input
                    label="Stadt"
                    value={event.city}
                    onChange={(value) => {
                      const updated = [...db.events];
                      updated[index].city = value;

                      updateDB({
                        ...db,
                        events: updated,
                      });
                    }}
                  />

                  <Input
                    label="Preis"
                    value={String(event.price)}
                    onChange={(value) => {
                      const updated = [...db.events];
                      updated[index].price = Number(value);

                      updateDB({
                        ...db,
                        events: updated,
                      });
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                updateDB({
                  ...db,
                  events: [
                    ...db.events,
                    {
                      id: crypto.randomUUID(),
                      title: 'Neues Event',
                      clubName: '',
                      city: '',
                      location: '',
                      date: '',
                      startTime: '22:00',
                      endTime: '05:00',
                      genre: 'TECHNO',
                      price: 0,
                      ticketUrl: '',
                      organizerName: '',
                      organizerUrl: '',
                      description: '',
                      notes: '',
                      tags: [],
                      mediaUrl: '',
                    },
                  ],
                });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 font-black"
            >
              <Plus size={18} />
              Event hinzufügen
            </button>
          </div>
        )}

        {/* FOOD */}
        {tab === 'food' && (
          <div className="space-y-4">
            {db.food.map((food, index) => (
              <div
                key={food.id}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-black">
                    Food #{index + 1}
                  </h2>

                  <button
                    onClick={() => {
                      updateDB({
                        ...db,
                        food: db.food.filter((f) => f.id !== food.id),
                      });
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20 text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid gap-3">
                  <Input
                    label="Restaurant"
                    value={food.name}
                    onChange={(value) => {
                      const updated = [...db.food];
                      updated[index].name = value;

                      updateDB({
                        ...db,
                        food: updated,
                      });
                    }}
                  />

                  <Input
                    label="Cuisine"
                    value={food.cuisine}
                    onChange={(value) => {
                      const updated = [...db.food];
                      updated[index].cuisine = value;

                      updateDB({
                        ...db,
                        food: updated,
                      });
                    }}
                  />

                  <Input
                    label="Preis"
                    value={String(food.pricePerPerson)}
                    onChange={(value) => {
                      const updated = [...db.food];
                      updated[index].pricePerPerson = Number(value);

                      updateDB({
                        ...db,
                        food: updated,
                      });
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                updateDB({
                  ...db,
                  food: [
                    ...db.food,
                    {
                      id: crypto.randomUUID(),
                      name: 'Neues Restaurant',
                      city: '',
                      address: '',
                      cuisine: '',
                      reservationUrl: '',
                      pricePerPerson: 20,
                      phone: '',
                      note: '',
                      tags: [],
                    },
                  ],
                });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 font-black"
            >
              <Plus size={18} />
              Restaurant hinzufügen
            </button>
          </div>
        )}

        {/* TAXI */}
        {tab === 'taxis' && (
          <div className="space-y-4">
            {db.taxis.map((taxi, index) => (
              <div
                key={taxi.id}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-black">
                    Taxi #{index + 1}
                  </h2>

                  <button
                    onClick={() => {
                      updateDB({
                        ...db,
                        taxis: db.taxis.filter((t) => t.id !== taxi.id),
                      });
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20 text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid gap-3">
                  <Input
                    label="Taxi Name"
                    value={taxi.name}
                    onChange={(value) => {
                      const updated = [...db.taxis];
                      updated[index].name = value;

                      updateDB({
                        ...db,
                        taxis: updated,
                      });
                    }}
                  />

                  <Input
                    label="Stadt"
                    value={taxi.city}
                    onChange={(value) => {
                      const updated = [...db.taxis];
                      updated[index].city = value;

                      updateDB({
                        ...db,
                        taxis: updated,
                      });
                    }}
                  />

                  <Input
                    label="Preis"
                    value={String(taxi.pricePerPerson)}
                    onChange={(value) => {
                      const updated = [...db.taxis];
                      updated[index].pricePerPerson = Number(value);

                      updateDB({
                        ...db,
                        taxis: updated,
                      });
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                updateDB({
                  ...db,
                  taxis: [
                    ...db.taxis,
                    {
                      id: crypto.randomUUID(),
                      name: 'Neues Taxi',
                      city: '',
                      phone: '',
                      bookingUrl: '',
                      pricePerPerson: 10,
                      note: '',
                      tags: [],
                    },
                  ],
                });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 font-black"
            >
              <Plus size={18} />
              Taxi hinzufügen
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-black transition-all ${
        active
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
          : 'border border-white/10 bg-white/[0.05] text-white/45'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/35">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none focus:border-purple-500"
      />
    </label>
  );
}