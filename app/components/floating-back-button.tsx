"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function FloatingBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const hiddenRoutes = ["/", "/home", "/events", "/swipe"];

  const shouldHide =
    hiddenRoutes.includes(pathname) ||
    pathname.startsWith("/_next");

  if (shouldHide) return null;

  return (
    <button
      onClick={() => router.back()}
      className="fixed left-4 top-[calc(env(safe-area-inset-top)+14px)] z-[9999] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/70 text-white shadow-2xl backdrop-blur-2xl active:scale-95"
      aria-label="Zurück"
    >
      <ArrowLeft size={22} />
    </button>
  );
}