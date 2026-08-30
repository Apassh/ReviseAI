import { Star } from 'lucide-react'
import { HeroPreviewCard } from '@/components/marketing/hero-preview-card'

export function AuthSidePanel() {
  return (
    <div className="relative hidden overflow-hidden bg-brand-gradient px-10 py-14 lg:flex lg:w-[46%] lg:flex-col lg:justify-between">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-mint-400/20 blur-3xl"
      />
      <div className="relative">
        <h2 className="max-w-sm text-balance font-display text-3xl font-semibold leading-tight text-white">
          Chaque minute investie aujourd’hui, c’est du stress en moins demain.
        </h2>
        <p className="mt-4 max-w-sm text-white/80">
          Dépose ton cours, ReviseAI génère ta fiche et ton quiz pendant que tu souffles.
        </p>
      </div>

      <div className="relative">
        <HeroPreviewCard className="max-w-sm scale-[0.96]" />
      </div>

      <div className="relative flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
        <div className="flex -space-x-0.5 text-gold-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4" fill="currentColor" />
          ))}
        </div>
        <p className="text-sm text-white/90">
          « J’ai gagné un temps fou avant mes partiels. » <span className="text-white/60">— Inès, L2 Économie</span>
        </p>
      </div>
    </div>
  )
}
