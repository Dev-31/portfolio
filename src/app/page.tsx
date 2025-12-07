import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Skills from '../components/Skills/Skills'
import Projects from '../components/Projects/Projects'
import Values from '../components/Values/Values'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Layout/Footer'
import Navigation from '../components/Layout/Navigation'
import PagesNavigation from '../components/Navigation/PagesNavigation'


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Values />
      <Contact />
      <Footer />
      <PagesNavigation/>
    </main>
  )
}