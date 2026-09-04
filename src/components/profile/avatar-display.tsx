import { cn } from '@/lib/utils'
import { AVATAR_OPTIONS } from '@/lib/mock-data'

interface AvatarDisplayProps {
  avatarId: string
  photoUrl?: string
  className?: string
  emojiClassName?: string
}

/** Renders a user's chosen avatar (uploaded photo, gradient swatch, character, or elite emoji) consistently everywhere. */
export function AvatarDisplay({ avatarId, photoUrl, className, emojiClassName }: AvatarDisplayProps) {
  if (photoUrl) {
    return (
      <div className={cn('flex size-10 items-center justify-center overflow-hidden rounded-full ring-2 ring-white', className)}>
        <img src={photoUrl} alt="Photo de profil" className="size-full object-cover" />
      </div>
    )
  }

  const avatar = AVATAR_OPTIONS.find((a) => a.id === avatarId) ?? AVATAR_OPTIONS[0]

  return (
    <div
      className={cn('flex size-10 items-center justify-center rounded-full ring-2 ring-white', className)}
      style={avatar.kind === 'gradient' ? { backgroundImage: avatar.swatch } : { backgroundColor: 'var(--muted)' }}
    >
      {avatar.emoji && <span className={cn('leading-none', emojiClassName ?? 'text-lg')}>{avatar.emoji}</span>}
    </div>
  )
}
