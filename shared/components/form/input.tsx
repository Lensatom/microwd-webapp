import { cn } from "@/shared/lib/utils"
import { ComponentProps, useId } from "react";

function Input({ className, type, error, label, ...props }: ComponentProps<"input"> & { error?: string, label?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm text-primary-light">{label}</label>
      <input
        id={id}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground text-primary-light placeholder:text-primary-light/40 selection:bg-primary-light selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border border-primary-light/20 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary-light",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          error && "border-red-400",
          label && "mt-1",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

export { Input }
