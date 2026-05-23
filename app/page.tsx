import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import SimulatorSection from "@/components/simulator-section"
import BrandsSection from "@/components/brands-section"
import DifferentialsSection from "@/components/differentials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <SimulatorSection />
      <BrandsSection />
      <DifferentialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
