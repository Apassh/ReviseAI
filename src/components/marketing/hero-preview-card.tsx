import { CheckCircle2, FileText, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Stylized preview of an AI-generated revision sheet + quiz.
 * Reused on the landing hero and the auth screens' side panel so the
 * product's value is visible, not just described.
 */
export function HeroPreviewCard({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute -top-4 -left-4 z-10 hidden -rotate-6 items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-white px-3.5 py-2 shadow-[var(--shadow-lift)] sm:flex">
        <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-mint-gradient text-white">
          <CheckCircle2 className="size-3.5" />
        </span>
        <p className="text-xs font-semibold whitespace-nowrap">Quiz terminé · 9/10</p>
      </div>

      <div className="rounded-[var(--radius-blob)] border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-lift)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <FileText className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">Thermodynamique — Ch. 3</p>
              <p className="text-xs text-[var(--muted-foreground)]">Fiche générée en 42 secondes</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-mint-100 px-2 py-0.5 text-[11px] font-semibold text-mint-700">
            <Sparkles className="size-3" /> IA
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <div className="rounded-xl bg-[var(--muted)] p-3.5">
            <p className="text-xs font-semibold text-brand-700">Définition clé</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-950/80">
              L’entropie mesure le désordre d’un système ; elle ne peut qu’augmenter dans un système isolé.
            </p>
          </div>
          <div className="rounded-xl bg-[var(--muted)] p-3.5">
            <p className="text-xs font-semibold text-brand-700">Exemple concret</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-950/80">
              Un glaçon qui fond dans un verre d’eau chaude illustre le 2e principe.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          <p className="text-xs font-medium text-[var(--muted-foreground)]">Progression de la fiche</p>
          <p className="text-xs font-semibold text-mint-700">78%</p>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]">
          <div className="h-full w-[78%] rounded-full bg-mint-gradient" />
        </div>
      </div>
    </div>
  )
}
