import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react'
import { Logo } from './logo'
import { AvatarDisplay } from '@/components/profile/avatar-display'
import { PlanBadge } from '@/components/pricing/plan-badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'

export function AppHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 sm:flex">
            <Link to="/tableau-de-bord" className="text-sm font-medium text-ink-950/75 hover:text-brand-600">
              Tableau de bord
            </Link>
          </nav>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-300">
            <AvatarDisplay avatarId={user.avatarId} photoUrl={user.avatarPhotoUrl} className="size-9" />
            <span className="hidden text-sm font-semibold sm:inline">{user.firstName}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex items-center justify-between gap-2">
              <span>{user.firstName} {user.lastName}</span>
              <PlanBadge plan={user.plan} compact />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/tableau-de-bord">
                <LayoutDashboard className="size-4" /> Tableau de bord
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profil">
                <User className="size-4" /> Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/abonnement">
                <Settings className="size-4" /> Abonnement
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-rose-accent-600 focus:bg-rose-accent-50">
              <LogOut className="size-4" /> Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
