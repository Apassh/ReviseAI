import { Check, Crown, Sparkles, Star, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { formatPrice, type PricingPlan } from '@/lib/pricing-data'

interface PricingCardProps {
  plan: PricingPlan
  billingCycle: 'monthly' | 'annual'
  onSelect?: (planId: PricingPlan['id']) => void
  isCurrentPlan?: boolean
  className?: string
}

const PLAN_ICON = { free: Sparkles, premium: Sparkles, elite: Crown } as const

/** Per-plan accent tones for this card only — keeps the rest of the app's neutral palette untouched. */
const PLAN_TONE = {
  free: {
    iconBg: 'bg-gray-100 text-gray-500',
    checkBg: 'bg-gray-100 text-gray-500',
    annualColor: '',
    buttonVariant: 'secondary' as const,
  },
  premium: {
    iconBg: 'bg-violet-100 text-violet-600',
    checkBg: 'bg-violet-100 text-violet-600',
    annualColor: 'text-violet-600',
    buttonVariant: 'default' as const,
  },
  elite: {
    iconBg: 'bg-amber-100 text-amber-600',
    checkBg: 'bg-amber-100 text-amber-600',
    annualColor: 'text-amber-600',
    buttonVariant: 'gold' as const,
  },
}

/**
 * The one pricing card used on the landing page's pricing section AND the
 * subscription management page's "change plan" view — keeps price/feature
 * display identical everywhere a plan can be chosen.
 */
export function PricingCard({ plan, billingCycle, onSelect, isCurrentPlan, className }: PricingCardProps) {
  const price = billingCycle === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice
  const Icon = PLAN_ICON[plan.id]
  const tone = PLAN_TONE[plan.id]

  return (
    <div
      className={cn(
        'relative flex flex-col gap-6 rounded-[var(--radius-card)] border bg-white p-8',
        plan.highlighted
          ? 'border-2 border-violet-500 shadow-[0_8px_30px_-8px_rgba(139,92,246,0.35)] md:-translate-y-2'
          : 'border-gray-200 shadow-sm',
        className,
      )}
    >
      {plan.badgeLabel && (
        <span
          className={cn(
            'absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-sm',
            plan.id === 'elite'
              ? 'bg-[linear-gradient(135deg,#f59e0b_0%,#c2410c_100%)]'
              : 'bg-[linear-gradient(135deg,#8b5cf6_0%,#ec4899_100%)]',
          )}
        >
          {plan.id === 'elite' ? (
            <Crown className="size-3.5" fill="currentColor" />
          ) : (
            <Star className="size-3.5" fill="currentColor" />
          )}
          {plan.badgeLabel}
        </span>
      )}

      <div className="flex items-center gap-2.5">
        <span className={cn('inline-flex size-9 items-center justify-center rounded-xl', tone.iconBg)}>
          <Icon className="size-4.5" />
        </span>
        <h3 className="font-display text-xl font-bold text-gray-900">{plan.name}</h3>
      </div>

      <p className="-mt-4 truncate text-sm text-gray-500">{plan.tagline}</p>

      <div>
        <div className="flex items-end gap-1.5">
          <span className="font-display text-5xl font-bold tabular-nums text-gray-900">{formatPrice(price)}</span>
          <span className="pb-1.5 text-sm text-gray-400">/mois</span>
        </div>
        {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
          <p className={cn('mt-1.5 text-xs font-semibold', tone.annualColor)}>
            Facturé {formatPrice(plan.annualTotalPrice)} / an
          </p>
        )}
      </div>

      <Button
        variant={tone.buttonVariant}
        size="lg"
        className="w-full"
        disabled={isCurrentPlan}
        onClick={() => onSelect?.(plan.id)}
      >
        {isCurrentPlan ? 'Formule actuelle' : plan.ctaLabel}
      </Button>

      <ul className="flex flex-col gap-4">
        <li className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{plan.contentLimit}</li>
        {plan.features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-3 text-sm">
            {feature.included ? (
              <span className={cn('mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full', tone.checkBg)}>
                <Check className="size-3" strokeWidth={3} />
              </span>
            ) : (
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <X className="size-3" strokeWidth={2.5} />
              </span>
            )}
            <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>{feature.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
