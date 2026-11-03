import HeroSection from './sections/HeroSection'
import StatsBar from './sections/StatsBar'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import ProcessSection from './sections/ProcessSection'
import SkillsSection from './sections/SkillsSection'
import TestimonialsSection from './sections/TestimonialsSection'
import FaqSection from './sections/FaqSection'
import ContactSection from './sections/ContactSection'
import Footer from './sections/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <main style={{ background: '#FFFFFF', overflowX: 'clip' }}>
      <HeroSection />
      <StatsBar />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <SkillsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
