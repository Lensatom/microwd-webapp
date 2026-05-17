"use client";

import { cn } from "@/shared/lib/utils";

type LoaderProps = {
  size?: number;
  className?: string;
  label?: string;
};

function Loader({ size = 30, className, label }: LoaderProps) {
  const ballSize = Math.max(6, Math.round(size * 0.45));

  return (
    <div
      className={cn("flex flex-col items-center gap-3", className)}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-end justify-center gap-2" role="status">
        <span
          className="bg-primary-light rounded-full animate-bounce"
          style={{
            width: ballSize,
            height: ballSize,
            animationDuration: "600ms",
            animationDelay: "0ms",
          }}
          aria-hidden="true"
        />
        <span
          className="bg-primary-light rounded-full animate-bounce"
          style={{
            width: ballSize,
            height: ballSize,
            animationDuration: "600ms",
            animationDelay: "120ms",
          }}
          aria-hidden="true"
        />
        <span
          className="bg-primary-light rounded-full animate-bounce"
          style={{
            width: ballSize,
            height: ballSize,
            animationDuration: "600ms",
            animationDelay: "240ms",
          }}
          aria-hidden="true"
        />
      </div>

      {label ? <div className="text-sm text-primary-light"></div> : null}
    </div>
  );
}

export default Loader;
