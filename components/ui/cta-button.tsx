"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "./button";

export type CTAButtonProps = ButtonProps & {
  icon?: React.ReactNode;
  withShadow?: boolean;
};

export const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ children, className, icon, withShadow = true, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn(
          "gap-2 rounded-2xl px-6 py-3 text-base font-semibold",
          withShadow ? "shadow-lg shadow-primary/25" : "shadow-none",
          props.variant === "outline"
            ? "border-primary/50 text-primary hover:bg-primary/10"
            : "",
          props.variant === "ghost" ? "text-primary" : "",
          "focus-visible:ring-primary/60 focus-visible:ring-offset-2",
          className
        )}
      >
        <span className="inline-flex items-center gap-2">
          {children}
          {icon}
        </span>
      </Button>
    );
  }
);

CTAButton.displayName = "CTAButton";

