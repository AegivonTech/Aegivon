"use client";

import { usePathname } from "next/navigation";

export function GlobalBackground() {
  const pathname = usePathname();
  
  // Rakshak product page has its own specialized background video
  if (pathname === "/products/rakshak") {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0008]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/VIDEO/red_bg.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay so text stays readable, but doesn't block the video entirely */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0008]/40 via-[#0a0008]/60 to-[#0a0008]/80" />
      </div>
    );
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
