"use client";

import Link from "next/link";
import {
  Flame,
  MapPin,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Neon District",
    city: "Köln",
    location: "Bootshaus",
    time: "Samstag · 23:00",
    heat: "98%",
    attendees: "328",
  },
  {
    id: 2,
    title: "Midnight Ritual",
    city: "Saarbrücken",
    location: "Garage Club",
    time: "Freitag · 22:30",
    heat: "91%",
    attendees: "214",
  },
  {
    id: 3,
    title: "Black Echo",
    city: "Düren",
    location: "Nox Hall",
    time: "Heute · 00:00",
    heat: "95%",
    attendees: "402",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black text-white pb-32">
      <div className="px-5 pt-10">
        <p className="text-pink-500 tracking-[0.4em] text-xs mb-3">
          NOXEN
        </p>

        <h1 className="text-5xl font-bold mb-2">
          Live Events
        </h1>

        <p className="text-white/50 mb-10">
          Discover where nightlife is exploding tonight.
        </p>

        <div className="space-y-6">
          {events.map((event) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
            >
              <div className="rounded-[32px] overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.01]">

                <div className="h-64 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 relative">

                  <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-pink-400" />
                    <span className="text-sm">
                      HOT NIGHT
                    </span>
                  </div>

                  <div className="absolute top-5 right-5 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-full px-4 py-2 text-sm font-semibold">
                    {event.heat}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-4xl font-bold mb-2">
                      {event.title}
                    </h2>

                    <p className="text-white/70 text-lg">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="p-6">

                  <div className="flex items-center gap-5 text-white/60 mb-5">

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.city}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-white text-lg font-semibold">
                        {event.attendees} people going
                      </p>

                      <p className="text-white/40 text-sm">
                        Trending right now
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center">
                      <ChevronRight />
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/80 backdrop-blur-2xl">
        <div className="flex items-center justify-around py-5 text-sm text-white/70">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/swipe">Swipe</Link>
          <Link href="/food">Food</Link>
          <Link href="/taxi">Taxi</Link>
        </div>
      </nav>
    </main>
  );
}