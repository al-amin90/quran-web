import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";
import SettingsSidebar from "../components/layout/SettingsSidebar";
import Navbar from "../components/layout/Navbar";
import SettingsProvider from "../providers/SettingsProvider";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
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
    <html lang="en" className={`${amiri.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SettingsProvider>
          <Navbar />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
