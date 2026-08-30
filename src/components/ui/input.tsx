import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full rounded-xl border border-[var(--border-subtle)] bg-white px-3.5 py-2 text-sm shadow-xs transition-colors outline-none',
        'placeholder:text-[var(--muted-foreground)]',
        'focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-200',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
