import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-6xl font-semibold text-brand-200">404</p>
      <h1 className="mt-3 font-display text-2xl font-semibold">Page introuvable</h1>
      <p className="mt-2 text-[var(--muted-foreground)]">Cette page n’existe pas ou a été déplacée.</p>
      <Button asChild className="mt-6">
        <Link to="/">Retour à l’accueil</Link>
      </Button>
    </main>
  )
}
