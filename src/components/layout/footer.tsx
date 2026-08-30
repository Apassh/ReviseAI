import { Link } from 'react-router-dom'
import { Logo } from './logo'

const FOOTER_LINKS = {
  Produit: [
    { label: 'Comment ça marche', href: '/#comment-ca-marche' },
    { label: 'Fonctionnalités', href: '/#fonctionnalites' },
    { label: 'Tarifs', href: '/#tarifs' },
  ],
  Légal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Politique de confidentialité', href: '/confidentialite' },
    { label: 'Conditions générales', href: '/cgu' },
  ],
  Contact: [
    { label: 'contact@reviseai.fr', href: 'mailto:contact@reviseai.fr' },
    { label: 'Assistance', href: '/#tarifs' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-[var(--muted-foreground)]">
              Chaque minute investie aujourd’hui, c’est du stress en moins demain.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-ink-950">{title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') && !link.href.includes('#') ? (
                      <Link
                        to={link.href}
                        className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-brand-600"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-brand-600"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-3 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--muted-foreground)] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} ReviseAI. Tous droits réservés.</p>
          <p>Fait avec soin pour les étudiants qui visent plus haut.</p>
        </div>
      </div>
    </footer>
  )
}
