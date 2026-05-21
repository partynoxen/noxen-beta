import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const demoEvents = [
  {
    id: "1",
    title: "NOXEN Opening Night",
    location: "Köln",
  },
  {
    id: "2",
    title: "Techno Warehouse",
    location: "Saarbrücken",
  },
  {
    id: "3",
    title: "Rooftop Session",
    location: "Düren",
  },
];

export async function generateStaticParams() {
  return demoEvents.map((event) => ({
    id: event.id,
  }));
}

export default function EventDetailPage({ params }: Props) {
  const event = demoEvents.find((e) => e.id === params.id);

  if (!event) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto pt-24">
        <h1 className="text-4xl font-bold mb-4">
          {event.title}
        </h1>

        <p className="text-white/70 text-lg">
          {event.location}
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/80">
            Willkommen zur NOXEN Beta 🚀
          </p>
        </div>
      </div>
    </main>
  );
}