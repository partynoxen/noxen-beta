'use client';

import { getHeatLevel, normalizeHeatScore } from '@/lib/constants';
import { Flame } from 'lucide-react';

export default function HeatScore({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const heat = getHeatLevel(score ?? 0);
  const normalized = normalizeHeatScore(score ?? 0);
  const sizes = {
    sm: { bar: 'h-1.5', text: 'text-[10px]', icon: 12, gap: 'gap-1' },
    md: { bar: 'h-2', text: 'text-xs', icon: 14, gap: 'gap-1.5' },
    lg: { bar: 'h-3', text: 'text-sm', icon: 18, gap: 'gap-2' },
  };
  const s = sizes[size] ?? sizes.md;

  return (
    <div className={`flex items-center ${s.gap}`}>
      <Flame size={s.icon} style={{ color: heat?.color ?? '#3B82F6' }} className={score >= 86 ? 'animate-pulse' : ''} />
      <div className="flex-1 min-w-[40px]">
        <div className={`w-full ${s.bar} rounded-full bg-white/10 overflow-hidden`}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${normalized}%`, backgroundColor: heat?.color ?? '#3B82F6' }}
          />
        </div>
      </div>
      <span className={`${s.text} font-semibold`} style={{ color: heat?.color ?? '#3B82F6' }}>
        {heat?.label ?? 'Chill'}
      </span>
    </div>
  );
}
