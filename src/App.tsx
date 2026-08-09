import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import Welcome from './components/Welcome'
import FloatingTech from './components/FloatingTech'
import Story from './components/Story'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Ambient from './components/Ambient'
import Cursor from './components/Cursor'
import ScrollToTop from './components/ScrollToTop'
import { I18nProvider, useI18n, type Lang } from './i18n'

// The CV itself — lives inside the I18nProvider so every section reads its text
// from the currently selected language.
function CV() {
  const { t } = useI18n()
  return (
    <>
      <ScrollProgress />
      <Nav />
      <FloatingTech />
      <main className="relative z-10">
        <Story />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="py-10 px-6 border-t border-white/10 text-center text-sm text-haze">
        {t.footer.replace('{name}', t.profile.name)}
      </footer>
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  // Always starts null (choice is not persisted), so the welcome gate shows on
  // every visit and the visitor picks a language each time.
  const [lang, setLang] = useState<Lang | null>(null)

  const showWelcome = !loading && lang === null

  const handleChoose = (next: Lang) => {
    document.documentElement.lang = next
    setLang(next)
  }

  // lock scroll while the preloader or the welcome gate is visible
  useEffect(() => {
    const locked = loading || lang === null
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading, lang])

  return (
    <>
      <Ambient />
      <Cursor />

      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showWelcome && <Welcome onChoose={handleChoose} />}
      </AnimatePresence>

      {lang && (
        <I18nProvider key={lang} initialLang={lang}>
          <CV />
          <ScrollToTop />
        </I18nProvider>
      )}
    </>
  )
}
