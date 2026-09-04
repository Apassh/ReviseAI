import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AvatarDisplay } from '@/components/profile/avatar-display'
import { AvatarPicker, CUSTOM_PHOTO_AVATAR_ID } from '@/components/profile/avatar-picker'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { AVATAR_OPTIONS } from '@/lib/mock-data'
import { STUDY_LEVELS } from '@/lib/study-levels'

const LEVEL_GROUPS = ['Lycée', 'Études supérieures', 'Autre'] as const

export function OnboardingPage() {
  const { isAuthenticated, user, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [avatarId, setAvatarId] = useState(user.avatarId)
  const [photoUrl, setPhotoUrl] = useState(user.avatarPhotoUrl)
  const [studyLevel, setStudyLevel] = useState(user.studyLevel ?? '')

  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />
  }

  const canContinue = firstName.trim().length > 0 && lastName.trim().length > 0 && studyLevel.length > 0

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!canContinue) return
    updateProfile({ firstName: firstName.trim(), lastName: lastName.trim(), avatarId, avatarPhotoUrl: photoUrl, studyLevel })
    navigate('/tableau-de-bord')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] px-5 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-300/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-mint-300/20 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <Logo />

        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-7 shadow-[var(--shadow-soft)] sm:p-10"
        >
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
              <Sparkles className="size-3.5" /> Dernière étape
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink-950 sm:text-3xl">Complète ton profil</h1>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Ces infos nous aident à personnaliser tes fiches de révision. Tu pourras les modifier à tout moment
              depuis ton profil.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <AvatarDisplay avatarId={avatarId} photoUrl={photoUrl} className="size-20" emojiClassName="text-3xl" />
            <p className="text-sm font-medium text-ink-950">Choisis ta photo de profil</p>
          </div>

          <div className="mt-5">
            <AvatarPicker
              selectedId={avatarId}
              userPlan={user.plan}
              onSelect={setAvatarId}
              photoUrl={photoUrl}
              onPhotoUpload={(dataUrl) => {
                setPhotoUrl(dataUrl)
                setAvatarId(CUSTOM_PHOTO_AVATAR_ID)
              }}
              onPhotoRemove={() => {
                setPhotoUrl(undefined)
                setAvatarId(AVATAR_OPTIONS[0].id)
              }}
            />
          </div>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="onboardingFirstName">Prénom</Label>
              <Input
                id="onboardingFirstName"
                placeholder="Léa"
                required
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="onboardingLastName">Nom</Label>
              <Input
                id="onboardingLastName"
                placeholder="Martin"
                required
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold text-ink-950">Quel est ton niveau d’étude ?</h3>
            <div className="flex flex-col gap-4">
              {LEVEL_GROUPS.map((group) => {
                const levels = STUDY_LEVELS.filter((level) => level.group === group)
                return (
                  <div key={group}>
                    <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--muted-foreground)] uppercase">
                      {group}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => {
                        const selected = level.id === studyLevel
                        return (
                          <button
                            key={level.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setStudyLevel(level.id)}
                            className={cn(
                              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                              selected
                                ? 'border-transparent bg-brand-gradient text-white shadow-[var(--shadow-lift)]'
                                : 'border-[var(--border-subtle)] bg-white text-ink-950 hover:border-brand-300 hover:bg-brand-50',
                            )}
                          >
                            {level.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-9 w-full" disabled={!canContinue}>
            Accéder à mon tableau de bord
          </Button>
        </form>
      </div>
    </div>
  )
}
