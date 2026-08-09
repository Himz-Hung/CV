import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import Welcome from './components/Welcome'
import EnterLoader from './components/EnterLoader'
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
function CV({ onReady }: { onReady?: () => void }) {
  const { t } = useI18n()
  return (
    <>
      <ScrollProgress />
      <Nav />
      <FloatingTech />
      <main className="relative z-10">
        <Story onReady={onReady} />
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
  // Two extra steps between "language picked" and "page revealed":
  //  - mountCV: delayed a couple of frames so the EnterLoader actually paints
  //    BEFORE the heavy Story setup blocks the main thread;
  //  - entered: flipped once Story has painted its first frame (or a safety
  //    timeout), which fades the EnterLoader out.
  const [mountCV, setMountCV] = useState(false)
  const [entered, setEntered] = useState(false)

  const showWelcome = !loading && lang === null

  const handleChoose = (next: Lang) => {
    document.documentElement.lang = next
    setLang(next)
  }

  // Once a language is chosen, let the loading screen paint for two frames, then
  // mount the CV so its heavy 3D canvas builds *behind* the cover.
  useEffect(() => {
    if (!lang) return
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setMountCV(true))
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [lang])

  // Safety net: never let the EnterLoader hang if Story's onReady somehow never
  // fires (e.g. reduced-motion or a stalled frame).
  useEffect(() => {
    if (!mountCV || entered) return
    const id = window.setTimeout(() => setEntered(true), 4000)
    return () => window.clearTimeout(id)
  }, [mountCV, entered])

  // lock scroll while any gate (preloader / welcome / enter-loader) is visible
  useEffect(() => {
    const locked = loading || lang === null || !entered
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading, lang, entered])

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
          {mountCV && <CV onReady={() => setEntered(true)} />}
          {mountCV && <ScrollToTop />}
          <AnimatePresence>{!entered && <EnterLoader />}</AnimatePresence>
        </I18nProvider>
      )}
    </>
  )
}
