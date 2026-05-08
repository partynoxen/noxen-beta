import { getDemoDB } from "@/lib/data-store";
import EventsClient from "./events-client";

export default function EventsPage() {
  const events = getDemoDB().events;

  return <EventsClient events={events} />;
}