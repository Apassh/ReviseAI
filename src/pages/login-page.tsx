import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { AuthSidePanel } from '@/components/layout/auth-side-panel'
import { SocialButtons } from '@/components/auth/social-buttons'
import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    login()
    navigate('/tableau-de-bord')
  }

  function handleSocialLogin() {
    login()
    navigate('/tableau-de-bord')
  }

  return (
    <div className="flex min-h-screen">
      <AuthSidePanel />

      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Logo className="lg:hidden" />

          <h1 className="mt-6 font-display text-2xl font-semibold sm:mt-0">Bon retour parmi nous</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Connecte-toi pour retrouver tes fiches et continuer tes révisions.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input id="email" type="email" placeholder="toi@exemple.com" required autoComplete="email" />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link to="/connexion" className="text-xs font-medium text-brand-600 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-[var(--muted-foreground)]"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-1">
              Se connecter
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[var(--border-subtle)]" />
            <span className="text-xs text-[var(--muted-foreground)]">ou continuer avec</span>
            <span className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          <SocialButtons onGoogle={handleSocialLogin} onApple={handleSocialLogin} />

          <p className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="font-semibold text-brand-600 hover:underline">
              Inscris-toi gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
