import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '@/components/marketing/hero'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { Features } from '@/components/marketing/features'
import { PricingSection } from '@/components/marketing/pricing-section'
import { CtaBanner } from '@/components/marketing/cta-banner'

export function LandingPage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <PricingSection />
      <CtaBanner />
    </>
  )
}
