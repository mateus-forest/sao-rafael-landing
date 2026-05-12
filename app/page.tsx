import { AgeGate } from "@/components/age-gate"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { RegionalCoverage } from "@/components/regional-coverage"
import { History } from "@/components/history"
import { Products } from "@/components/products"
import { Chopp } from "@/components/chopp"
import { Structure } from "@/components/structure"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AgeGate />
      <Header />
      <Hero />
      <RegionalCoverage />
      <History />
      <Products />
      <Chopp />
      <Structure />
      <CTASection />
      <Footer />
    </main>
  )
}
