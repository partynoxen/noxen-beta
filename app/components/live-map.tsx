"use client";

import {
  Flame,
  MapPin,
} from "lucide-react";

const hotspots = [
  {
    name: "Bootshaus",
    people: "1.2K",
    top: "20%",
    left: "65%",
    size: "w-6 h-6",
  },
  {
    name: "Zülpicher",
    people: "860",
    top: "45%",
    left: "40%",
    size: "w-5 h-5",
  },
  {
    name: "Belgisches",
    people: "540",
    top: "60%",
    left: "58%",
    size: "w-4 h-4",
  },
  {
    name: "Student Area",
    people: "730",
    top: "35%",
    left: "28%",
    size: "w-5 h-5",
  },
];

export default function LiveMap() {
  return (
    <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl min-h-[520px] shadow-[0_0_80px_rgba(255,255,255,0.03)]">

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_60%)]" />

        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

      </div>

      <div className="relative z-20 p-8">

        <div className="flex items-start justify-between mb-12">

          <div>

            <p className="text-pink-400 tracking-[0.3em] text-xs uppercase mb-3">
              LIVE NIGHT MAP
            </p>

            <h2 className="text-5xl font-black leading-none mb-4">

              Wo geht
              <br />
              gerade was?

            </h2>

            <p className="text-white/50 text-xl max-w-lg">

              Live Heatmap der aktivsten
              Nightlife-Spots deiner Stadt.

            </p>

          </div>

          <div className="bg-red-500/20 border border-red-500/20 rounded-full px-5 py-3 text-red-300 flex items-center gap-2 backdrop-blur-xl">

            <Flame className="w-4 h-4" />

            LIVE

          </div>

        </div>

        <div className="relative h-[320px] rounded-[32px] border border-white/10 bg-black/40 overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2),transparent_70%)]" />

          {hotspots.map((spot, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                top: spot.top,
                left: spot.left,
              }}
            >

              <div className="relative flex flex-col items-center">

                <div className={`absolute animate-ping rounded-full bg-pink-500/40 ${spot.size}`} />

                <div className={`relative rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 shadow-[0_0_40px_rgba(168,85,247,0.8)] ${spot.size}`} />

                <div className="mt-4 px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 min-w-[140px]">

                  <div className="flex items-center gap-2 mb-2 text-white">

                    <MapPin className="w-4 h-4" />

                    {spot.name}

                  </div>

                  <p className="text-white/50 text-sm">
                    {spot.people} feiern gerade
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}