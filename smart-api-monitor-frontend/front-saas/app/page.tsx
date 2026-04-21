import { SiteHeader } from "@/components/landing/site-header"
import { HeroSection } from "@/components/landing/hero-section"
import { TrustBar } from "@/components/landing/trust-bar"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { MetricsSection } from "@/components/landing/metrics-section"
import { ProductShowcase } from "@/components/landing/product-showcase"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { SecuritySection } from "@/components/landing/security-section"
import { IntegrationsSection } from "@/components/landing/integrations-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ValueCards } from "@/components/landing/value-cards"
import { CTASection } from "@/components/landing/cta-section"
import { SiteFooter } from "@/components/landing/site-footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <TrustBar />
      <FeatureGrid />
      <MetricsSection />
      <ProductShowcase />
      <DashboardPreview />
      <SecuritySection />
      <IntegrationsSection />
      <HowItWorks />
      <ValueCards />
      <CTASection />
      <SiteFooter />
    </main>
  )
}
