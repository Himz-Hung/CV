import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { useI18n } from '../i18n'

/**
 * EnterLoader — the loading screen shown *after* the visitor picks a language,
 * while the heavy 3D Story canvas builds its shapes and paints its first frame
 * behind it. Mounting that work under a cover (instead of straight into the
 * user's face) is what keeps entry from stuttering on mobile.
 *
 * The bar eases to ~90% over MIN so the screen always lingers a beat, then only
 * completes to 100% once Story has actually painted (`ready`). MAX is a hard cap
 * so a stalled frame can never trap the visitor here.
 */
export default function EnterLoader({
  ready,
  onDone,
}: {
  ready: boolean
  onDone: () => void
}) {
  const { t } = useI18n()
  const [progress, setProgress] = useState(0)

  // Read the latest ready/onDone without re-running (and restarting) the timer.
  const readyRef = useRef(ready)
  readyRef.current = ready
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const MIN = 1400
    const MAX = 4000
    const startAt = performance.now()
    let raf = 0
    let done = false

    const finish = () => {
      if (done) return
      done = true
      setProgress(100)
      setTimeout(() => onDoneRef.current(), 250)
    }

    const tick = (now: number) => {
      const elapsed = now - startAt
      const time = Math.min(elapsed / MIN, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - time, 3)
      // hold at 90% until the 3D scene has genuinely painted
      const capped = readyRef.current ? eased : Math.min(eased, 0.9)
      setProgress(Math.round(capped * 100))

      if ((elapsed >= MIN && readyRef.current) || elapsed >= MAX) {
        finish()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-[#05050a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ambient glow */}
      <div className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[130px]" />
      <div className="absolute -bottom-40 right-1/3 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[130px]" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <Logo className="h-20 w-20 drop-shadow-[0_0_30px_rgba(232,121,249,0.35)] md:h-24 md:w-24" />
      </motion.div>

      {/* progress bar */}
      <div className="relative mt-10 w-56 md:w-72">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-orange-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs tabular-nums text-haze">
          <span>{t.preloader.preparing}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  )
}
