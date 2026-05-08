'use client';

const GENRE_COLORS: Record<string, string> = {
  Techno: 'from-purple-600 to-purple-800',
  HipHop: 'from-amber-500 to-orange-600',
  House: 'from-blue-500 to-cyan-600',
  '90s': 'from-pink-500 to-rose-600',
  Afrobeats: 'from-green-500 to-emerald-600',
  Charts: 'from-yellow-500 to-amber-600',
  RnB: 'from-indigo-500 to-violet-600',
  Latin: 'from-red-500 to-rose-600',
  Pop: 'from-sky-400 to-blue-500',
};

export default function GenreBadge({ genre }: { genre: string }) {
  const gradient = GENRE_COLORS[genre ?? ''] ?? 'from-gray-500 to-gray-600';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${gradient}`}>
      {genre ?? 'Unknown'}
    </span>
  );
}
