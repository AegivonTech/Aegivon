import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SciFiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export function SciFiButton({ children, className, variant = "primary", ...props }: SciFiButtonProps) {
  const clipPathStyle = {
    clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
  };

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]",
    secondary: "bg-transparent border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300",
    danger: "bg-transparent border border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 hover:text-red-300"
  };

  if (variant !== "primary") {
    return (
      <button
        className={cn(
          "relative px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-300",
          variants[variant],
          className
        )}
        style={clipPathStyle}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Primary variant gets the special double border effect
  return (
    <button
      className={cn(
        "relative p-[1px] bg-blue-400 hover:bg-blue-300 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.3)] group",
        className
      )}
      style={clipPathStyle}
      {...props}
    >
      <div 
        className="bg-blue-600 group-hover:bg-blue-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white transition-colors h-full w-full"
        style={clipPathStyle}
      >
        {children}
      </div>
    </button>
  );
}
