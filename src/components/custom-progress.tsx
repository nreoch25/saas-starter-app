"use client";

import { cn } from "@/lib/utils";

type CustomProgressProps = {
  value?: number;
  className?: string;
  ariaLabel?: string;
};

export function CustomProgress({
  value = 0,
  className = "",
  ariaLabel = "Progress indicator",
}: CustomProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={cn("w-full bg-primary/20 rounded-full overflow-hidden")}
    >
      <div
        className={cn("bg-primary transition-all duration-300", className)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
