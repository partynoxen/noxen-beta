'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, ExternalLink, Utensils, Car, Train } from 'lucide-react';
import BottomNav from '../components/bottom-nav';

const SERVICES = [
  { name: "McDonald's", type: 'Fast Food', distance: '0,3 km', icon: Utensils, color: 'from-yellow-500 to-red-500', mapQuery: "McDonald's in der N\u00e4he" },
  { name: 'Burger King', type: 'Fast Food', distance: '0,5 km', icon: Utensils, color: 'from-orange-500 to-red-600', mapQuery: 'Burger King in der N\u00e4he' },
  { name: 'Kebab Haus', type: 'Kebab', distance: '0,2 km', icon: Utensils, color: 'from-green-500 to-emerald-600', mapQuery: 'Kebab in der N\u00e4he' },
  { name: 'Taxistand', type: 'Transport', distance: '0,1 km', icon: Car, color: 'from-yellow-400 to-amber-500', mapQuery: 'Taxistand in der N\u00e4he' },
  { name: 'Uber / Bolt', type: 'Ride-Sharing', distance: 'App', icon: Car, color: 'from-purple-500 to-violet-600', mapQuery: '' },
  { name: 'Bahnhof', type: '\u00d6PNV', distance: '0,8 km', icon: Train, color: 'from-blue-500 to-cyan-600', mapQuery: 'Bahnhof in der N\u00e4he' },
];

export default function NearbyClient() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">
      <div className="sticky top-0 z-40 glass-strong">
        <div className="flex items-center gap-2 px-4 py-3 max-w-lg mx-auto">
          <MapPin size={22} className="text-blue-400" />
          <h1 className="text-xl font-display font-bold">In der N\u00e4he</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4">
        <p className="text-sm text-white/50 mb-6">After-Party Essentials in deiner N\u00e4he.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICES.map((service: any, idx: number) => {
            const Icon = service?.icon ?? MapPin;
            return (
              <motion.div
                key={service?.name ?? idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="glass rounded-2xl p-4 hover:neon-glow-purple transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service?.color ?? ''} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm">{service?.name ?? ''}</h3>
                    <p className="text-xs text-white/40">{service?.type ?? ''}</p>
                    <p className="text-xs text-white/30 mt-0.5">{service?.distance ?? ''}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {service?.mapQuery ? (
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(service.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-xs text-white/60 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink size={12} /> Karte \u00f6ffnen
                    </a>
                  ) : null}
                  <button
                    onClick={() => alert(`${service?.name ?? 'Service'} wird ge\u00f6ffnet... (kommt bald)`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-purple-600/20 text-xs text-purple-300 hover:bg-purple-600/30 transition-colors"
                  >
                    <Phone size={12} /> {service?.type === 'Ride-Sharing' ? 'App \u00f6ffnen' : 'Anrufen'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
