import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-md font-medium transition-all duration-300 shadow-[0_0_15px_rgba(225,29,46,0.3)] hover:shadow-[0_0_25px_rgba(225,29,46,0.5)] active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";

export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-foreground px-6 py-2.5 rounded-md font-medium transition-all duration-300 active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
SecondaryButton.displayName = "SecondaryButton";
