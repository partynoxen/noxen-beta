'use client';

import { useState, useEffect, useRef } from 'react';
import { Upload, Camera, Star, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '../components/bottom-nav';

interface EventOption {
  id: string;
  title: string;
  clubName: string;
}

export default function UploadClient() {
  const [events, setEvents] = useState<EventOption[]>([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        setEvents((data ?? []).map((e: any) => ({ id: e?.id ?? '', title: e?.title ?? '', clubName: e?.clubName ?? '' })));
      } catch (e: any) { console.error(e); }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async () => {
    if (!selectedEvent || !rating) return;
    setSubmitting(true);
    try {
      let cloudStoragePath: string | null = null;
      let isPublic = true;

      if (file) {
        const presignRes = await fetch('/api/upload/presigned', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: file.name, contentType: file.type, isPublic: true }),
        });
        const { uploadUrl, cloud_storage_path } = await presignRes.json();

        const urlObj = new URL(uploadUrl);
        const signedHeaders = urlObj.searchParams.get('X-Amz-SignedHeaders') ?? '';
        const headers: Record<string, string> = { 'Content-Type': file.type };
        if (signedHeaders.includes('content-disposition')) {
          headers['Content-Disposition'] = 'attachment';
        }

        await fetch(uploadUrl, { method: 'PUT', headers, body: file });
        cloudStoragePath = cloud_storage_path;
      }

      const res = await fetch('/api/vibe-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEvent,
          caption,
          rating,
          cloudStoragePath,
          isPublic: true,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setSelectedEvent('');
          setCaption('');
          setRating(0);
          setFile(null);
          if (fileRef?.current) fileRef.current.value = '';
        }, 2500);
      }
    } catch (e: any) {
      console.error(e);
      alert('Upload fehlgeschlagen. Versuch es nochmal!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">
      <div className="sticky top-0 z-40 glass-strong">
        <div className="flex items-center gap-2 px-4 py-3 max-w-lg mx-auto">
          <Upload size={22} className="text-purple-400" />
          <h1 className="text-xl font-display font-bold">VYBE hochladen</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-sm text-white/50 mb-6">Teile dein Party-Erlebnis und zeig anderen die Stimmung.</p>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 neon-glow-purple"
              >
                <Check size={40} className="text-green-400" />
              </motion.div>
              <h2 className="text-2xl font-display font-bold mb-2">VYBE hochgeladen! \ud83d\ude4c</h2>
              <p className="text-white/50">Danke f\u00fcrs Teilen der Energy \u26a1</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              {/* Event Auswahl */}
              <div>
                <label className="text-sm font-semibold text-white/70 mb-2 block">Event ausw\u00e4hlen *</label>
                <select
                  value={selectedEvent}
                  onChange={(e: any) => setSelectedEvent(e?.target?.value ?? '')}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                >
                  <option value="" className="bg-[#1a1a1a]">W\u00e4hle ein Event...</option>
                  {(events ?? []).map((ev: EventOption) => (
                    <option key={ev?.id} value={ev?.id} className="bg-[#1a1a1a]">
                      {ev?.title ?? ''} \u2013 {ev?.clubName ?? ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Datei Upload */}
              <div>
                <label className="text-sm font-semibold text-white/70 mb-2 block">Foto / Video</label>
                <div
                  onClick={() => fileRef?.current?.click?.()}
                  className="w-full py-10 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-white/[0.02] transition-all"
                >
                  <Camera size={32} className="text-white/20 mb-2" />
                  <p className="text-sm text-white/40">{file?.name ?? 'Tippe zum Hochladen'}</p>
                  <p className="text-xs text-white/20 mt-1">JPG, PNG, MP4 bis 100MB</p>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e: any) => setFile(e?.target?.files?.[0] ?? null)}
                  className="hidden"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="text-sm font-semibold text-white/70 mb-2 block">Beschreibung</label>
                <textarea
                  value={caption}
                  onChange={(e: any) => setCaption(e?.target?.value ?? '')}
                  placeholder="Wie war die Stimmung?"
                  rows={3}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              {/* Bewertung */}
              <div>
                <label className="text-sm font-semibold text-white/70 mb-2 block">Crowd-Stimmung *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star: number) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={`transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-white/15'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Absenden */}
              <button
                onClick={handleSubmit}
                disabled={!selectedEvent || !rating || submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:from-purple-500 hover:to-pink-500 transition-all neon-glow-purple"
              >
                {submitting ? (
                  <><Loader2 size={20} className="animate-spin" /> Wird hochgeladen...</>
                ) : (
                  <><Upload size={20} /> VYBE hochladen</>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}
