import { Crown, Lock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PlanId } from '@/lib/pricing-data'
import { getPlanById } from '@/lib/pricing-data'

interface PlanBadgeProps {
  plan: PlanId
  className?: string
  /** Compact renders icon-only (for tight spaces like content cards). */
  compact?: boolean
}

const PLAN_STYLES: Record<PlanId, { icon: typeof Crown; classes: string }> = {
  free: { icon: Sparkles, classes: 'bg-[var(--muted)] text-[var(--muted-foreground)] border-transparent' },
  premium: { icon: Sparkles, classes: 'bg-brand-100 text-brand-700 border-brand-200' },
  elite: { icon: Crown, classes: 'bg-gold-gradient text-ink-950 border-transparent' },
}

/**
 * Single reusable badge used everywhere a plan tier needs to be signaled:
 * pricing cards, subscription page, dashboard/profile "premium only" locks.
 */
export function PlanBadge({ plan, className, compact = false }: PlanBadgeProps) {
  const { icon: Icon, classes } = PLAN_STYLES[plan]
  const { name } = getPlanById(plan)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap',
        classes,
        compact && 'p-1.5',
        className,
      )}
    >
      <Icon className="size-3.5" />
      {!compact && name}
    </span>
  )
}

/** Small crown/lock indicator for gating a specific feature to a plan tier. */
export function FeatureLockBadge({ plan, className }: { plan: PlanId; className?: string }) {
  if (plan === 'free') return null
  const Icon = plan === 'elite' ? Crown : Lock
  return (
    <span
      title={`Fonctionnalité ${getPlanById(plan).name}`}
      className={cn(
        'inline-flex size-5 items-center justify-center rounded-full',
        plan === 'elite' ? 'bg-gold-gradient text-ink-950' : 'bg-brand-100 text-brand-700',
        className,
      )}
    >
      <Icon className="size-3" />
    </span>
  )
}
