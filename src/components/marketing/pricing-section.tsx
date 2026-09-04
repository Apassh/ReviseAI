import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { PricingCard } from '@/components/pricing/pricing-card'
import { PRICING_PLANS } from '@/lib/pricing-data'

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const navigate = useNavigate()

  return (
    <section id="tarifs" className="bg-white px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">Une formule pour chaque étudiant</h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Commence gratuitement, passe à la vitesse supérieure quand tu es prêt·e.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-white p-1">
            {(['monthly', 'annual'] as const).map((cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => setBillingCycle(cycle)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
                  billingCycle === cycle ? 'bg-brand-gradient text-white' : 'text-[var(--muted-foreground)]',
                )}
              >
                {cycle === 'monthly' ? 'Mensuel' : 'Annuel'}
              </button>
            ))}
          </div>
          {billingCycle === 'annual' && (
            <span className="ml-3 inline-flex items-center rounded-full bg-mint-100 px-2.5 py-1 text-xs font-semibold text-mint-700">
              jusqu’à -25%
            </span>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              onSelect={() => navigate('/inscription')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
