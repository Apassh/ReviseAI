import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthSidePanel } from '@/components/layout/auth-side-panel'
import { SocialButtons } from '@/components/auth/social-buttons'
import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/hooks/use-auth'

export function SignupPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!acceptedTerms) return
    login()
    navigate('/tableau-de-bord')
  }

  function handleSocialSignup() {
    login()
    navigate('/tableau-de-bord')
  }

  return (
    <div className="flex min-h-screen">
      <AuthSidePanel />

      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Logo className="lg:hidden" />

          <h1 className="mt-6 font-display text-2xl font-semibold sm:mt-0">Crée ton compte</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            3 contenus offerts chaque mois. Aucune carte bancaire requise.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" placeholder="Léa" required autoComplete="given-name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" placeholder="Martin" required autoComplete="family-name" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input id="email" type="email" placeholder="toi@exemple.com" required autoComplete="email" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="8 caractères minimum" required minLength={8} autoComplete="new-password" />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-xs font-normal text-[var(--muted-foreground)]">
                J’accepte les{' '}
                <Link to="/cgu" className="font-medium text-brand-600 hover:underline">
                  conditions générales
                </Link>{' '}
                et la{' '}
                <Link to="/confidentialite" className="font-medium text-brand-600 hover:underline">
                  politique de confidentialité
                </Link>
                .
              </Label>
            </div>

            <Button type="submit" size="lg" className="mt-1" disabled={!acceptedTerms}>
              Créer mon compte
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[var(--border-subtle)]" />
            <span className="text-xs text-[var(--muted-foreground)]">ou continuer avec</span>
            <span className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          <SocialButtons onGoogle={handleSocialSignup} onApple={handleSocialSignup} />

          <p className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
            Déjà un compte ?{' '}
            <Link to="/connexion" className="font-semibold text-brand-600 hover:underline">
              Connecte-toi
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
