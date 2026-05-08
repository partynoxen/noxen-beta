import { NextResponse } from 'next/server';

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
  {
    id: '2',
    title: 'Bass & Shots',
    clubName: 'Musikbunker',
    city: 'aachen',
    location: 'Musikbunker Aachen',
    genre: 'HIPHOP',
    date: '2026-05-04',
    startTime: '22:30',
    endTime: '05:00',
    price: 12,
    ticketUrl: '',
    mediaUrl: '',
    description: 'HipHop, Bass und Club-Vibes bis tief in die Nacht.',
    lineup: 'Local DJs',
    heatScore: 76,
    lat: null,
    lng: null,
  },
  {
    id: '3',
    title: 'Düren After Dark',
    clubName: 'Club Düren',
    city: 'dueren',
    location: 'Düren Zentrum',
    genre: 'MIXED',
    date: '2026-05-05',
    startTime: '21:00',
    endTime: '03:00',
    price: 8,
    ticketUrl: '',
    mediaUrl: '',
    description: 'Der Abend für alle, die spontan raus wollen.',
    lineup: 'VYBE Residents',
    heatScore: 64,
    lat: null,
    lng: null,
  },
];

export async function GET() {
  return NextResponse.json(fallbackEvents);
}