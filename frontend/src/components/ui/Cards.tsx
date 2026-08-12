import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = "", ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn("glass-panel rounded-xl p-6 border-accent/20 shadow-[0_0_15px_var(--card-glow)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_30px_var(--card-glow-hover)] hover:border-accent/50", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const StatCard = ({ stat, label }: { stat: string; label: string }) => {
  return (
    <GlassCard className="text-center py-8">
      <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{stat}</div>
      <div className="text-secondary text-sm uppercase tracking-wider font-semibold">{label}</div>
    </GlassCard>
  );
};
