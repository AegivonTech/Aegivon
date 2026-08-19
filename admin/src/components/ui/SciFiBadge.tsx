import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SciFiBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "NEW" | "IN_PROGRESS" | "REVIEWING" | "COMPLETED" | "SHORTLISTED" | string;
}

export function SciFiBadge({ status, className, ...props }: SciFiBadgeProps) {
  const getStatusColor = (s: string) => {
    switch (s.toUpperCase()) {
      case "NEW":
        return "text-blue-400 border-blue-500/30 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.2)]";
      case "IN PROGRESS":
      case "IN_PROGRESS":
        return "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]";
      case "REVIEWING":
        return "text-purple-400 border-purple-500/30 bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]";
      case "COMPLETED":
      case "SHORTLISTED":
        return "text-green-400 border-green-500/30 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.2)]";
      default:
        return "text-gray-400 border-gray-500/30 bg-gray-500/10";
    }
  };

  return (
    <span
      className={cn(
        "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-sm",
        getStatusColor(status),
        className
      )}
      {...props}
    >
      {status.replace("_", " ")}
    </span>
  );
}
