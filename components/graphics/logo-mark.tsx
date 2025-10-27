"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className }: LogoMarkProps) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-hidden="true"
      className={cn("h-10 w-10", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="104" height="104" rx="20" fill={`url(#${gradientId})`} />
      <path
        d="M60 28c-10.8 0-20 8.3-20 19.4 0 6.4 3.1 12.4 8.4 16.1l10.8 7.6 10.8-7.6c5.3-3.7 8.4-9.7 8.4-16.1C78.4 36.3 69.9 28 60 28z"
        fill="white"
        fillOpacity={0.9}
      />
      <path
        d="M38 75.5c0-1.5 1-2.9 2.4-3.4l19.3-6.7 19.3 6.7c1.4.5 2.4 1.9 2.4 3.4v7.1c0 3.9-3.1 7-7 7H45c-3.9 0-7-3.1-7-7v-7.1z"
        fill="white"
      />
      <path d="M54.5 80h11c1.4 0 2.5-1.1 2.5-2.5S66.9 75 65.5 75h-11a2.5 2.5 0 1 0 0 5z" fill="#1d4ed8" />
    </svg>
  );
}
