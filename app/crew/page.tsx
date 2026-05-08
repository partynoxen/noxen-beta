'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  MapPin,
  Phone,
  Plus,
  Share2,
  ShieldAlert,
  Trash2,
  Users,
  Zap,
} from 'lucide-react';

import BottomNav from '../components/bottom-nav';

type CrewMember = {
  id: string;
  name: string;
  phone: string;
  role: string;
};

const STORAGE_KEY = 'vybe_crew_members';

export default function CrewPage() {
  const [members, setMembers] = useState<CrewMember[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Crew');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setMembers(saved);
  }, []);

  const saveMembers = (next: CrewMember[]) => {
    setMembers(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addMember = () => {
    if (!name.trim()) return;

    const next = [
      ...members,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        phone: phone.trim(),
        role,
      },
    ];

    saveMembers(next);
    setName('');
    setPhone('');
    setRole('Crew');
  };

  const removeMember = (id: string) => {
    saveMembers(members.filter((member) => member.id !== id));
  };

  const shareCrew = async () => {
    const text = [
      'VYBE Crew für heute:',
      '',
      ...members.map((member) => `- ${member.name} (${member.role}) ${member.phone}`),
      '',
      'Abend planen mit VYBE.',
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'VYBE Crew',
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        alert('Crew kopiert.');
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#050509] px-4 pb-36 pt-8 text-white">
      <div className="noise" />

      <div className="mx-auto max-w-5xl">
        <section className="mb-6 rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-blue-600/25 via-purple-600/20 to-pink-600/15 p-6 shadow-[0_0_80px_rgba(59,130,246,0.14)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-blue-300">
                VYBE CREW
              </p>

              <h1 className="text-5xl font-black leading-none">
                Deine Leute. Dein Abend.
              </h1>
            </div>

            <div className="float-card flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10">
              <Users size={32} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            Pack deine Crew rein, teile den Plan und halte im Drunk Mode schnell Kontakt.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="vybe-card p-5">
            <h2 className="mb-5 text-2xl font-black">Person hinzufügen</h2>

            <Input
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Max"
            />

            <Input
              label="Telefon"
              value={phone}
              onChange={setPhone}
              placeholder="+49..."
            />

            <div className="mb-5">
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/35">
                Rolle
              </label>

              <div className="grid grid-cols-2 gap-2">
                {['Crew', 'Fahrer', 'VIP', 'Notfall'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setRole(item)}
                    className={`rounded-2xl px-4 py-3 text-sm font-black ${
                      role === item
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : 'border border-white/10 bg-white/[0.05] text-white/45'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addMember}
              className="vybe-button flex h-14 w-full items-center justify-center gap-3 rounded-2xl text-sm font-black"
            >
              <Plus size={18} />
              Zur Crew hinzufügen
            </button>

            <div className="mt-5 rounded-[1.7rem] border border-white/10 bg-black/25 p-4">
              <div className="mb-2 flex items-center gap-2 text-blue-300">
                <Zap size={18} />
                <p className="text-xs font-black uppercase tracking-[0.18em]">
                  Demo Effekt
                </p>
              </div>

              <p className="text-sm leading-relaxed text-white/45">
                Das wirkt sofort nach echter Social-App. Später: Einladungslinks, Live-Standort und Gruppenchat.
              </p>
            </div>
          </aside>

          <main className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <StatCard label="Crew" value={`${members.length}`} icon={<Users size={20} />} />
              <StatCard label="Ready" value="87%" icon={<ShieldAlert size={20} />} />
              <StatCard label="Mood" value="Wild" icon={<Crown size={20} />} />
            </div>

            <div className="vybe-card p-5">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                    Heute dabei
                  </p>

                  <h2 className="mt-1 text-3xl font-black">
                    Crew Liste
                  </h2>
                </div>

                <button
                  onClick={shareCrew}
                  className="flex h-12 items-center gap-2 rounded-2xl bg-white/10 px-4 text-sm font-black"
                >
                  <Share2 size={17} />
                  Teilen
                </button>
              </div>

              {members.length === 0 && (
                <div className="rounded-[1.8rem] border border-white/10 bg-black/25 p-8 text-center">
                  <Users className="mx-auto mb-4 text-blue-300" size={42} />
                  <h3 className="text-2xl font-black">Noch niemand drin</h3>
                  <p className="mt-2 text-sm text-white/45">
                    Füge deine Freunde hinzu, bevor ihr loszieht.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {members.map((member, index) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 rounded-[1.7rem] border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-pink-600 text-xl font-black">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-xl font-black">{member.name}</h3>

                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/50">
                          {member.role}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-white/40">
                        {member.phone || 'Keine Nummer hinterlegt'}
                      </p>
                    </div>

                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-500/15 text-green-300"
                      >
                        <Phone size={18} />
                      </a>
                    )}

                    <button
                      onClick={() => removeMember(member.id)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Link
                href="/plan"
                className="vybe-button flex h-16 items-center justify-center gap-3 rounded-[1.6rem] text-sm font-black"
              >
                <MapPin size={20} />
                Crew-Abend planen
              </Link>

              <Link
                href="/drunk"
                className="flex h-16 items-center justify-center gap-3 rounded-[1.6rem] border border-red-500/20 bg-red-500/10 text-sm font-black text-red-200"
              >
                <ShieldAlert size={20} />
                Safe Mode öffnen
              </Link>
            </div>
          </main>
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </span>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none placeholder:text-white/25 focus:border-purple-400"
      />
    </label>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="vybe-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
          {icon}
        </div>

        <div className="live-dot" />
      </div>

      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}