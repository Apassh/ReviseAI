import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { AppHeader } from './app-header'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppHeader />
      <Outlet />
    </div>
  )
}
