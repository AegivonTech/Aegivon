import React from "react";

interface RotatingLogoBackdropProps {
  src?: string;
  size?: string;
  opacity?: string;
  duration?: string;
}

export const RotatingLogoBackdrop: React.FC<RotatingLogoBackdropProps> = ({
  src = "/brand/aegivon-logo.jpeg",
  size = "40rem",
  opacity = "0.08",
  duration = "50s",
}) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div 
        className="animate-[spin_linear_infinite]"
        style={{
          width: size,
          height: size,
          opacity: opacity,
          animationDuration: duration,
        }}
      >
        <img
          src={src}
          alt="Aegivon Background Logo"
          className="w-full h-full object-contain mix-blend-screen"
        />
      </div>
    </div>
  );
};
