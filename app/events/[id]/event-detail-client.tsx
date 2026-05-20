"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Car,
  ChevronRight,
  Clock,
  Flame,
  Heart,
  MapPin,
  Music,
  Navigation,
  Share2,
  Sparkles,
  Star,
  Ticket,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import BottomNav from "@/app/components/bottom-nav";

function safeParseArray(value: string | null): string[] {
  try {
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function EventDetailClient({ event }: { event: any }) {
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const imageSrc = event?.mediaUrl || event?.image || "/events/techno-warehouse.jpg";

  const price = Number(event?.price ?? 0);

  const dateStr = event?.date
    ? new Date(event.date).toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Bald";

  const lineupArr = useMemo(() => {
    return String(event?.lineup ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [event?.lineup]);

  const mapsUrl =
    event?.lat && event?.lng
      ? `https://www.google.com/maps?q=${event.lat},${event.lng}`
      : `https://www.google.com/maps/search/${encodeURIComponent(
          `${event?.location ?? ""} ${event?.city ?? ""}`
        )}`;

  function handleSave() {
    try {
      const eventId = String(event?.id ?? "");
      const savedIds = safeParseArray(localStorage.getItem("vybe_saved_events"));

      const nextSaved = savedIds.includes(eventId)
        ? savedIds.filter((id) => id !== eventId)
        : [...savedIds, eventId];

      localStorage.setItem("vybe_saved_events", JSON.stringify(nextSaved));
      setIsSaved(nextSaved.includes(eventId));
    } catch {
      setIsSaved((value) => !value);
    }
  }

  function handleLike() {
    try {
      const eventId = String(event?.id ?? "");
      const likedIds = safeParseArray(localStorage.getItem("vybe_liked_events"));

      const nextLiked = likedIds.includes(eventId)
        ? likedIds.filter((id) => id !== eventId)
        : [...likedIds, eventId];

      localStorage.setItem("vybe_liked_events", JSON.stringify(nextLiked));
      setIsLiked(nextLiked.includes(eventId));
    } catch {
      setIsLiked((value) => !value);
    }
  }

  async function handleShare() {
    try {
      const currentUrl = typeof window !== "undefined" ? window.location.href : "";

      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: event?.title ?? "NOXEN Event",
          text: `Check mal ${event?.title ?? "dieses Event"} im ${
            event?.clubName ?? "Club"
          } aus.`,
          url: currentUrl,
        });
      } else if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentUrl);
        alert("Link kopiert.");
      }
    } catch {
      return;
    }
  }

  function handleCreatePlan() {
    try {
      const plan = {
        id: `plan-${event?.id ?? Date.now()}`,
        eventId: event?.id,
        title: event?.title,
        date: event?.date,
        startTime: event?.startTime,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("noxen_last_plan", JSON.stringify(plan));
      router.push("/plan");
    } catch {
      router.push("/plan");
    }
  }

  if (!event) {
    return (
      <main className="app-screen bg-[#050509] text-white">
        <div className="flex min-h-dvh items-center justify-center px-6 text-center">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7">
            <h1 className="text-3xl font-black">Event nicht gefunden</h1>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Dieses Event existiert in der Beta gerade nicht oder wurde nicht geladen.
            </p>

            <button
              onClick={() => router.push("/events")}
              className="mt-6 rounded-2xl bg-white px-6 py-4 text-sm font-black text-black"
            >
              Zurück zu Events
            </button>
          </div>
        </div>

        <BottomNav />
      </main>
    );
  }

  return (
    <main className="app-screen bg-[#050509] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.25),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.18),transparent_28%),#050509]" />

      <section className="relative h-[74dvh] min-h-[560px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={event?.title ?? "Event"}
          fill
          className="object-cover"
          priority
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-black/35 to-black/20" />

        <div className="absolute left-4 right-4 top-[calc(env(safe-area-inset-top)+14px)] z-20 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="tap flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/45 text-white backdrop-blur-2xl"
          >
            <ArrowLeft size={21} />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="tap flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/45 text-white backdrop-blur-2xl"
            >
              <Share2 size={19} />
            </button>

            <button
              onClick={handleSave}
              className={`tap flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-2xl ${
                isSaved ? "bg-blue-500 text-white" : "bg-black/45 text-white"
              }`}
            >
              <Bookmark size={19} className={isSaved ? "fill-white" : ""} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="app-container">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38 }}
            >
              <div className="mb-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-black text-white shadow-[0_0_30px_rgba(249,115,22,0.35)]">
                  <Flame size={14} />
                  HOT EVENT
                </div>

                <div className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-black text-white backdrop-blur-xl">
                  {event?.genre ?? "Party"}
                </div>

                <div className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-black text-white backdrop-blur-xl">
                  {price === 0 ? "GRATIS" : `${price.toFixed(0)}€`}
                </div>
              </div>

              <h1 className="text-6xl font-black leading-none tracking-tight text-white drop-shadow-2xl">
                {event?.title ?? "Event"}
              </h1>

              <p className="mt-3 text-2xl font-black text-white/70">
                {event?.clubName ?? "Club"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="app-container -mt-2 pb-36">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-5 grid grid-cols-3 gap-3"
        >
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
            <Star size={17} className="mb-2 fill-white text-white" />
            <p className="text-xl font-black">{event?.heatScore ?? 92}</p>
            <p className="text-xs font-bold text-white/40">Heat</p>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
            <Users size={17} className="mb-2 text-white" />
            <p className="text-xl font-black">{event?.attendees ?? "240+"}</p>
            <p className="text-xs font-bold text-white/40">Leute</p>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
            <Music size={17} className="mb-2 text-white" />
            <p className="text-xl font-black">{event?.genre ?? "Club"}</p>
            <p className="text-xs font-bold text-white/40">Sound</p>
          </div>
        </motion.div>

        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2 text-purple-300">
              <Calendar size={16} />
              <span className="text-xs font-black uppercase tracking-wider">
                Datum
              </span>
            </div>
            <p className="text-sm font-bold leading-6 text-white/80">{dateStr}</p>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2 text-blue-300">
              <Clock size={16} />
              <span className="text-xs font-black uppercase tracking-wider">
                Start
              </span>
            </div>
            <p className="text-sm font-bold leading-6 text-white/80">
              {event?.startTime ?? "22:00"} – {event?.endTime ?? "Open End"}
            </p>
          </div>

          <div className="col-span-2 rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2 text-pink-300">
              <MapPin size={16} />
              <span className="text-xs font-black uppercase tracking-wider">
                Location
              </span>
            </div>
            <p className="text-base font-black text-white">
              {event?.location ?? "Location"} · {event?.city ?? "Köln"}
            </p>
          </div>
        </div>

        <button
          onClick={handleCreatePlan}
          className="tap mb-5 flex w-full items-center justify-center gap-3 rounded-[1.7rem] bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-5 py-5 text-base font-black text-white shadow-[0_0_45px_rgba(236,72,153,0.35)]"
        >
          <Sparkles size={21} />
          Abend automatisch planen
        </button>

        <div className="mb-5 rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-black">
            <Music size={18} className="text-purple-300" />
            Über die Nacht
          </h2>

          <p className="text-base leading-8 text-white/58">
            {event?.description ??
              "Weitere Infos zu diesem Event folgen bald in der Beta."}
          </p>
        </div>

        {lineupArr.length > 0 && (
          <div className="mb-5 rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black">
              <Users size={18} className="text-pink-300" />
              Lineup
            </h2>

            <div className="flex flex-wrap gap-2">
              {lineupArr.map((dj, index) => (
                <span
                  key={`${dj}-${index}`}
                  className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-black text-white/75"
                >
                  {dj}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-5 rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-black">
            <MapPin size={18} className="text-blue-300" />
            Location Check
          </h2>

          <div className="relative mb-4 flex h-44 items-center justify-center overflow-hidden rounded-[1.3rem] bg-white/[0.05]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.22),transparent_45%)]" />
            <div className="relative z-10 text-center">
              <MapPin size={38} className="mx-auto mb-2 text-white/30" />
              <p className="text-sm font-black text-white/60">
                {event?.location ?? "Location"}
              </p>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-black text-black"
          >
            <Navigation size={18} />
            In Maps öffnen
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={event?.ticketUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(clickEvent) => {
              if (!event?.ticketUrl) {
                clickEvent.preventDefault();
                alert("Ticket-Link kommt bald.");
              }
            }}
            className="tap flex items-center justify-center gap-2 rounded-[1.4rem] bg-white px-4 py-4 text-sm font-black text-black"
          >
            <Ticket size={18} />
            Tickets
          </a>

          <button
            onClick={handleLike}
            className={`tap flex items-center justify-center gap-2 rounded-[1.4rem] border border-white/10 px-4 py-4 text-sm font-black ${
              isLiked
                ? "bg-pink-500 text-white"
                : "bg-white/[0.06] text-white backdrop-blur-xl"
            }`}
          >
            <Heart size={18} className={isLiked ? "fill-white" : ""} />
            {isLiked ? "Geliked" : "Liken"}
          </button>

          <button
            onClick={() => router.push("/food")}
            className="tap flex items-center justify-center gap-2 rounded-[1.4rem] border border-white/10 bg-white/[0.06] px-4 py-4 text-sm font-black text-white backdrop-blur-xl"
          >
            <UtensilsCrossed size={18} />
            Food
          </button>

          <button
            onClick={() => router.push("/taxi")}
            className="tap flex items-center justify-center gap-2 rounded-[1.4rem] border border-white/10 bg-white/[0.06] px-4 py-4 text-sm font-black text-white backdrop-blur-xl"
          >
            <Car size={18} />
            Taxi
          </button>
        </div>

        <button
          onClick={() => router.push("/events")}
          className="tap mt-5 flex w-full items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-black text-white/75 backdrop-blur-xl"
        >
          Mehr Events entdecken
          <ChevronRight size={18} />
        </button>
      </section>

      <BottomNav />
    </main>
  );
}