import { STORAGE_KEYS } from '@/lib/storage-keys';

export type EventItem = {
  id: string;
  title: string;
  clubName: string;
  city: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  genre: string;
  description: string;
  mediaUrl: string;
  price: number;
  ticketUrl?: string;
  organizerUrl?: string;
  organizerName?: string;
  notes?: string;
  tags: string[];
};

export type FoodItem = {
  id: string;
  name: string;
  city: string;
  address: string;
  cuisine: string;
  note: string;
  reservationUrl?: string;
  phone?: string;
  pricePerPerson: number;
  tags: string[];
};

export type TaxiItem = {
  id: string;
  name: string;
  city: string;
  phone: string;
  bookingUrl?: string;
  pricePerPerson: number;
  note: string;
  tags: string[];
};

export type VybeDB = {
  events: EventItem[];
  food: FoodItem[];
  taxis: TaxiItem[];
};

const OLD_KEYS = {
  database: 'vybe_database',
  databaseAlt: 'vybe_db',
  uploadedEvents: 'vybe_uploaded_events',
};

const demoDB: VybeDB = {
  events: [
    {
      id: 'bootshaus-blackout',
      title: 'BLACKOUT',
      clubName: 'Bootshaus',
      city: 'Köln',
      location: 'Auenweg 173',
      date: '2026-05-15',
      startTime: '23:00',
      endTime: '06:00',
      genre: 'TECHNO',
      description:
        'Massiver Techno Abend mit Peak-Time Sets, Visuals und komplett eskalierender Mainstage.',
      mediaUrl:
        'https://images.unsplash.com/photo-1571266028243-d220c9f0c3b4?q=80&w=1600&auto=format&fit=crop',
      price: 24,
      ticketUrl: 'https://bootshaus.tv',
      organizerUrl: 'https://bootshaus.tv',
      organizerName: 'Bootshaus',
      notes: 'Einlass ab 18. Demo-Daten für die Testphase.',
      tags: ['Techno', 'Rave', 'Hard Techno'],
    },
    {
      id: 'nachtflug-hype',
      title: 'HYPE',
      clubName: 'Nachtflug',
      city: 'Köln',
      location: 'Hohenzollernring 89',
      date: '2026-05-17',
      startTime: '22:30',
      endTime: '05:30',
      genre: 'HIP HOP',
      description:
        'Hip Hop, Afrobeats und volle Dancefloors bis morgens.',
      mediaUrl:
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop',
      price: 18,
      ticketUrl: 'https://nachtflug.com',
      organizerUrl: 'https://nachtflug.com',
      organizerName: 'Nachtflug',
      notes: 'Demo-Daten für die Testphase.',
      tags: ['Hip Hop', 'Afrobeats', 'Club'],
    },
    {
      id: 'duren-factory-night',
      title: 'FACTORY NIGHT',
      clubName: 'Arena Düren',
      city: 'Düren',
      location: 'Nippesstraße',
      date: '2026-05-20',
      startTime: '23:00',
      endTime: '06:00',
      genre: 'MIXED',
      description:
        'Charts, Black, Partyclassics und Düren-Crowd für eine wilde Nacht.',
      mediaUrl:
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1600&auto=format&fit=crop',
      price: 12,
      ticketUrl: 'https://example.com',
      organizerUrl: 'https://example.com',
      organizerName: 'Arena Düren',
      notes: 'Demo-Event für Düren.',
      tags: ['Party', 'Mixed', 'Düren'],
    },
    {
      id: 'gewoelbe-underground-rave',
      title: 'UNDERGROUND RAVE',
      clubName: 'Gewölbe',
      city: 'Köln',
      location: 'Westgermanswall 4',
      date: '2026-05-22',
      startTime: '23:59',
      endTime: '08:00',
      genre: 'HOUSE',
      description:
        'Underground House, dunkler Club-Vibe und groovige Sets bis morgens.',
      mediaUrl:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600&auto=format&fit=crop',
      price: 20,
      ticketUrl: 'https://gewoelbe.club',
      organizerUrl: 'https://gewoelbe.club',
      organizerName: 'Gewölbe',
      notes: 'Demo-Daten für die Testphase.',
      tags: ['House', 'Underground', 'Köln'],
    },
    {
      id: 'electrisize-pre-party',
      title: 'ELECTRISIZE PRE PARTY',
      clubName: 'Club Night',
      city: 'Köln',
      location: 'Innenstadt',
      date: '2026-05-25',
      startTime: '22:00',
      endTime: '07:00',
      genre: 'TECHNO',
      description:
        'Festival Feeling mitten in der Nacht mit brutalem Sound und Lichtshow.',
      mediaUrl:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
      price: 28,
      ticketUrl: 'https://electrisize.de',
      organizerUrl: 'https://electrisize.de',
      organizerName: 'Electrisize',
      notes: 'Demo-Daten für die Testphase.',
      tags: ['Festival', 'EDM', 'Techno'],
    },
  ],

  food: [
    {
      id: 'vapiano-koeln',
      name: 'Vapiano',
      city: 'Köln',
      address: 'Köln Innenstadt',
      cuisine: 'Pasta & Pizza',
      note: 'Perfekt zum Vorglühen mit der Gruppe.',
      reservationUrl: 'https://vapiano.com',
      phone: '',
      pricePerPerson: 18,
      tags: ['Pasta', 'Pizza', 'Gruppe'],
    },
    {
      id: 'da-vinci-dueren',
      name: 'Ristorante Da Vinci',
      city: 'Düren',
      address: 'Düren Zentrum',
      cuisine: 'Italienisch',
      note: 'Entspannt essen vor dem Feiern.',
      reservationUrl: 'https://example.com',
      phone: '',
      pricePerPerson: 24,
      tags: ['Italienisch', 'Dinner'],
    },
    {
      id: 'five-guys-koeln',
      name: 'Five Guys',
      city: 'Köln',
      address: 'Köln Innenstadt',
      cuisine: 'Burger',
      note: 'Schnell, fettig, geil — perfekter Pre-Party-Fuel.',
      reservationUrl: 'https://fiveguys.de',
      phone: '',
      pricePerPerson: 16,
      tags: ['Burger', 'Fast Food'],
    },
    {
      id: 'mongos-koeln',
      name: 'Mongo’s',
      city: 'Köln',
      address: 'Köln',
      cuisine: 'Asian Fusion',
      note: 'Stark für größere Gruppen und längeres Dinner.',
      reservationUrl: 'https://mongos.de',
      phone: '',
      pricePerPerson: 32,
      tags: ['Asian', 'Gruppe', 'Dinner'],
    },
  ],

  taxis: [
    {
      id: 'taxi-dueren-44444',
      name: 'Taxi Düren 44444',
      city: 'Düren',
      phone: '0242144444',
      bookingUrl: '',
      pricePerPerson: 9,
      note: 'Solide Option für Heimweg in Düren und Umgebung.',
      tags: ['Düren', '24/7'],
    },
    {
      id: 'taxi-koeln',
      name: 'Taxi Köln',
      city: 'Köln',
      phone: '02212882',
      bookingUrl: '',
      pricePerPerson: 12,
      note: 'Klassisches Taxi für Köln.',
      tags: ['Köln', '24/7'],
    },
    {
      id: 'uber-koeln',
      name: 'Uber Köln',
      city: 'Köln',
      phone: '',
      bookingUrl: 'https://www.uber.com/de/de/',
      pricePerPerson: 15,
      note: 'App-basierte Fahrtoption für Köln.',
      tags: ['Uber', 'App', 'Köln'],
    },
  ],
};

function normalizeDB(raw: Partial<VybeDB> | null): VybeDB {
  if (!raw) {
    return demoDB;
  }

  return {
    events: Array.isArray(raw.events) ? raw.events : demoDB.events,
    food: Array.isArray(raw.food) ? raw.food : demoDB.food,
    taxis: Array.isArray(raw.taxis) ? raw.taxis : demoDB.taxis,
  };
}

function mergeUniqueEvents(base: EventItem[], uploaded: EventItem[]): EventItem[] {
  return [...uploaded, ...base].filter(
    (event, index, self) =>
      event?.id &&
      index === self.findIndex((item) => item.id === event.id)
  );
}

export function loadDB(): VybeDB {
  if (typeof window === 'undefined') {
    return demoDB;
  }

  try {
    const saved =
      localStorage.getItem(STORAGE_KEYS.database) ||
      localStorage.getItem(OLD_KEYS.database) ||
      localStorage.getItem(OLD_KEYS.databaseAlt);

    const baseDB = saved ? normalizeDB(JSON.parse(saved)) : demoDB;

    const uploadedEvents = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.uploadedEvents) ||
        localStorage.getItem(OLD_KEYS.uploadedEvents) ||
        '[]'
    );

    const finalDB: VybeDB = {
      ...baseDB,
      events: mergeUniqueEvents(
        baseDB.events,
        Array.isArray(uploadedEvents) ? uploadedEvents : []
      ),
    };

    localStorage.setItem(STORAGE_KEYS.database, JSON.stringify(finalDB));

    return finalDB;
  } catch {
    localStorage.setItem(STORAGE_KEYS.database, JSON.stringify(demoDB));
    return demoDB;
  }
}

export function saveDB(db: VybeDB) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEYS.database, JSON.stringify(normalizeDB(db)));
}

export function resetDB() {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEYS.database, JSON.stringify(demoDB));
}

export function getDemoDB() {
  return demoDB;
}