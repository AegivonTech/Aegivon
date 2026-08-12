"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PrimaryButton } from "../ui/Buttons";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-[#0f1419]/80 backdrop-blur-md border-b border-white/5 shadow-sm" : "bg-transparent border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <img src="/brand/aegivon-logo.jpeg" alt="Aegivon Logo" className="h-10 w-auto object-contain mix-blend-screen" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl tracking-widest leading-none text-white uppercase">Aegivon</span>
              <span className="font-heading font-semibold text-[0.55rem] tracking-[0.3em] text-accent leading-tight uppercase mt-1">Technologies</span>
            </div>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">About</Link>
            
            {/* Products Dropdown (Simple hover CSS for now) */}
            <div className="relative group py-2">
              <Link href="/products" className="text-sm font-medium hover:text-accent transition-colors cursor-pointer flex items-center gap-1">
                Products
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full left-0 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#0f1419]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden pt-2 pb-2 z-50">
                <Link href="/products/rakshak" className="block px-4 py-3 hover:bg-white/5 transition-colors">
                  <div className="font-heading font-bold text-white text-sm mb-1">Rakshak</div>
                  <div className="text-xs text-accent font-medium">In Development</div>
                </Link>
                <div className="block px-4 py-3 cursor-not-allowed opacity-50">
                  <div className="font-heading font-bold text-white text-sm mb-1">Future Products</div>
                  <div className="text-xs text-secondary font-medium">Coming Soon</div>
                </div>
              </div>
            </div>

            <Link href="/building-aegivon" className="text-sm font-medium hover:text-accent transition-colors">Building Aegivon</Link>
            <Link href="/team" className="text-sm font-medium hover:text-accent transition-colors">Team</Link>
            <Link href="/careers" className="text-sm font-medium hover:text-accent transition-colors">Careers</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">Contact</Link>
          </div>
          <div>
            <Link href="/products/rakshak">
              <PrimaryButton>Explore Rakshak</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
