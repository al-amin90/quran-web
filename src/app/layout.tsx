import type { Metadata } from "next";
import { Amiri, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SettingsSidebar from "../components/layout/SettingsSidebar";
import Navbar from "../components/layout/Navbar";

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
        {/* <Navbar /> */}
        {children}
        <SettingsSidebar />
      </body>
    </html>
  );
}
