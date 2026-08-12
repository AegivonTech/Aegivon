"use client";
import React, { useEffect, useRef } from "react";

interface ParallaxBackgroundProps {
  imageUrl?: string;
  intensity?: number;
  className?: string;
  overlayClassName?: string;
  /** When true, renders as a fixed full-page background (use once per page) */
  fixed?: boolean;
}

const ParallaxBackground = ({
  imageUrl = "https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  intensity = 5,
  className = "",
  overlayClassName = "",
  fixed = false,
}: ParallaxBackgroundProps) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth / intensity;
      const windowHeight = window.innerHeight / intensity;
      const mouseX = e.clientX / windowWidth;
      const mouseY = e.clientY / windowHeight;
      bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity]);

  const wrapperClass = fixed
    ? `fixed inset-0 z-0 pointer-events-none overflow-hidden ${className}`
    : `absolute inset-0 w-full h-full overflow-hidden ${className}`;

  return (
    <div className={wrapperClass}>
      {/* Parallax image layer */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-[110%] h-[110%] bg-center bg-cover will-change-transform"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          transform: "translate3d(0, 0, 0)",
        }}
      />
      {/* Dark overlay so text stays readable */}
      <div className={`absolute inset-0 bg-[#070a11]/75 ${overlayClassName}`} />
    </div>
  );
};

export default ParallaxBackground;
