import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const fallbackEvents = [
  {
    id: '1',
    title: 'Neon Nights: Techno Marathon',
    clubName: 'Bootshaus',
    city: 'koeln',
    location: 'Bootshaus Köln',
    genre: 'TECHNO',
    date: '2026-05-03',
    startTime: '23:00',
    endTime: '06:00',
    price: 18,
    ticketUrl: '',
    mediaUrl: '',
    description: 'Eine intensive Techno-Nacht mit Neon-Vibes, Bass und Eskalation.',
    lineup: 'Resident DJs, Special Guests',
    heatScore: 88,
    lat: null,
    lng: null,
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const event =
    fallbackEvents.find((item) => item.id === params.id) ?? fallbackEvents[0];

  return NextResponse.json(event);
}