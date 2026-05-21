import AmbientBackground from "../components/ambient-background";
import HomeClient from "./home-client";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <AmbientBackground />

      <div className="relative z-10">
        <HomeClient />
      </div>
    </main>
  );
}