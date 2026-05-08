import type { Metadata } from "next";
import "./globals.css";
import FloatingBackButton from "./components/floating-back-button";

export const metadata: Metadata = {
  title: "NOXEN",
  description: "NOXEN Party App Beta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <FloatingBackButton />
        {children}
      </body>
    </html>
  );
}