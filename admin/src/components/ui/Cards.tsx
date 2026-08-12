import React from "react";
import { cn } from "@/lib/utils";

export const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("glass-panel rounded-xl p-6 border-accent/10 shadow-[0_0_15px_rgba(56,189,248,0.05)] transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(56,189,248,0.15)] hover:border-accent/40", className)}>
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
