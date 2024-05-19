import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/src/components/ui/toaster";
import Navbar from "@/src/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QQ | Usuários ",
  description: "Sistema de gestão Lojas Quero-Quero",
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <main className="flex bg-[#F8F8F8]">
          <Navbar />
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
