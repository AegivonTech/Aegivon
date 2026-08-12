"use client";

import { usePathname } from "next/navigation";

export function GlobalBackground() {
  const pathname = usePathname();
  
  // Rakshak product page has its own specialized background video
  if (pathname === "/products/rakshak") {
    return null;
  }
  
  return (
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
  );
}
