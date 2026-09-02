import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from './logo'
import { Button } from '@/components/ui/button'
import { useSectionLink } from '@/hooks/use-section-link'

const NAV_LINKS = [
  { label: 'Comment ça marche', id: 'comment-ca-marche' },
  { label: 'Fonctionnalités', id: 'fonctionnalites' },
  { label: 'Tarifs', id: 'tarifs' },
]

export function MarketingHeader() {
  const [open, setOpen] = useState(false)
  const goToSection = useSectionLink()

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={goToSection(link.id)}
              className="text-sm font-medium text-ink-950/75 transition-colors hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/connexion">Se connecter</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/inscription">Commencer gratuitement</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-xl text-ink-950 lg:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--background)] px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  goToSection(link.id)(e)
                  setOpen(false)
                }}
                className="text-sm font-medium text-ink-950/80"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2.5">
            <Button asChild variant="outline">
              <Link to="/connexion">Se connecter</Link>
            </Button>
            <Button asChild>
              <Link to="/inscription">Commencer gratuitement</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
