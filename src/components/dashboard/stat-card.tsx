import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  tone: 'brand' | 'mint' | 'gold'
  className?: string
}

const TONE_CLASSES = {
  brand: 'bg-brand-100 text-brand-700',
  mint: 'bg-mint-100 text-mint-700',
  gold: 'bg-gold-gradient text-ink-950',
} as const

export function StatCard({ icon: Icon, label, value, tone, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)]',
        className,
      )}
    >
      <span className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-2xl', TONE_CLASSES[tone])}>
        <Icon className="size-5" />
      </span>
      <div>
        <p className="font-display text-2xl font-semibold leading-none tabular-nums">{value}</p>
        <p className="mt-1.5 text-xs font-medium text-[var(--muted-foreground)]">{label}</p>
      </div>
    </div>
  )
}
