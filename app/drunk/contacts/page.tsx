'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Phone,
  Plus,
  Trash2,
  User,
} from 'lucide-react';

type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
};

const STORAGE_KEY = 'vybe_emergency_contacts';

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setContacts(JSON.parse(saved));
      } catch {
        setContacts([]);
      }
    }
  }, []);

  const saveContacts = (updated: EmergencyContact[]) => {
    setContacts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addContact = () => {
    if (!name.trim() || !phone.trim()) return;

    const updated = [
      ...contacts,
      {
        id: crypto.randomUUID(),
        name,
        phone,
      },
    ];

    saveContacts(updated);

    setName('');
    setPhone('');
  };

  const removeContact = (id: string) => {
    const updated = contacts.filter((contact) => contact.id !== id);
    saveContacts(updated);
  };

  return (
    <div className="min-h-screen bg-black px-5 py-8 text-white">
      <div className="mx-auto max-w-md">
        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/drunk"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"
          >
            <ArrowLeft size={22} />
          </Link>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-pink-300">
              DRUNK MODE
            </p>

            <h1 className="text-3xl font-black">
              Notfallkontakte
            </h1>
          </div>
        </div>

        {/* ADD */}
        <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
          <div className="mb-4">
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/35">
              Name
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Max"
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-lg font-bold text-white outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/35">
              Telefonnummer
            </label>

            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+49..."
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-lg font-bold text-white outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={addContact}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-lg font-black shadow-[0_0_35px_rgba(168,85,247,0.35)]"
          >
            <Plus size={22} />
            Kontakt hinzufügen
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                  <User size={30} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-2xl font-black">
                    {contact.name}
                  </h2>

                  <p className="mt-1 text-white/45">
                    {contact.phone}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-green-600 text-lg font-black shadow-[0_0_30px_rgba(34,197,94,0.35)]"
                >
                  <Phone size={22} />
                  Anrufen
                </a>

                <button
                  onClick={() => removeContact(contact.id)}
                  className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-red-600 text-lg font-black shadow-[0_0_30px_rgba(239,68,68,0.35)]"
                >
                  <Trash2 size={22} />
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-center">
            <p className="text-xl font-black">
              Keine Kontakte gespeichert
            </p>

            <p className="mt-2 text-white/45">
              Füge Leute hinzu die du im Notfall schnell erreichen willst.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}