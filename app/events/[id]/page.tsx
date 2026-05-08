// @ts-nocheck

import EventDetailClient from "./event-detail-client";
import { getDemoDB } from "@/lib/data-store";

export function generateStaticParams() {
  const db = getDemoDB();

  if (!db || !Array.isArray(db.events)) {
    return [];
  }

  return db.events.map((event) => ({
    id: String(event.id),
  }));
}

export default function EventDetailPage({ params }) {
  const db = getDemoDB();

  const event =
    db?.events?.find((item) => String(item.id) === String(params.id)) ?? null;

  return <EventDetailClient event={event} />;
}