import { useState } from 'react'
import { Camera, Crown, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AVATAR_OPTIONS } from '@/lib/mock-data'
import type { PlanId } from '@/lib/pricing-data'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const CUSTOM_PHOTO_AVATAR_ID = 'custom-photo'

const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024

interface AvatarPickerProps {
  selectedId: string
  userPlan: PlanId
  onSelect: (id: string) => void
  photoUrl?: string
  onPhotoUpload: (dataUrl: string) => void
  onPhotoRemove: () => void
}

const GROUPS: { kind: 'gradient' | 'character' | 'elite'; title: string }[] = [
  { kind: 'gradient', title: 'Dégradés de couleur' },
  { kind: 'character', title: 'Personnages' },
  { kind: 'elite', title: 'Collection exclusive Élite' },
]

export function AvatarPicker({ selectedId, userPlan, onSelect, photoUrl, onPhotoUpload, onPhotoRemove }: AvatarPickerProps) {
  const [error, setError] = useState<string | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Choisis un fichier image (JPG, PNG…).')
      return
    }
    if (file.size > MAX_PHOTO_SIZE_BYTES) {
      setError('Cette image dépasse 5 Mo, choisis-en une plus légère.')
      return
    }

    setError(null)
    const reader = new FileReader()
    reader.onload = () => onPhotoUpload(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink-950">Photo de profil</h3>
        <div className="flex items-center gap-3">
          {photoUrl && (
            <button
              type="button"
              onClick={() => onSelect(CUSTOM_PHOTO_AVATAR_ID)}
              aria-label="Ta photo de profil"
              aria-pressed={selectedId === CUSTOM_PHOTO_AVATAR_ID}
              className={cn(
                'size-16 shrink-0 overflow-hidden rounded-2xl ring-offset-2 transition-all',
                selectedId === CUSTOM_PHOTO_AVATAR_ID
                  ? 'ring-2 ring-brand-500'
                  : 'ring-1 ring-[var(--border-subtle)] hover:ring-brand-300',
              )}
            >
              <img src={photoUrl} alt="Photo de profil" className="size-full object-cover" />
            </button>
          )}

          <label
            className={cn(
              'flex size-16 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed text-[var(--muted-foreground)] transition-colors',
              'border-[var(--border-subtle)] hover:border-brand-400 hover:text-brand-600',
            )}
          >
            <Camera className="size-4.5" />
            <span className="text-[10px] font-medium">{photoUrl ? 'Changer' : 'Importer'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>

          {photoUrl && (
            <button
              type="button"
              onClick={onPhotoRemove}
              className="text-xs font-medium text-[var(--muted-foreground)] underline-offset-2 hover:text-rose-accent-600 hover:underline"
            >
              Retirer
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-xs text-rose-accent-600">{error}</p>}
      </div>

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
