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
          "bg-primary hover:bg-primary-hover text-[var(--btn-text)] px-6 py-2.5 rounded-sm font-heading font-bold tracking-wide transition-all duration-300 shadow-[0_0_15px_var(--primary-glow)] hover:shadow-[0_0_25px_var(--primary-glow-hover)] active:scale-[0.98] uppercase",
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
          "bg-transparent hover:bg-white/5 border border-white/20 hover:border-primary/50 text-foreground px-6 py-2.5 rounded-sm font-heading font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] hover:shadow-[0_0_15px_var(--secondary-glow)] uppercase",
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
