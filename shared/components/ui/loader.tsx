"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/shared/lib/utils"

type LoaderProps = {
  size?: number
  className?: string
  label?: string
}

function Loader({ size = 20, className, label }: LoaderProps) {
  const shellSize = Math.max(size * 3, 64)

  return (
    <div className={cn("flex flex-col items-center gap-4", className)} aria-live="polite" aria-busy="true">
      <div
        className="relative grid place-items-center"
        style={{ width: shellSize, height: shellSize }}
      >
        <span className="absolute inset-0 rounded-full bg-primary-light/10 blur-md animate-pulse" aria-hidden="true" />
        <span className="absolute inset-1 rounded-full border border-primary-light/25" aria-hidden="true" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-light/70 border-r-primary-light/40 animate-spin" aria-hidden="true" />
        <span className="absolute inset-3 rounded-full border border-primary-light/35 animate-pulse" aria-hidden="true" />
        <Loader2 className="text-primary-light animate-spin" size={size} strokeWidth={2.4} aria-hidden="true" />
      </div>

      {label ? (
        <div className="flex items-center gap-2 text-md text-primary-light">
          <span>{label}</span>
        </div>
      ) : null}
    </div>
  )
}

export default Loader