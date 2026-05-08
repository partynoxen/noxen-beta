export const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

export const GENRES = ['Techno', 'HipHop', 'House', '90s', 'Afrobeats', 'Charts', 'RnB', 'Latin', 'Pop'] as const;
export const CITIES = ['Köln', 'Düsseldorf', 'Aachen', 'Bonn', 'Berlin', 'Hamburg'] as const;
export const DATE_OPTIONS = ['Heute Nacht', 'Morgen', 'Wochenende', 'Nächste 7 Tage'] as const;
export const DISTANCE_OPTIONS = ['5 km', '10 km', '25 km', '50 km'] as const;
export const PRICE_OPTIONS = ['Kostenlos', 'Unter 15€', 'Unter 30€', 'Premium'] as const;

// Mapping for API compatibility (German labels → English API values)
export const DATE_API_MAP: Record<string, string> = {
  'Heute Nacht': 'Tonight',
  'Morgen': 'Tomorrow',
  'Wochenende': 'Weekend',
  'Nächste 7 Tage': 'Next 7 Days',
};

export const PRICE_API_MAP: Record<string, string> = {
  'Kostenlos': 'Free',
  'Unter 15€': 'Under 15€',
  'Unter 30€': 'Under 30€',
  'Premium': 'Premium',
};

// Map DB city names to German display names
export const CITY_DISPLAY: Record<string, string> = {
  'Cologne': 'Köln',
  'Düsseldorf': 'Düsseldorf',
  'Aachen': 'Aachen',
  'Bonn': 'Bonn',
  'Berlin': 'Berlin',
  'Hamburg': 'Hamburg',
};

export function displayCity(city: string): string {
  return CITY_DISPLAY[city] ?? city;
}

export function getHeatLevel(score: number): { label: string; color: string; bgColor: string } {
  if (score >= 86) return { label: 'Eskalation', color: '#EC4899', bgColor: 'bg-pink-500/20' };
  if (score >= 61) return { label: 'Lit', color: '#F97316', bgColor: 'bg-orange-500/20' };
  if (score >= 31) return { label: 'Wird warm', color: '#EAB308', bgColor: 'bg-yellow-500/20' };
  return { label: 'Chill', color: '#3B82F6', bgColor: 'bg-blue-500/20' };
}

export function calculateHeatScore(views: number, likes: number, saves: number, checkins: number): number {
  return Math.round((views ?? 0) * 0.1 + (likes ?? 0) * 2 + (saves ?? 0) * 3 + (checkins ?? 0) * 5);
}

// Normalize heat score to 0-100 for display
export function normalizeHeatScore(score: number): number {
  return Math.min(100, Math.max(0, score > 100 ? 100 : score));
}
