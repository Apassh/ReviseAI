import { Outlet } from 'react-router-dom'
import { MarketingHeader } from './marketing-header'
import { Footer } from './footer'

export function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <MarketingHeader />
      <Outlet />
      <Footer />
    </div>
  )
}
