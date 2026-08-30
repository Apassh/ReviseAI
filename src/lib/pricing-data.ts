export type PlanId = 'free' | 'premium' | 'elite'

export interface PricingFeature {
  label: string
  /** Only shown/enabled from this plan tier upward. */
  included: boolean
}

export interface PricingPlan {
  id: PlanId
  name: string
  tagline: string
  /** Price in euros, billed monthly, no commitment. */
  monthlyPrice: number
  /** Equivalent monthly price when billed annually. */
  annualMonthlyPrice: number
  /** Total charged once a year when billed annually. */
  annualTotalPrice: number
  currency: '€'
  ctaLabel: string
  highlighted: boolean
  badgeLabel?: string
  contentLimit: string
  features: PricingFeature[]
}

/**
 * Single source of truth for all pricing + plan feature data.
 * Import this everywhere a price or plan feature is displayed
 * (pricing section, subscription management, badges, upsells)
 * so numbers can never drift between pages.
 */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Gratuit',
    tagline: 'Pour découvrir ReviseAI sans engagement',
    monthlyPrice: 0,
    annualMonthlyPrice: 0,
    annualTotalPrice: 0,
    currency: '€',
    ctaLabel: 'Commencer gratuitement',
    highlighted: false,
    contentLimit: '3 contenus actifs / mois',
    features: [
      { label: 'Fiches de révision générées par IA', included: true },
      { label: 'Quiz adaptatif avec feedback instantané', included: true },
      { label: '3 contenus actifs par mois (PDF ou YouTube)', included: true },
      { label: 'Flashcards', included: false },
      { label: 'Export PDF des fiches', included: false },
      { label: 'Collection d’avatars exclusive', included: false },
      { label: 'Support prioritaire', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Pour réviser sérieusement toute l’année',
    monthlyPrice: 9.99,
    annualMonthlyPrice: 7.49,
    annualTotalPrice: 89.9,
    currency: '€',
    ctaLabel: 'Passer à Premium',
    highlighted: true,
    badgeLabel: 'Le plus choisi',
    contentLimit: 'Contenus illimités',
    features: [
      { label: 'Fiches de révision générées par IA', included: true },
      { label: 'Quiz adaptatif avec feedback instantané', included: true },
      { label: 'Contenus illimités (PDF ou YouTube)', included: true },
      { label: 'Flashcards illimitées', included: true },
      { label: 'Export PDF des fiches', included: true },
      { label: 'Collection d’avatars exclusive', included: false },
      { label: 'Support prioritaire', included: false },
    ],
  },
  {
    id: 'elite',
    name: 'Élite',
    tagline: 'Pour viser l’excellence, sans compromis',
    monthlyPrice: 19.99,
    annualMonthlyPrice: 14.99,
    annualTotalPrice: 179.9,
    currency: '€',
    ctaLabel: 'Passer à Élite',
    highlighted: false,
    badgeLabel: 'Édition complète',
    contentLimit: 'Contenus illimités',
    features: [
      { label: 'Fiches de révision générées par IA', included: true },
      { label: 'Quiz adaptatif avec feedback instantané', included: true },
      { label: 'Contenus illimités (PDF ou YouTube)', included: true },
      { label: 'Flashcards illimitées', included: true },
      { label: 'Export PDF des fiches', included: true },
      { label: 'Collection d’avatars exclusive Élite', included: true },
      { label: 'Support prioritaire 7j/7', included: true },
    ],
  },
]

export function getPlanById(id: PlanId): PricingPlan {
  const plan = PRICING_PLANS.find((p) => p.id === id)
  if (!plan) throw new Error(`Unknown plan id: ${id}`)
  return plan
}

/** Rounded discount percentage of annual vs monthly billing, for display. */
export function getAnnualSavingsPercent(plan: PricingPlan): number {
  if (plan.monthlyPrice === 0) return 0
  return Math.round((1 - plan.annualMonthlyPrice / plan.monthlyPrice) * 100)
}

export function formatPrice(amount: number, currency: '€' = '€'): string {
  if (amount === 0) return `0${currency}`
  const formatted = Number.isInteger(amount) ? amount.toString() : amount.toFixed(2).replace('.', ',')
  return `${formatted}${currency}`
}
