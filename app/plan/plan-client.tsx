'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Car,
  Copy,
  ExternalLink,
  MapPin,
  Ticket,
  Utensils,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import { loadDB, type VybeDB } from '@/lib/data-store';

type PlanStep = {
  id: string;
  time: string;
  title: string;
  description: string;
};

export default function PlanClient() {
  const [db, setDb] = useState<VybeDB | null>(null);
  const [eventId, setEventId] = useState('');
  const [foodId, setFoodId] = useState('');
  const [taxiId, setTaxiId] = useState('');
  const [people, setPeople] = useState(4);
  const [meetTime, setMeetTime] = useState('18:30');

  useEffect(() => {
    const data = loadDB();
    setDb(data);
    setEventId(data.events[0]?.id ?? '');
    setFoodId(data.food[0]?.id ?? '');
    setTaxiId(data.taxis[0]?.id ?? '');
  }, []);

  const event = db?.events.find((item) => item.id === eventId);
  const food = db?.food.find((item) => item.id === foodId);
  const taxi = db?.taxis.find((item) => item.id === taxiId);

  const plan = useMemo<PlanStep[]>(() => {
    if (!event) return [];

    return [
      {
        id: 'meet',
        time: meetTime,
        title: 'Treffen',
        description: 'Treffpunkt festlegen, Gruppe sammeln und kurz abstimmen.',
      },
      {
        id: 'food',
        time: addMinutes(meetTime, 30),
        title: food ? `Essen bei ${food.name}` : 'Essen planen',
        description: food
          ? `${food.cuisine}. ${food.note || 'Vorher entspannt essen gehen.'}`
          : 'Food Spot auswählen.',
      },
      {
        id: 'taxi-to-event',
        time: addMinutes(event.startTime || '22:00', -40),
        title: taxi ? `${taxi.name} bestellen` : 'Fahrt zur Party',
        description: taxi
          ? `${taxi.note || 'Taxi / Fahrt rechtzeitig planen.'}`
          : 'Taxi oder Route zur Location planen.',
      },
      {
        id: 'event',
        time: event.startTime || '22:00',
        title: event.title,
        description: `${event.clubName} · ${event.location}. ${event.notes || event.description}`,
      },
      {
        id: 'home',
        time: event.endTime || '02:00',
        title: 'Heimweg',
        description: taxi
          ? `Rückfahrt mit ${taxi.name} vormerken oder spontan anrufen.`
          : 'Rückfahrt organisieren.',
      },
    ].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
  }, [event, food, taxi, meetTime]);

  const ticketPrice = Number(event?.price ?? 0);
  const foodPrice = Number(food?.pricePerPerson ?? 0);
  const taxiPrice = Number(taxi?.pricePerPerson ?? 0);
  const totalPerPerson = ticketPrice + foodPrice + taxiPrice;

  const copyPlan = async () => {
    const text = [
      `VYBE Abendplan: ${event?.title ?? 'Partyabend'}`,
      '',
      ...plan.map((step) => `${step.time} – ${step.title}: ${step.description}`),
      '',
      `Kosten p. P.: ${totalPerPerson.toFixed(2)} €`,
      `Personen: ${people}`,
    ].join('\n');

    await navigator.clipboard.writeText(text);
    alert('Plan kopiert.');
  };

  if (!db) {
    return (
      <div className="min-h-screen bg-[#050509] text-white flex items-center justify-center">
        Lade Planer...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-32 pt-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-purple-300">
            VYBE Abendplaner
          </p>
          <h1 className="text-3xl font-black leading-tight">
            Dein Abend. Kein Chaos.
          </h1>
          <p className="mt-2 text-sm text-white/45">
            Wähle Event, Essen und Taxi. VYBE baut dir daraus den Plan.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[320px_1fr_280px]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
            <h2 className="mb-4 text-lg font-black">Plan einstellen</h2>

            <Select
              label="Event"
              value={eventId}
              options={db.events.map((item) => ({
                id: item.id,
                label: `${item.title} · ${item.date}`,
              }))}
              onChange={setEventId}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Personen"
                type="number"
                value={String(people)}
                onChange={(value) => setPeople(Number(value))}
              />

              <Input
                label="Treffen"
                type="time"
                value={meetTime}
                onChange={setMeetTime}
              />
            </div>

            <Select
              label="Essen vorher"
              value={foodId}
              options={db.food.map((item) => ({
                id: item.id,
                label: `${item.name} · ${item.cuisine}`,
              }))}
              onChange={setFoodId}
            />

            <Select
              label="Taxi / Fahrt"
              value={taxiId}
              options={db.taxis.map((item) => ({
                id: item.id,
                label: `${item.name} · ${item.city}`,
              }))}
              onChange={setTaxiId}
            />
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                  Live Vorschau
                </p>
                <h2 className="mt-1 text-2xl font-black">
                  {event?.title ?? 'Dein Partyabend'}
                </h2>
              </div>

              <button
                onClick={copyPlan}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-xs font-black"
              >
                <Copy size={15} />
                Kopieren
              </button>
            </div>

            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              <MiniCard icon={<Ticket size={16} />} label="Event" value={event?.clubName ?? '-'} />
              <MiniCard icon={<Utensils size={16} />} label="Essen" value={food?.name ?? '-'} />
              <MiniCard icon={<Car size={16} />} label="Taxi" value={taxi?.name ?? '-'} />
            </div>

            <div className="space-y-3">
              {plan.map((step) => (
                <div
                  key={step.id}
                  className="grid grid-cols-[70px_1fr] gap-3 rounded-3xl border border-white/10 bg-black/35 p-3"
                >
                  <div className="flex h-full min-h-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-sm font-black">
                    {step.time}
                  </div>

                  <div className="min-w-0 py-1">
                    <h3 className="font-black leading-tight">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
            <h2 className="mb-4 text-lg font-black">Buchen</h2>

            <ActionLink
              label="Tickets buchen"
              href={event?.ticketUrl}
              fallback="Kein Ticket-Link"
            />

            <ActionLink
              label="Veranstalter öffnen"
              href={event?.organizerUrl}
              fallback={event?.organizerName || 'Kein Veranstalter-Link'}
            />

            <ActionLink
              label="Tisch reservieren"
              href={food?.reservationUrl}
              fallback={food?.phone || 'Keine Reservierung'}
            />

            <ActionLink
              label="Taxi buchen"
              href={taxi?.bookingUrl}
              fallback={taxi?.phone || 'Keine Taxi-Option'}
            />

            <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
              <BudgetLine label="Ticket p. P." value={ticketPrice} />
              <BudgetLine label="Essen p. P." value={foodPrice} />
              <BudgetLine label="Taxi p. P." value={taxiPrice} />

              <div className="flex items-center justify-between pt-3 text-lg font-black">
                <span>Gesamt p. P.</span>
                <span>{totalPerPerson.toFixed(2)} €</span>
              </div>

              <div className="text-xs text-white/35">
                Gruppe gesamt: {(totalPerPerson * people).toFixed(2)} €
              </div>
            </div>
          </aside>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-white/35">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm font-bold text-white outline-none focus:border-purple-400"
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-white/35">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm font-bold text-white outline-none focus:border-purple-400"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function MiniCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
      <div className="mb-2 text-purple-300">{icon}</div>
      <p className="text-xs text-white/35">{label}</p>
      <p className="truncate text-sm font-black">{value}</p>
    </div>
  );
}

function BudgetLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm text-white/65">
      <span>{label}</span>
      <span className="font-bold text-white">{value.toFixed(2)} €</span>
    </div>
  );
}

function ActionLink({
  label,
  href,
  fallback,
}: {
  label: string;
  href?: string;
  fallback: string;
}) {
  if (!href) {
    return (
      <div className="mb-3 rounded-2xl border border-white/10 bg-black/35 p-3">
        <p className="text-sm font-black">{label}</p>
        <p className="mt-1 text-xs text-white/40">{fallback}</p>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-3 text-sm font-black"
    >
      {label}
      <ExternalLink size={15} className="text-purple-300" />
    </a>
  );
}

function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(Number.isFinite(h) ? h : 0);
  date.setMinutes((Number.isFinite(m) ? m : 0) + minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return (Number.isFinite(h) ? h : 0) * 60 + (Number.isFinite(m) ? m : 0);
}