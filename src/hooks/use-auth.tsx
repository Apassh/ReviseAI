import * as React from 'react'
import { MOCK_USER } from '@/lib/mock-data'
import type { PlanId } from '@/lib/pricing-data'
import type { UserProfile } from '@/lib/types'

interface AuthContextValue {
  isAuthenticated: boolean
  user: UserProfile
  login: () => void
  logout: () => void
  setPlan: (plan: PlanId) => void
  setAvatar: (avatarId: string) => void
  setBillingCycle: (cycle: 'monthly' | 'annual') => void
}

const STORAGE_KEY = 'reviseai:session'

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(
    () => typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === 'true',
  )
  const [user, setUser] = React.useState<UserProfile>(MOCK_USER)

  const login = React.useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, 'true')
    setIsAuthenticated(true)
  }, [])

  const logout = React.useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setIsAuthenticated(false)
  }, [])

  const setPlan = React.useCallback((plan: PlanId) => {
    setUser((prev) => ({ ...prev, plan }))
  }, [])

  const setAvatar = React.useCallback((avatarId: string) => {
    setUser((prev) => ({ ...prev, avatarId }))
  }, [])

  const setBillingCycle = React.useCallback((billingCycle: 'monthly' | 'annual') => {
    setUser((prev) => ({ ...prev, billingCycle }))
  }, [])

  const value = React.useMemo(
    () => ({ isAuthenticated, user, login, logout, setPlan, setAvatar, setBillingCycle }),
    [isAuthenticated, user, login, logout, setPlan, setAvatar, setBillingCycle],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
