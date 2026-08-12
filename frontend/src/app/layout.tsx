import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalBackground } from "@/components/layout/GlobalBackground";

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
        {/* Global Background Video — spans all pages except specialized ones */}
        <GlobalBackground />
        <Navbar />
        <main className="min-h-screen pt-20 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
