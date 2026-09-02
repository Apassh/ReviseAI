import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#cfa1ff,#f22d64)',
  'linear-gradient(135deg,#b06bff,#f22d64)',
  'linear-gradient(135deg,#9333ea,#dd1650)',
  'linear-gradient(135deg,#7c1fd6,#b90f42)',
]

/** Compact social-proof strip: avatar stack + rating. Used on the landing hero. */
export function TrustBadges({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      <div className="flex items-center gap-2.5">
        <div className="flex -space-x-2.5">
          {AVATAR_GRADIENTS.map((gradient, i) => (
            <span
              key={i}
              className="size-7 rounded-full ring-2 ring-[var(--background)]"
              style={{ backgroundImage: gradient }}
            />
          ))}
        </div>
        <span className="text-sm">
          <span className="font-semibold text-ink-950">+2000</span>{' '}
          <span className="text-[var(--muted-foreground)]">étudiants</span>
        </span>
      </div>

      <span className="hidden h-4 w-px bg-[var(--border-subtle)] sm:block" aria-hidden />

      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5 text-gold-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <span className="text-sm">
          <span className="font-semibold text-ink-950">4.9/5</span>{' '}
          <span className="text-[var(--muted-foreground)]">satisfaction</span>
        </span>
      </div>
    </div>
  )
}
