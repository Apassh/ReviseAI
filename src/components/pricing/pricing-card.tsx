import { Check, Crown, Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, type PricingPlan } from '@/lib/pricing-data'

interface PricingCardProps {
  plan: PricingPlan
  billingCycle: 'monthly' | 'annual'
  onSelect?: (planId: PricingPlan['id']) => void
  isCurrentPlan?: boolean
  className?: string
}

const PLAN_ICON = { free: Sparkles, premium: Sparkles, elite: Crown } as const

/**
 * The one pricing card used on the landing page's pricing section AND the
 * subscription management page's "change plan" view — keeps price/feature
 * display identical everywhere a plan can be chosen.
 */
export function PricingCard({ plan, billingCycle, onSelect, isCurrentPlan, className }: PricingCardProps) {
  const price = billingCycle === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice
  const Icon = PLAN_ICON[plan.id]

  return (
    <div
      className={cn(
        'relative flex flex-col gap-6 rounded-[var(--radius-card)] border bg-white p-7',
        plan.highlighted
          ? 'border-brand-300 shadow-[var(--shadow-lift)] md:-translate-y-2'
          : 'border-[var(--border-subtle)] shadow-[var(--shadow-soft)]',
        plan.id === 'elite' && 'bg-noise-card',
        className,
      )}
    >
      {plan.badgeLabel && (
        <Badge
          variant={plan.id === 'elite' ? 'gold' : 'default'}
          className="absolute -top-3 left-7"
        >
          {plan.badgeLabel}
        </Badge>
      )}

      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'inline-flex size-9 items-center justify-center rounded-xl',
            plan.id === 'elite' ? 'bg-gold-gradient text-ink-950' : 'bg-brand-100 text-brand-700',
          )}
        >
          <Icon className="size-4.5" />
        </span>
        <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
      </div>

      <p className="text-sm text-[var(--muted-foreground)] -mt-4">{plan.tagline}</p>

      <div className="flex items-end gap-1.5">
        <span className="font-display text-4xl font-semibold tabular-nums">{formatPrice(price)}</span>
        <span className="pb-1 text-sm text-[var(--muted-foreground)]">/mois</span>
      </div>
      {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
        <p className="-mt-4 text-xs font-medium text-mint-700">
          Facturé {formatPrice(plan.annualTotalPrice)} / an
        </p>
      )}

      <Button
        variant={plan.id === 'elite' ? 'default' : plan.highlighted ? 'default' : 'outline'}
        size="lg"
        className="w-full"
        disabled={isCurrentPlan}
        onClick={() => onSelect?.(plan.id)}
      >
        {isCurrentPlan ? 'Formule actuelle' : plan.ctaLabel}
      </Button>

      <ul className="flex flex-col gap-3">
        <li className="text-xs font-semibold tracking-wide text-[var(--muted-foreground)] uppercase">
          {plan.contentLimit}
        </li>
        {plan.features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-2.5 text-sm">
            {feature.included ? (
              <Check className="mt-0.5 size-4 shrink-0 text-mint-600" />
            ) : (
              <X className="mt-0.5 size-4 shrink-0 text-[var(--muted-foreground)]/50" />
            )}
            <span className={feature.included ? 'text-ink-950' : 'text-[var(--muted-foreground)]'}>
              {feature.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
