import { useState } from 'react'
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { Flashcard } from '@/lib/types'

export function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = cards[index]

  function go(delta: number) {
    setFlipped(false)
    setIndex((i) => (i + delta + cards.length) % cards.length)
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-medium text-[var(--muted-foreground)]">
        Carte {index + 1} / {cards.length}
      </p>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? 'Voir la question' : 'Voir la réponse'}
        className="mt-4 aspect-[3/2] w-full max-w-md cursor-pointer"
        style={{ perspective: '1200px' }}
      >
        <div
          className={cn('preserve-3d relative size-full transition-transform duration-500 ease-out', flipped && '[transform:rotateY(180deg)]')}
        >
          <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-[var(--radius-blob)] border border-[var(--border-subtle)] bg-white p-8 text-center shadow-[var(--shadow-lift)]">
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-brand-600 uppercase">Question</p>
              <p className="mt-3 font-display text-xl font-semibold text-balance">{card.front}</p>
            </div>
          </div>
          <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-[var(--radius-blob)] border border-mint-200 bg-mint-50 p-8 text-center shadow-[var(--shadow-lift)] [transform:rotateY(180deg)]">
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-mint-700 uppercase">Réponse</p>
              <p className="mt-3 text-base leading-relaxed text-ink-950/85">{card.back}</p>
            </div>
          </div>
        </div>
      </button>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
        <RefreshCw className="size-3" /> Clique sur la carte pour la retourner
      </p>

      <div className="mt-5 flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Carte précédente">
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Carte suivante">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
