'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Clock3,
  Users,
  Car,
  Utensils,
  Copy,
  Save,
  Sparkles,
  Wallet,
  Route,
} from 'lucide-react';

import { motion } from 'framer-motion';

import BottomNav from '../components/bottom-nav';
import MotionCard from '../components/motion-card';

import {
  loadDB,
  type EventItem,
  type FoodItem,
  type TaxiItem,
} from '@/lib/data-store';

import { STORAGE_KEYS } from '@/lib/storage-keys';

type TimelineStep = {
  time: string;
  title: string;
  text: string;
};

export default function PlanPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [food, setFood] = useState<FoodItem[]>([]);
  const [taxis, setTaxis] = useState<TaxiItem[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedTaxi, setSelectedTaxi] = useState<TaxiItem | null>(null);

  const [persons, setPersons] = useState(4);
  const [meetingTime, setMeetingTime] = useState('18:30');
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    const db = loadDB();

    setEvents(db.events || []);
    setFood(db.food || []);
    setTaxis(db.taxis || []);

    const selectedPlanEvent = localStorage.getItem(STORAGE_KEYS.selectedPlanEvent);

    const foundEvent =
      db.events.find((event) => event.id === selectedPlanEvent) ||
      db.events[0] ||
      null;

    setSelectedEvent(foundEvent);
    setSelectedFood(db.food[0] || null);
    setSelectedTaxi(db.taxis[0] || null);
  }, []);

  const timeline = useMemo<TimelineStep[]>(() => {
    const eventStart = selectedEvent?.startTime || '23:00';
    const eventEnd = selectedEvent?.endTime || '06:00';

    return [
      {
        time: meetingTime,
        title: 'Treffen',
        text: 'Treffpunkt festlegen, Gruppe sammeln und kurz abstimmen.',
      },
      {
        time: addMinutes(meetingTime, 30),
        title: `Essen bei ${selectedFood?.name || 'Restaurant'}`,
        text: selectedFood?.note || 'Gemeinsam essen vor dem Feiern.',
      },
      {
        time: addMinutes(eventStart, -40),
        title: `${selectedTaxi?.name || 'Taxi'} bestellen`,
        text: 'Fahrt zum Club organisieren und genug Puffer einplanen.',
      },
      {
        time: eventStart,
        title: selectedEvent?.title || 'Event',
        text: `${selectedEvent?.location || ''} · ${
          selectedEvent?.description || 'Party starten.'
        }`,
      },
      {
        time: eventEnd,
        title: 'Heimweg',
        text: `Rückfahrt mit ${selectedTaxi?.name || 'Taxi'} organisieren.`,
      },
    ].sort((a, b) => timeToSortValue(a.time) - timeToSortValue(b.time));
  }, [meetingTime, selectedEvent, selectedFood, selectedTaxi]);

  const totalPrice =
    Number(selectedEvent?.price || 0) +
    Number(selectedFood?.pricePerPerson || 0) +
    Number(selectedTaxi?.pricePerPerson || 0);

  const groupPrice = totalPrice * persons;

  const copyPlan = async () => {
    const text = [
      `NOXEN Plan: ${selectedEvent?.title || 'Partyabend'}`,
      '',
      ...timeline.map((step) => `${step.time} – ${step.title}: ${step.text}`),
      '',
      `Gesamt p. P.: ${totalPrice.toFixed(2)} €`,
      `Gruppe gesamt: ${groupPrice.toFixed(2)} €`,
    ].join('\n');

    await navigator.clipboard.writeText(text);
    alert('Plan kopiert.');
  };

  const savePlan = () => {
    const existing = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.savedPlans) || '[]'
    );

    const plan = {
      id: crypto.randomUUID(),
      title: `${selectedEvent?.title || 'Partyabend'} Plan`,
      eventTitle: selectedEvent?.title || 'Event',
      persons,
      totalPrice,
      createdAt: new Date().toISOString(),
      steps: timeline,
    };

    localStorage.setItem(
      STORAGE_KEYS.savedPlans,
      JSON.stringify([plan, ...existing])
    );

    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="pointer-events-none fixed left-[-120px] top-[-120px] z-0 h-[320px] w-[320px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-[-140px] right-[-140px] z-0 h-[360px] w-[360px] rounded-full bg-pink-600/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <MotionCard delay={0}>
          <section className="mb-6 rounded-[2.3rem] border border-white/10 bg-gradient-to-br from-purple-700/30 via-pink-600/20 to-blue-700/15 p-6 shadow-[0_0_90px_rgba(168,85,247,0.16)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-purple-300">
                  NOXEN PLAN
                </p>

                <h1 className="text-5xl font-black leading-none">
                  Dein Abend. Kein Chaos.
                </h1>
              </div>

              <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10">
                <Route size={32} />
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-white/55">
              Event, Essen, Taxi und Heimweg automatisch zu einer sauberen Timeline verbinden.
            </p>
          </section>
        </MotionCard>

        {savedFlash && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mb-5 rounded-[1.7rem] border border-green-500/20 bg-green-500/10 px-5 py-4 text-sm font-black text-green-300"
          >
            Plan gespeichert. Du findest ihn unter „Pläne“.
          </motion.div>
        )}

        <div className="grid gap-6 xl:grid-cols-[380px_1fr_330px]">
          <MotionCard delay={0.08}>
            <aside className="vybe-card p-5">
              <h2 className="mb-6 text-2xl font-black">Plan einstellen</h2>

              <SelectBox
                label="Event"
                value={selectedEvent?.id || ''}
                onChange={(value) => {
                  const found = events.find((event) => event.id === value) || null;
                  setSelectedEvent(found);
                }}
                options={events.map((event) => ({
                  value: event.id,
                  label: `${event.title} · ${event.date}`,
                }))}
              />

              <div className="mb-5 grid grid-cols-2 gap-3">
                <NumberInput
                  label="Personen"
                  value={persons}
                  onChange={setPersons}
                />

                <TimeInput
                  label="Treffen"
                  value={meetingTime}
                  onChange={setMeetingTime}
                />
              </div>

              <SelectBox
                label="Essen vorher"
                value={selectedFood?.id || ''}
                onChange={(value) => {
                  const found = food.find((item) => item.id === value) || null;
                  setSelectedFood(found);
                }}
                options={food.map((item) => ({
                  value: item.id,
                  label: `${item.name} · ${item.cuisine}`,
                }))}
              />

              <SelectBox
                label="Taxi / Fahrt"
                value={selectedTaxi?.id || ''}
                onChange={(value) => {
                  const found = taxis.find((taxi) => taxi.id === value) || null;
                  setSelectedTaxi(found);
                }}
                options={taxis.map((taxi) => ({
                  value: taxi.id,
                  label: `${taxi.name} · ${taxi.city}`,
                }))}
              />

              <div className="mt-6 rounded-[1.7rem] border border-purple-500/20 bg-purple-500/10 p-4">
                <div className="mb-2 flex items-center gap-2 text-purple-300">
                  <Sparkles size={18} />

                  <p className="text-xs font-black uppercase tracking-[0.18em]">
                    Smart Planung
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-white/50">
                  NOXEN berechnet Essen, Fahrt, Eventstart und Heimweg automatisch aus deinen Daten.
                </p>
              </div>
            </aside>
          </MotionCard>

          <MotionCard delay={0.14}>
            <main className="vybe-card p-5">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-white/35">
                    LIVE TIMELINE
                  </p>

                  <h2 className="text-4xl font-black leading-none">
                    {selectedEvent?.title || 'Kein Event gewählt'}
                  </h2>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={copyPlan}
                    className="flex h-14 items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-5 text-sm font-black shadow-[0_0_35px_rgba(168,85,247,0.25)]"
                  >
                    <Copy size={18} />
                    Kopieren
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={savePlan}
                    className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-5 text-sm font-black"
                  >
                    <Save size={18} />
                    Speichern
                  </motion.button>
                </div>
              </div>

              <div className="mb-5 grid gap-3 md:grid-cols-3">
                <MiniCard
                  icon={<Calendar size={18} />}
                  title="Event"
                  value={selectedEvent?.clubName || '-'}
                />

                <MiniCard
                  icon={<Utensils size={18} />}
                  title="Essen"
                  value={selectedFood?.name || '-'}
                />

                <MiniCard
                  icon={<Car size={18} />}
                  title="Taxi"
                  value={selectedTaxi?.name || '-'}
                />
              </div>

              <div className="relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'calc(100% - 32px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[39px] top-4 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-transparent"
                />

                {timeline.map((step, index) => (
                  <TimelineCard
                    key={`${step.time}-${step.title}`}
                    index={index + 1}
                    time={step.time}
                    title={step.title}
                    text={step.text}
                    delay={0.2 + index * 0.08}
                  />
                ))}
              </div>
            </main>
          </MotionCard>

          <MotionCard delay={0.2}>
            <aside className="vybe-card p-5">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-purple-300">
                  <Wallet size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-black">Budget</h2>
                  <p className="text-sm text-white/40">pro Person & Gruppe</p>
                </div>
              </div>

              <div className="space-y-3">
                <PriceRow
                  label="Ticket p. P."
                  value={`${Number(selectedEvent?.price || 0).toFixed(2)} €`}
                />

                <PriceRow
                  label="Essen p. P."
                  value={`${Number(selectedFood?.pricePerPerson || 0).toFixed(2)} €`}
                />

                <PriceRow
                  label="Taxi p. P."
                  value={`${Number(selectedTaxi?.pricePerPerson || 0).toFixed(2)} €`}
                />
              </div>

              <motion.div
                key={totalPrice}
                initial={{ scale: 0.96, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="mt-6 rounded-[1.8rem] bg-gradient-to-br from-purple-600/25 to-pink-600/15 p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
                  Gesamt p. P.
                </p>

                <p className="mt-2 text-4xl font-black">
                  {totalPrice.toFixed(2)} €
                </p>

                <p className="mt-2 text-sm text-white/45">
                  Gruppe gesamt: {groupPrice.toFixed(2)} €
                </p>
              </motion.div>

              <div className="mt-5 rounded-[1.7rem] border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                  Demo Hint
                </p>

                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  Perfekt zum Zeigen: Event auswählen, Budget sehen, speichern, kopieren.
                </p>
              </div>
            </aside>
          </MotionCard>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function addMinutes(time: string, minutes: number) {
  const [hoursRaw, minutesRaw] = time.split(':').map(Number);

  const date = new Date();
  date.setHours(Number.isFinite(hoursRaw) ? hoursRaw : 0);
  date.setMinutes((Number.isFinite(minutesRaw) ? minutesRaw : 0) + minutes);

  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}

function timeToSortValue(time: string) {
  const [hoursRaw, minutesRaw] = time.split(':').map(Number);

  let hours = Number.isFinite(hoursRaw) ? hoursRaw : 0;
  const minutes = Number.isFinite(minutesRaw) ? minutesRaw : 0;

  if (hours < 12) hours += 24;

  return hours * 60 + minutes;
}

function SelectBox({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-16 w-full rounded-2xl border border-white/10 bg-black/30 px-5 text-sm font-bold text-white outline-none"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-black text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">
        {label}
      </label>

      <div className="relative">
        <Users
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        />

        <input
          type="number"
          min={1}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-16 w-full rounded-2xl border border-white/10 bg-black/30 pl-12 pr-4 text-sm font-bold text-white outline-none"
        />
      </div>
    </div>
  );
}

function TimeInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">
        {label}
      </label>

      <div className="relative">
        <Clock3
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        />

        <input
          type="time"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-16 w-full rounded-2xl border border-white/10 bg-black/30 pl-12 pr-4 text-sm font-bold text-white outline-none"
        />
      </div>
    </div>
  );
}

function MiniCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="rounded-[1.7rem] border border-white/10 bg-black/25 p-5"
    >
      <div className="mb-4 text-purple-300">
        {icon}
      </div>

      <p className="text-sm text-white/35">
        {title}
      </p>

      <p className="mt-2 truncate text-xl font-black">
        {value}
      </p>
    </motion.div>
  );
}

function TimelineCard({
  time,
  title,
  text,
  index,
  delay,
}: {
  time: string;
  title: string;
  text: string;
  index: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.42,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mb-4 grid grid-cols-[80px_1fr] gap-4"
    >
      <motion.div
        whileTap={{ scale: 0.94 }}
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-purple-600 to-pink-600 text-xl font-black shadow-[0_0_30px_rgba(168,85,247,0.25)]"
      >
        {time}
      </motion.div>

      <div className="rounded-[1.8rem] border border-white/10 bg-black/25 p-4">
        <p className="mb-1 text-xs font-black uppercase tracking-[0.16em] text-purple-300">
          Step {index}
        </p>

        <h3 className="text-2xl font-black">
          {title}
        </h3>

        <p className="mt-2 text-white/55">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-between rounded-2xl bg-black/25 px-4 py-3 text-lg"
    >
      <span className="text-white/55">
        {label}
      </span>

      <span className="font-black">
        {value}
      </span>
    </motion.div>
  );
}