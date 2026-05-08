"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Flame,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";

import BottomNav from "@/app/components/bottom-nav";

export default function EventsClient({
  events,
}: {
  events: any[];
}) {
  const router = useRouter();

  return (
    <main className="app-screen">
      <div className="app-container pb-32">
        <div className="pt-16">
          <div className="mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-purple-400">
              NOXEN EVENTS
            </p>

            <h1 className="text-5xl font-black tracking-tight text-white">
              Discover
            </h1>

            <p className="mt-4 text-lg leading-7 text-white/60">
              Die heißesten Events, Clubs und Eskalationen der Nacht.
            </p>
          </div>

          <div className="space-y-5">
            {events.map((event, index) => (
              <motion.button
                key={event.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                }}
                onClick={() => router.push(`/events/${event.id}`)}
                className="tap w-full overflow-hidden rounded-[2rem] bg-[#0d0d14] text-left"
              >
                <div className="relative h-[260px] w-full overflow-hidden">
                  <Image
                    src={event.mediaUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-orange-500/90 px-3 py-2 text-xs font-black text-white backdrop-blur-xl">
                    <Flame size={14} />
                    HOT
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-4xl font-black tracking-tight text-white">
                      {event.title}
                    </h2>

                    <p className="mt-1 text-lg font-bold text-white/70">
                      {event.clubName}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-5 flex flex-wrap gap-3">
                    <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3">
                      <MapPin size={16} />
                      <span className="text-sm font-bold">
                        {event.city}
                      </span>
                    </div>

                    <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3">
                      <Calendar size={16} />
                      <span className="text-sm font-bold">
                        {event.date}
                      </span>
                    </div>

                    <div className="glass rounded-2xl px-4 py-3">
                      <span className="text-sm font-black">
                        {event.price}€
                      </span>
                    </div>
                  </div>

                  <p className="line-clamp-2 text-base leading-7 text-white/60">
                    {event.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="rounded-full bg-purple-600 px-4 py-2 text-sm font-black text-white">
                      {event.genre}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-black text-white">
                      Öffnen
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}