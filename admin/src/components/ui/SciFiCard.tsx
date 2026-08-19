import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SciFiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  wrapperClassName?: string;
  glow?: boolean;
}

export function SciFiCard({ children, className, wrapperClassName, glow = true, ...props }: SciFiCardProps) {
  // Using a polygon that cuts top-left and bottom-right
  const clipPathStyle = {
    clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)"
  };

  return (
    <div 
      className={cn(
        "relative p-[1px] bg-blue-500/30 transition-all duration-300", 
        glow && "shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-blue-400/50",
        wrapperClassName
      )}
      style={clipPathStyle}
    >
      <div 
        className={cn("bg-[#020610] h-full w-full relative overflow-hidden", className)}
        style={clipPathStyle}
        {...props}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#001133_1px,transparent_1px),linear-gradient(to_bottom,#001133_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-[15px] w-4 h-[2px] bg-blue-400" />
      <div className="absolute top-[15px] left-0 w-[2px] h-4 bg-blue-400" />
      <div className="absolute bottom-0 right-[15px] w-4 h-[2px] bg-blue-400" />
      <div className="absolute bottom-[15px] right-0 w-[2px] h-4 bg-blue-400" />
    </div>
  );
}
