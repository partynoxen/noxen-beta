'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  Car,
  Clock,
  Flame,
  Map,
  MessageCircle,
  Send,
  ShieldAlert,
  Sparkles,
  Utensils,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';
import { loadDB, type EventItem, type FoodItem, type TaxiItem } from '@/lib/data-store';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const starterQuestions = [
  'Was geht heute in Köln?',
  'Plan mir einen wilden Abend',
  'Ich will günstig feiern',
  'Ich brauche Safe Heimweg',
];

export default function AssistantPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [food, setFood] = useState<FoodItem[]>([]);
  const [taxis, setTaxis] = useState<TaxiItem[]>([]);
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Yo, ich bin dein VYBE Assistant. Sag mir kurz, worauf du heute Bock hast: Techno, Hip Hop, chillig, eskalieren, günstig oder Premium.',
    },
  ]);

  useEffect(() => {
    const db = loadDB();
    setEvents(db.events || []);
    setFood(db.food || []);
    setTaxis(db.taxis || []);
  }, []);

  const bestEvent = useMemo(() => events[0] || null, [events]);
  const bestFood = useMemo(() => food[0] || null, [food]);
  const bestTaxi = useMemo(() => taxis[0] || null, [taxis]);

  const sendMessage = (custom?: string) => {
    const text = (custom || input).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text,
    };

    const answer: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: generateAnswer(text, bestEvent, bestFood, bestTaxi),
    };

    setMessages((prev) => [...prev, userMessage, answer]);
    setInput('');
  };

  const startPlan = () => {
    if (bestEvent) {
      localStorage.setItem('vybe_selected_plan_event', bestEvent.id);
    }

    window.location.href = '/plan';
  };

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="mx-auto max-w-5xl">
        <section className="mb-6 rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-purple-700/30 via-pink-600/20 to-blue-700/15 p-6 shadow-[0_0_80px_rgba(168,85,247,0.16)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-purple-300">
                VYBE ASSISTANT
              </p>

              <h1 className="text-5xl font-black leading-none">
                Dein Party-Coach.
              </h1>
            </div>

            <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10">
              <Bot size={32} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            Frag nach Events, Essen, Taxi, Budget oder Safe Heimweg. Für die Demo läuft der Assistant lokal mit smarter Logik.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
          <main className="vybe-card p-4">
            <div className="mb-4 flex flex-wrap gap-2">
              {starterQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black text-white/60 active:scale-[0.98]"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="mb-4 max-h-[520px] space-y-4 overflow-y-auto rounded-[1.8rem] bg-black/25 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-white'
                        : 'border border-white/10 bg-white/[0.06] text-white/70'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') sendMessage();
                }}
                placeholder="Frag deinen Party-Coach..."
                className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/35 px-4 text-sm font-bold text-white outline-none placeholder:text-white/25"
              />

              <button
                onClick={() => sendMessage()}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              >
                <Send size={20} />
              </button>
            </div>
          </main>

          <aside className="space-y-4">
            <div className="vybe-card vybe-border p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
                  <Sparkles size={24} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                    Empfehlung
                  </p>

                  <h2 className="text-xl font-black">
                    {bestEvent?.title || 'Noch kein Event'}
                  </h2>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-white/45">
                {bestEvent
                  ? `${bestEvent.clubName} in ${bestEvent.city}. Danach Essen bei ${bestFood?.name || 'einem Food Spot'} und Heimweg mit ${bestTaxi?.name || 'Taxi'}.`
                  : 'Lege Events im Mitarbeiterbereich an.'}
              </p>

              <button
                onClick={startPlan}
                className="vybe-button flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black"
              >
                <Map size={18} />
                Diesen Abend planen
              </button>
            </div>

            <QuickAction href="/events" icon={<Flame />} title="Events" text="Alle Partys öffnen" />
            <QuickAction href="/food" icon={<Utensils />} title="Food" text="Essen finden" />
            <QuickAction href="/taxi" icon={<Car />} title="Taxi" text="Heimweg sichern" />
            <QuickAction href="/drunk" icon={<ShieldAlert />} title="Safe Mode" text="Drunk Mode öffnen" />
          </aside>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function generateAnswer(
  text: string,
  event: EventItem | null,
  food: FoodItem | null,
  taxi: TaxiItem | null
) {
  const lower = text.toLowerCase();

  if (lower.includes('günstig') || lower.includes('billig') || lower.includes('low')) {
    return `Dann würde ich low-budget gehen: ${event?.title || 'ein günstiges Event'} checken, vorher etwas Schnelles essen und Taxi-Kosten in der Gruppe splitten. Wichtig: Geld nicht komplett im Club verbrennen, du Finanzgenie auf dünnem Eis.`;
  }

  if (lower.includes('safe') || lower.includes('heim') || lower.includes('taxi')) {
    return `Safe Plan: Heimweg vorher klären. Nimm ${taxi?.name || 'ein Taxi'}, teile deinen Standort im Drunk Mode und speicher dir 1–2 Notfallkontakte. Kein Held spielen, Bruder.`;
  }

  if (lower.includes('wild') || lower.includes('eskal') || lower.includes('zerstör')) {
    return `Wild Mode aktiviert: ${event?.title || 'das stärkste Event'} wäre mein Pick. Vorher ${food?.name || 'Food Spot'} zum Stabilisieren, danach direkt Plan speichern und Taxi ready machen. Eskalation mit Struktur — gefährliche Kombi.`;
  }

  if (lower.includes('köln')) {
    return `Für Köln würde ich aktuell ${event?.title || 'ein Club-Event'} nehmen. Kombi: Event + Food + Taxi vorher planen. Das wirkt direkt wie ein Abend mit Regie statt Chaos-Doku.`;
  }

  return `Mein Vorschlag: ${event?.title || 'Event'} als Main Move, vorher ${food?.name || 'Food Spot'} und Heimweg über ${taxi?.name || 'Taxi'}. Klick auf „Diesen Abend planen“ und VYBE baut dir daraus die Timeline.`;
}

function QuickAction({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link href={href} className="vybe-card flex items-center gap-4 p-4 active:scale-[0.99]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-purple-300">
        {icon}
      </div>

      <div>
        <h3 className="font-black">{title}</h3>
        <p className="mt-1 text-sm text-white/40">{text}</p>
      </div>
    </Link>
  );
}