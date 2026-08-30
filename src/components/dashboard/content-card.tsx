import { Link } from 'react-router-dom'
import { CheckCircle2, FileText, Loader2, Sparkles, Video } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { ContentItem } from '@/lib/types'

const SOURCE_STYLES = {
  pdf: {
    icon: FileText,
    label: 'PDF',
    iconClasses: 'bg-brand-100 text-brand-700',
  },
  youtube: {
    icon: Video,
    label: 'Vidéo YouTube',
    iconClasses: 'bg-gold-gradient text-ink-950',
  },
} as const

export function ContentCard({ content }: { content: ContentItem }) {
  const source = SOURCE_STYLES[content.sourceType]

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3.5">
        <span className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-2xl', source.iconClasses)}>
          <source.icon className="size-5" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-ink-950">{content.title}</h3>
            {content.hasFlashcards && (
              <span className="inline-flex items-center gap-1 rounded-full bg-mint-100 px-2 py-0.5 text-[11px] font-semibold text-mint-700">
                <Sparkles className="size-3" /> Flashcards
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
            {content.subject} · {source.label}
          </p>

          <div className="mt-3 w-56 max-w-full">
            {content.status === 'processing' ? (
              <div className="flex items-center gap-2 text-xs font-medium text-brand-600">
                <Loader2 className="size-3.5 animate-spin" />
                Génération de la fiche en cours…
              </div>
            ) : content.status === 'ready' ? (
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)]">
                <span className="inline-block size-1.5 rounded-full bg-brand-400" />
                Prête · pas encore commencée
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink-950">{content.progress}%</span>
                  {content.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-mint-700">
                      <CheckCircle2 className="size-3.5" /> Terminé
                    </span>
                  )}
                </div>
                <Progress
                  value={content.progress}
                  className="mt-1"
                  indicatorClassName={content.status === 'completed' ? 'bg-mint-gradient' : undefined}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <Button asChild variant={content.status === 'processing' ? 'secondary' : 'outline'} size="sm" disabled={content.status === 'processing'}>
        <Link to={`/tableau-de-bord/contenu/${content.id}`}>
          {content.status === 'ready' && 'Commencer'}
          {content.status === 'in_progress' && 'Continuer'}
          {content.status === 'completed' && 'Revoir'}
          {content.status === 'processing' && 'En traitement'}
        </Link>
      </Button>
    </div>
  )
}
