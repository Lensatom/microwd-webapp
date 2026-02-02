"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/shared/lib/utils"

type LoaderProps = {
  size?: number
  className?: string
  label?: string
}

function Loader({ size = 20, className, label }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)} aria-live="polite" aria-busy="true">
      <Loader2 className="animate-spin text-primary-light" size={size} aria-hidden="true" />
      {label ? <span className="text-sm text-primary-light">{label}</span> : null}
    </div>
  )
}

export default Loader