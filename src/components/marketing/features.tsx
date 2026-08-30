import { BarChart3, FileStack, LayoutList, Sparkles, Trophy, Video } from 'lucide-react'
import { cn } from '@/lib/utils'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Fiches générées par IA',
    description: 'Définitions, concepts clés et exemples concrets, structurés automatiquement à partir de ton cours.',
    span: 'md:col-span-2',
    tone: 'brand',
  },
  {
    icon: LayoutList,
    title: 'Quiz adaptatif',
    description: 'La difficulté s’ajuste à tes réponses, avec un feedback instantané.',
    span: '',
    tone: 'mint',
  },
  {
    icon: FileStack,
    title: 'Flashcards',
    description: 'Mémorise l’essentiel par répétition espacée. Fonctionnalité Premium.',
    span: '',
    tone: 'gold',
  },
  {
    icon: Video,
    title: 'PDF ou vidéo YouTube',
    description: 'Importe un poly de cours ou colle simplement un lien de vidéo.',
    span: '',
    tone: 'brand',
  },
  {
    icon: BarChart3,
    title: 'Suivi de progression',
    description: 'Une vue claire de ce que tu maîtrises et de ce qu’il reste à réviser.',
    span: '',
    tone: 'mint',
  },
  {
    icon: Trophy,
    title: 'Gamification',
    description: 'Séries de révision, statistiques et avatars exclusifs pour rester motivé·e.',
    span: 'md:col-span-2',
    tone: 'gold',
  },
] as const

const TONE_CLASSES = {
  brand: 'bg-brand-100 text-brand-700',
  mint: 'bg-mint-100 text-mint-700',
  gold: 'bg-gold-gradient text-ink-950',
} as const

export function Features() {
  return (
    <section id="fonctionnalites" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">
            Tout ce qu’il te faut pour réviser efficacement
          </h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Une seule appli, de l’import du cours jusqu’à la maîtrise du sujet.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                'rounded-[var(--radius-card)] border border-[var(--border-subtle)] p-6',
                feature.span,
              )}
            >
              <span className={cn('inline-flex size-10 items-center justify-center rounded-xl', TONE_CLASSES[feature.tone])}>
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted-foreground)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
