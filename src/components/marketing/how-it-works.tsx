import { Brain, ListChecks, UploadCloud } from 'lucide-react'

const STEPS = [
  {
    icon: UploadCloud,
    title: 'Dépose ton contenu',
    description: 'Un PDF de cours ou le lien d’une vidéo YouTube : ReviseAI s’occupe du reste, en moins d’une minute.',
    accent: 'brand',
  },
  {
    icon: Brain,
    title: 'L’IA crée ta fiche',
    description: 'Définitions, concepts clés et exemples concrets sont extraits et organisés automatiquement.',
    accent: 'mint',
  },
  {
    icon: ListChecks,
    title: 'Quiz adaptatif',
    description: 'Un quiz s’ajuste à ton niveau au fil des réponses, avec un feedback instantané pour progresser.',
    accent: 'gold',
  },
] as const

const ACCENT_CLASSES = {
  brand: 'bg-brand-gradient',
  mint: 'bg-mint-gradient',
  gold: 'bg-gold-gradient',
} as const

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">Comment ça marche</h2>
        <p className="mt-3 text-[var(--muted-foreground)]">
          Trois étapes pour transformer n’importe quel cours en révision active.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-7 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
          >
            <span className="font-display text-5xl font-semibold text-brand-100 select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`mt-[-2.25rem] mb-4 inline-flex size-11 items-center justify-center rounded-2xl text-white ${ACCENT_CLASSES[step.accent]}`}
            >
              <step.icon className="size-5" />
            </span>
            <h3 className="font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
