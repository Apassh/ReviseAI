import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AvatarDisplay } from '@/components/profile/avatar-display'
import { AvatarPicker, CUSTOM_PHOTO_AVATAR_ID } from '@/components/profile/avatar-picker'
import { PlanBadge } from '@/components/pricing/plan-badge'
import { useAuth } from '@/hooks/use-auth'
import { AVATAR_OPTIONS } from '@/lib/mock-data'

export function ProfilePage() {
  const { user, setAvatar, updateProfile } = useAuth()

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Ton profil</h1>
      <p className="mt-1 text-[var(--muted-foreground)]">Personnalise ton avatar et gère les informations de ton compte.</p>

      <div className="mt-8 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <AvatarDisplay avatarId={user.avatarId} photoUrl={user.avatarPhotoUrl} className="size-16" emojiClassName="text-2xl" />
              <div>
                <CardTitle className="flex items-center gap-2">
                  {user.firstName} {user.lastName}
                  <PlanBadge plan={user.plan} />
                </CardTitle>
                <CardDescription>Membre depuis {new Date(user.memberSince).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="mb-4 text-sm font-semibold text-ink-950">Choisis ton avatar</h3>
            <AvatarPicker
              selectedId={user.avatarId}
              userPlan={user.plan}
              onSelect={setAvatar}
              photoUrl={user.avatarPhotoUrl}
              onPhotoUpload={(dataUrl) => updateProfile({ avatarId: CUSTOM_PHOTO_AVATAR_ID, avatarPhotoUrl: dataUrl })}
              onPhotoRemove={() => updateProfile({ avatarId: AVATAR_OPTIONS[0].id, avatarPhotoUrl: undefined })}
            />
            {user.plan !== 'elite' && (
              <p className="mt-5 rounded-xl border border-gold-400/50 bg-brand-50 px-4 py-3 text-sm text-ink-950">
                Débloque la collection exclusive d’avatars avec la formule Élite.{' '}
                <Link to="/abonnement" className="font-semibold underline underline-offset-2">
                  Découvrir Élite
                </Link>
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations du compte</CardTitle>
            <CardDescription>Ces informations restent privées et ne sont visibles que par toi.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" defaultValue={user.firstName} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" defaultValue={user.lastName} />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit">Enregistrer les modifications</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
