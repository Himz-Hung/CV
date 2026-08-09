import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { en } from '../i18n/en'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  // The preloader runs before the visitor picks a language, so it uses the site
  // default (English).
  const pre = en.preloader

  useEffect(() => {
    // remove the instant boot loader from index.html once React takes over
    document.getElementById('boot')?.remove()

    // MIN keeps the animation feeling intentional; the bar eases to ~90% over
    // this window. It only completes once the page is ACTUALLY ready (all
    // images/fonts/the bundle finished) so we don't drop the visitor — on a
    // slow phone especially — onto a page the browser is still busy painting.
    // MAX is a hard cap so a slow or broken asset can never trap them here.
    const MIN = 1500
    const MAX = 6000
    const startAt = performance.now()
    let raf = 0
    let done = false

    let loaded = document.readyState === 'complete'
    const onLoad = () => {
      loaded = true
    }
    if (!loaded) window.addEventListener('load', onLoad, { once: true })

    const finish = () => {
      if (done) return
      done = true
      setProgress(100)
      setTimeout(onDone, 250)
    }

    const tick = (now: number) => {
      const elapsed = now - startAt
      const t = Math.min(elapsed / MIN, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      // hold at 90% until the page is genuinely ready
      const capped = loaded ? eased : Math.min(eased, 0.9)
      setProgress(Math.round(capped * 100))

      if ((elapsed >= MIN && loaded) || elapsed >= MAX) {
        finish()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#05050a] flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ambient glow */}
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[130px]" />
      <div className="absolute -bottom-40 right-1/3 w-[500px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[130px]" />

      {/* logo */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Logo className="w-24 h-24 md:w-28 md:h-28 drop-shadow-[0_0_30px_rgba(232,121,249,0.35)]" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative mt-4 text-sm tracking-[0.3em] uppercase text-haze"
      >
        {pre.role}
      </motion.p>

      {/* progress bar */}
      <div className="relative mt-10 w-56 md:w-72">
        <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-orange-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs text-haze tabular-nums">
          <span>{pre.loading}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  )
}
