import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import FloatingTech from './components/FloatingTech'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { profile } from './data'

export default function App() {
  const [loading, setLoading] = useState(true)

  // lock scroll while the preloader is visible
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <ScrollProgress />
      <Nav />
      <FloatingTech />
      <main className="relative z-10">
        <Hero start={!loading} />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="py-10 px-6 border-t border-white/10 text-center text-sm text-haze">
        © 2026 {profile.name} · Front-end Developer · Thiết kế & xây dựng với React
      </footer>
    </>
  )
}
