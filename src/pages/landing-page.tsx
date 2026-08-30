import { Hero } from '@/components/marketing/hero'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { Features } from '@/components/marketing/features'
import { PricingSection } from '@/components/marketing/pricing-section'
import { CtaBanner } from '@/components/marketing/cta-banner'

export function LandingPage() {
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
