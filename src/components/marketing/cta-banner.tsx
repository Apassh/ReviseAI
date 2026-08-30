import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-brand-gradient px-8 py-14 text-center text-white sm:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-mint-400/25 blur-3xl"
        />
        <h2 className="relative font-display text-3xl font-semibold text-balance sm:text-4xl">
          Prêt·e à réviser deux fois plus vite ?
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-balance text-white/85">
          Rejoins les étudiants qui ont déjà transformé leurs cours en fiches et quiz personnalisés.
        </p>
        <div className="relative mt-7 flex justify-center">
          <Button asChild size="lg" variant="mint">
            <Link to="/inscription">
              Commencer gratuitement <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
