import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroPreviewCard } from './hero-preview-card'
import { useSectionLink } from '@/hooks/use-section-link'

export function Hero() {
  const goToSection = useSectionLink()

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-brand-300/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 left-[-12%] h-[22rem] w-[22rem] rounded-full bg-mint-300/25 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-20 md:grid-cols-2 md:pt-24 md:pb-28">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            Propulsé par l’IA · Pensé pour les étudiants
          </span>

          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink-950 sm:text-5xl">
            Investis dans ta réussite,{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">un cours à la fois</span>
          </h1>

          <p className="mt-5 max-w-lg text-balance text-lg text-[var(--muted-foreground)]">
            Chaque minute investie aujourd’hui, c’est du stress en moins demain. Dépose un PDF ou un lien
            YouTube : ReviseAI génère ta fiche de révision et ton quiz en quelques secondes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/inscription">
                Commencer gratuitement <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#comment-ca-marche" onClick={goToSection('comment-ca-marche')}>
                <PlayCircle className="size-4" /> Voir comment ça marche
              </a>
            </Button>
          </div>

          <p className="mt-5 text-xs text-[var(--muted-foreground)]">
            Sans carte bancaire · 3 contenus offerts chaque mois
          </p>
        </div>

        <HeroPreviewCard className="mx-auto w-full max-w-md" />
      </div>
    </section>
  )
}
