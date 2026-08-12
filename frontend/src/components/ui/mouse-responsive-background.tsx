"use client";
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface ParallaxBackgroundProps {
  className?: string;
  imageUrl?: string;
  opacity?: number;
}

export const MouseResponsiveBackground = ({ 
  className,
  imageUrl = "https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Abstract fluid background
  opacity = 0.35 // Increased opacity
}: ParallaxBackgroundProps) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Using a larger divisor for a smoother, more subtle parallax effect
      const windowWidth = window.innerWidth / 2;
      const windowHeight = window.innerHeight / 2;
      const mouseX = e.clientX / windowWidth;
      const mouseY = e.clientY / windowHeight;

      // translate3d uses hardware acceleration
      bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={cn("fixed inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Background Image that moves */}
      <div
        ref={bgRef}
        className="absolute top-[-5%] left-[-5%] w-[110%] h-[110%] bg-center bg-cover transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          opacity: opacity,
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      {/* Lighter gradient overlay so the image actually shows through while still fading at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070a11]/60 to-[#070a11]" />
    </div>
  );
};
