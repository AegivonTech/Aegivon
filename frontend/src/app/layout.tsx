import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Aegivon Technologies | Smart Safety. Stronger Society.",
  description: "Aegivon Technologies is an early-stage startup building Rakshak, our flagship AI-Powered Safety & Incident Management Platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#070a11] text-white`}>
        {/* Global Background Video — spans all pages */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src="/VIDEO/BG.mp4" type="video/mp4" />
          </video>
          {/* Subtle overlay so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070a11]/20 via-[#070a11]/50 to-[#070a11]/90" />
        </div>
        <Navbar />
        <main className="min-h-screen pt-20 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
