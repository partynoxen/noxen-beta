'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  ImagePlus,
  Music,
  Save,
  UploadCloud,
} from 'lucide-react';

import Link from 'next/link';
import BottomNav from '../../components/bottom-nav';

type UploadedEvent = {
  id: string;
  title: string;
  clubName: string;
  city: string;
  location: string;
  genre: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  mediaUrl: string;
  description: string;
  notes: string;
  ticketUrl: string;
  organizerName: string;
  organizerUrl: string;
  tags: string[];
  createdAt: string;
};

type EventForm = {
  title: string;
  clubName: string;
  city: string;
  location: string;
  genre: string;
  date: string;
  startTime: string;
  endTime: string;
  price: string;
  image: string;
  description: string;
  notes: string;
  ticketUrl: string;
  organizerName: string;
  organizerUrl: string;
  tags: string;
};

const STORAGE_KEY = 'vybe_uploaded_events';
const EMPLOYEE_AUTH_KEY = 'vybe_employee_dashboard_auth';

export default function UploadPage() {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);

  const [form, setForm] = useState<EventForm>({
    title: '',
    clubName: '',
    city: 'Düren',
    location: '',
    genre: 'TECHNO',
    date: '',
    startTime: '22:00',
    endTime: '05:00',
    price: '0',
    image: '',
    description: '',
    notes: '',
    ticketUrl: '',
    organizerName: '',
    organizerUrl: '',
    tags: 'Party, Club',
  });

  useEffect(() => {
    const authed = localStorage.getItem(EMPLOYEE_AUTH_KEY) === 'true';
    setIsAuthed(authed);

    if (!authed) {
      window.location.href = '/mitarbeiter/dashboard';
    }
  }, []);

  useEffect(() => {
    setSaved(false);
    setError('');
  }, [form]);

  const updateField = (field: keyof EventForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      setError(`Bild ist zu groß. Bitte maximal ${maxSizeMB} MB verwenden.`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Bitte eine Bilddatei auswählen.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result === 'string') {
        updateField('image', result);
      }
    };

    reader.onerror = () => {
      setError('Bild konnte nicht geladen werden.');
    };

    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (!form.title.trim()) return 'Bitte Event Titel eintragen.';
    if (!form.clubName.trim()) return 'Bitte Club Name eintragen.';
    if (!form.city.trim()) return 'Bitte Stadt eintragen.';
    if (!form.location.trim()) return 'Bitte Location eintragen.';
    if (!form.date.trim()) return 'Bitte Datum auswählen.';
    if (!form.startTime.trim()) return 'Bitte Startzeit auswählen.';

    return '';
  };

  const saveEvent = () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const existing: UploadedEvent[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );

    const newEvent: UploadedEvent = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      clubName: form.clubName.trim(),
      city: form.city.trim(),
      location: form.location.trim(),
      genre: form.genre.trim(),
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime || '05:00',
      price: Number(form.price || 0),
      mediaUrl: form.image,
      description: form.description.trim(),
      notes: form.notes.trim(),
      ticketUrl: form.ticketUrl.trim(),
      organizerName: form.organizerName.trim(),
      organizerUrl: form.organizerUrl.trim(),
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([newEvent, ...existing]));

    setSaved(true);
    setError('');

    setForm({
      title: '',
      clubName: '',
      city: 'Düren',
      location: '',
      genre: 'TECHNO',
      date: '',
      startTime: '22:00',
      endTime: '05:00',
      price: '0',
      image: '',
      description: '',
      notes: '',
      ticketUrl: '',
      organizerName: '',
      organizerUrl: '',
      tags: 'Party, Club',
    });
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#050509] px-5 py-10 text-white">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-black">Zugriff prüfen...</h1>
          <p className="mt-2 text-white/40">Du wirst zum Mitarbeiter Login weitergeleitet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-32 pt-6 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/mitarbeiter/dashboard"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"
          >
            <ArrowLeft size={22} />
          </Link>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-300">
              EVENT UPLOAD
            </p>

            <h1 className="text-4xl font-black">Neues Event</h1>
          </div>
        </div>

        {saved && (
          <div className="mb-6 rounded-3xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-sm font-bold text-green-300">
            Event erfolgreich gespeichert. Es erscheint jetzt im Feed.
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-3xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <Input
            label="Event Titel"
            value={form.title}
            onChange={(value) => updateField('title', value)}
          />

          <Input
            label="Club Name"
            value={form.clubName}
            onChange={(value) => updateField('clubName', value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Stadt"
              value={form.city}
              onChange={(value) => updateField('city', value)}
            />

            <Input
              label="Location"
              value={form.location}
              onChange={(value) => updateField('location', value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/35">
              Genre
            </label>

            <div className="grid grid-cols-2 gap-3">
              {['TECHNO', 'HIP HOP', 'AFRO', 'HOUSE', '90s', 'MIXED'].map(
                (genre) => (
                  <button
                    key={genre}
                    onClick={() => updateField('genre', genre)}
                    className={`h-14 rounded-2xl text-sm font-black transition-all ${
                      form.genre === genre
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : 'border border-white/10 bg-white/[0.05] text-white/50'
                    }`}
                  >
                    {genre}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Datum"
              type="date"
              value={form.date}
              onChange={(value) => updateField('date', value)}
            />

            <Input
              label="Start"
              type="time"
              value={form.startTime}
              onChange={(value) => updateField('startTime', value)}
            />

            <Input
              label="Ende"
              type="time"
              value={form.endTime}
              onChange={(value) => updateField('endTime', value)}
            />
          </div>

          <Input
            label="Preis"
            type="number"
            value={form.price}
            onChange={(value) => updateField('price', value)}
          />

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/35">
              Event Bild hochladen
            </label>

            <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/[0.05] p-5 text-center transition hover:border-purple-400">
              <UploadCloud size={34} className="mb-3 text-purple-300" />

              <p className="text-lg font-black">Bild auswählen</p>
              <p className="mt-1 text-sm text-white/40">
                JPG, PNG oder WebP bis 2 MB
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) =>
                  handleImageUpload(event.target.files?.[0] ?? null)
                }
              />
            </label>
          </div>

          <Input
            label="Oder Bild URL"
            value={form.image.startsWith('data:image') ? '' : form.image}
            onChange={(value) => updateField('image', value)}
            placeholder="https://..."
          />

          <TextArea
            label="Beschreibung"
            value={form.description}
            onChange={(value) => updateField('description', value)}
            placeholder="Was passiert auf dem Event?"
          />

          <TextArea
            label="Interne Notizen"
            value={form.notes}
            onChange={(value) => updateField('notes', value)}
            placeholder="z. B. früh da sein, VIP möglich, Dresscode..."
          />

          <Input
            label="Ticket URL"
            value={form.ticketUrl}
            onChange={(value) => updateField('ticketUrl', value)}
            placeholder="https://..."
          />

          <Input
            label="Veranstalter"
            value={form.organizerName}
            onChange={(value) => updateField('organizerName', value)}
          />

          <Input
            label="Veranstalter URL"
            value={form.organizerUrl}
            onChange={(value) => updateField('organizerUrl', value)}
            placeholder="https://..."
          />

          <Input
            label="Tags"
            value={form.tags}
            onChange={(value) => updateField('tags', value)}
            placeholder="Techno, Club, Late Night"
          />

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05]">
            {form.image ? (
              <img
                src={form.image}
                alt="Preview"
                className="h-64 w-full object-cover"
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-black/30">
                <Music size={42} className="text-white/20" />
              </div>
            )}

            <div className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-black">
                  {form.genre}
                </span>

                <span className="text-sm text-white/40">
                  {form.price || 0}€
                </span>
              </div>

              <h2 className="text-3xl font-black">
                {form.title || 'Event Titel'}
              </h2>

              <p className="mt-1 text-white/45">{form.clubName || 'Club'}</p>

              <div className="mt-4 flex items-center gap-2 text-sm text-white/40">
                <Calendar size={16} />
                {form.date || 'Datum'} · {form.startTime}
              </div>
            </div>
          </div>

          <button
            onClick={saveEvent}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-[2rem] bg-gradient-to-r from-purple-600 to-pink-600 text-lg font-black shadow-[0_0_40px_rgba(168,85,247,0.35)]"
          >
            <Save size={22} />
            Event speichern
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/35">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full rounded-3xl border border-white/10 bg-white/[0.05] px-5 text-sm font-bold text-white outline-none placeholder:text-white/25 focus:border-purple-500"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder = '',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/35">
        {label}
      </label>

      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[140px] w-full rounded-3xl border border-white/10 bg-white/[0.05] p-5 text-sm font-medium text-white outline-none placeholder:text-white/25 focus:border-purple-500"
      />
    </div>
  );
}