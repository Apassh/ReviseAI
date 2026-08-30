import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-brand-100 text-brand-700 border-brand-200',
        mint: 'bg-mint-100 text-mint-700 border-mint-200',
        gold: 'bg-gold-gradient text-ink-950 border-transparent',
        outline: 'text-ink-950 border-[var(--border-subtle)] bg-white',
        neutral: 'bg-[var(--muted)] text-[var(--muted-foreground)] border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
