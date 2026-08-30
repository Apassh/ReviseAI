import { useState } from 'react'
import { Download, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PricingCard } from '@/components/pricing/pricing-card'
import { PlanBadge } from '@/components/pricing/plan-badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'
import { MOCK_INVOICES } from '@/lib/mock-data'
import { PRICING_PLANS, formatPrice, getPlanById, type PlanId } from '@/lib/pricing-data'

export function SubscriptionPage() {
  const { user, setPlan, setBillingCycle } = useAuth()
  const [showAllPlans, setShowAllPlans] = useState(false)
  const currentPlan = getPlanById(user.plan)
  const price = user.billingCycle === 'annual' ? currentPlan.annualMonthlyPrice : currentPlan.monthlyPrice

  function handleChoosePlan(planId: PlanId) {
    setPlan(planId)
    setShowAllPlans(false)
  }

  function handleCancel() {
    setPlan('free')
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Gestion de l’abonnement</h1>
      <p className="mt-1 text-[var(--muted-foreground)]">Ta formule, ta facturation, tout au même endroit.</p>

      <div className="mt-8 flex flex-col gap-6">
        <Card className="border-brand-200">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>Formule active</CardTitle>
                  <PlanBadge plan={user.plan} />
                </div>
                <CardDescription className="mt-1.5">{currentPlan.tagline}</CardDescription>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-semibold tabular-nums">{formatPrice(price)}<span className="text-sm font-sans font-medium text-[var(--muted-foreground)]">/mois</span></p>
                {user.plan !== 'free' && (
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Facturé en {user.billingCycle === 'annual' ? 'annuel' : 'mensuel'}
                    {user.nextBillingDate && ` · renouvellement le ${new Date(user.nextBillingDate).toLocaleDateString('fr-FR')}`}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setShowAllPlans((v) => !v)}>
                {showAllPlans ? 'Masquer les formules' : 'Changer de formule'}
              </Button>
              {user.plan !== 'free' && (
                <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-white p-1">
                  {(['monthly', 'annual'] as const).map((cycle) => (
                    <button
                      key={cycle}
                      type="button"
                      onClick={() => setBillingCycle(cycle)}
                      className={
                        'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ' +
                        (user.billingCycle === cycle ? 'bg-brand-gradient text-white' : 'text-[var(--muted-foreground)]')
                      }
                    >
                      {cycle === 'monthly' ? 'Mensuel' : 'Annuel'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {showAllPlans && (
          <div className="grid gap-5 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingCycle={user.billingCycle === 'annual' ? 'annual' : 'monthly'}
                isCurrentPlan={plan.id === user.plan}
                onSelect={handleChoosePlan}
              />
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-4.5 text-brand-600" /> Factures
            </CardTitle>
            <CardDescription>L’historique de tes paiements ReviseAI.</CardDescription>
          </CardHeader>
          <CardContent>
            {user.plan === 'free' ? (
              <p className="text-sm text-[var(--muted-foreground)]">
                Aucune facture pour l’instant — tu es sur la formule Gratuite.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-[var(--border-subtle)]">
                {MOCK_INVOICES.map((invoice) => (
                  <li key={invoice.id} className="flex items-center justify-between py-3 text-sm">
                    <div>
                      <p className="font-medium text-ink-950">
                        Formule {invoice.planName} — {new Date(invoice.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-mint-700">Payée</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold tabular-nums">{formatPrice(invoice.amount)}</span>
                      <Button variant="ghost" size="icon" aria-label="Télécharger la facture">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {user.plan !== 'free' && (
          <div className="pt-2 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="text-sm font-medium text-[var(--muted-foreground)] underline-offset-2 hover:text-rose-accent-600 hover:underline">
                  Annuler mon abonnement
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Annuler ton abonnement ?</DialogTitle>
                  <DialogDescription>
                    Tu perdras l’accès aux contenus illimités, aux flashcards et à la collection d’avatars exclusive
                    à la fin de la période déjà payée. Tu peux te réabonner à tout moment.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Garder mon abonnement</Button>
                  <Button variant="destructiveLink" onClick={handleCancel}>
                    Confirmer l’annulation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </main>
  )
}
