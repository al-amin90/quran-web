import type { Metadata } from "next";
import { Amiri, Cairo, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

import Navbar from "../components/layout/Navbar";
import SettingsProvider from "../providers/SettingsProvider";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-noto-naskh",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Quran App",
  description: "Read and search the Holy Quran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${amiri.variable} ${notoNaskh.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SettingsProvider>
          <Navbar />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
