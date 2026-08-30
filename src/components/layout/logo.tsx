import { Link } from 'react-router-dom'
import { Sparkle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2 shrink-0', className)}>
      <span className="inline-flex size-8 items-center justify-center rounded-[10px] bg-brand-gradient text-white shadow-[var(--shadow-mint)]">
        <Sparkle className="size-4.5" fill="currentColor" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-ink-950">
        Revise<span className="text-brand-600">AI</span>
      </span>
    </Link>
  )
}
