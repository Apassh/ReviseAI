import { Crown, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AVATAR_OPTIONS } from '@/lib/mock-data'
import type { PlanId } from '@/lib/pricing-data'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface AvatarPickerProps {
  selectedId: string
  userPlan: PlanId
  onSelect: (id: string) => void
}

const GROUPS: { kind: 'gradient' | 'character' | 'elite'; title: string }[] = [
  { kind: 'gradient', title: 'Dégradés de couleur' },
  { kind: 'character', title: 'Personnages' },
  { kind: 'elite', title: 'Collection exclusive Élite' },
]

export function AvatarPicker({ selectedId, userPlan, onSelect }: AvatarPickerProps) {
  return (
    <div className="flex flex-col gap-6">
      {GROUPS.map((group) => {
        const options = AVATAR_OPTIONS.filter((a) => a.kind === group.kind)
        return (
          <div key={group.kind}>
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-sm font-semibold text-ink-950">{group.title}</h3>
              {group.kind === 'elite' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold-gradient px-2 py-0.5 text-[11px] font-semibold text-ink-950">
                  <Crown className="size-3" /> Élite
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
              {options.map((avatar) => {
                const locked = avatar.requiresPlan === 'elite' && userPlan !== 'elite'
                const selected = avatar.id === selectedId

                const button = (
                  <button
                    key={avatar.id}
                    type="button"
                    disabled={locked}
                    onClick={() => onSelect(avatar.id)}
                    aria-label={avatar.label}
                    aria-pressed={selected}
                    className={cn(
                      'relative flex aspect-square items-center justify-center rounded-2xl text-xl transition-all',
                      'ring-offset-2',
                      selected ? 'ring-2 ring-brand-500' : 'ring-1 ring-[var(--border-subtle)] hover:ring-brand-300',
                      locked && 'cursor-not-allowed opacity-50 grayscale',
                    )}
                    style={
                      avatar.kind === 'gradient'
                        ? { backgroundImage: avatar.swatch }
                        : { backgroundColor: 'var(--muted)' }
                    }
                  >
                    {avatar.emoji}
                    {locked && (
                      <span className="absolute -top-1.5 -right-1.5 inline-flex size-5 items-center justify-center rounded-full bg-gold-gradient text-ink-950 shadow-sm">
                        <Lock className="size-2.5" />
                      </span>
                    )}
                  </button>
                )

                if (!locked) return button

                return (
                  <Tooltip key={avatar.id}>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent>Réservé à la formule Élite</TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
