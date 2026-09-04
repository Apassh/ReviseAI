import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-brand-gradient text-white shadow-[var(--shadow-lift)] hover:brightness-110 active:brightness-95',
        mint: 'bg-mint-gradient text-white shadow-[var(--shadow-mint)] hover:brightness-110 active:brightness-95',
        gold: 'bg-[linear-gradient(135deg,#b45309_0%,#92400e_100%)] text-white shadow-[var(--shadow-lift)] hover:brightness-110 active:brightness-95',
        outline:
          'border border-[var(--border-subtle)] bg-white text-ink-950 hover:bg-brand-50 hover:border-brand-200',
        secondary: 'bg-[var(--muted)] text-ink-950 hover:bg-brand-100',
        ghost: 'hover:bg-[var(--muted)] text-ink-950',
        link: 'text-brand-600 underline-offset-4 hover:underline font-medium',
        destructiveLink: 'text-rose-accent-600 underline-offset-4 hover:underline font-medium',
      },
      size: {
        default: 'h-11 px-5 py-2 has-[>svg]:px-4',
        sm: 'h-9 rounded-lg px-3.5 text-[0.8125rem] has-[>svg]:px-3',
        lg: 'h-[3.25rem] rounded-2xl px-7 text-base has-[>svg]:px-6',
        icon: 'size-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
