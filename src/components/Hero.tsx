import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useI18n } from '../i18n'

export default function Hero({ start = true }: { start?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useI18n()
  const profile = t.profile

  // typewriter effect — reveals the name one character at a time, like someone
  // typing it out, with a slightly irregular human cadence. Kicks off once the
  // preloader is gone; the glitch takes over after the full name is typed.
  const fullName = profile.name
  const [typed, setTyped] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    if (!start) return
    let i = 0
    let timer = 0
    const step = () => {
      i += 1
      setTyped(fullName.slice(0, i))
      if (i >= fullName.length) {
        setTypingDone(true)
        return
      }
      timer = window.setTimeout(step, 70 + Math.random() * 90)
    }
    timer = window.setTimeout(step, 300)
    return () => window.clearTimeout(timer)
  }, [start, fullName])
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  // mouse parallax
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  const onMouse = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window
    mx.set((e.clientX - innerWidth / 2) / innerWidth)
    my.set((e.clientY - innerHeight / 2) / innerHeight)
  }

  const orb1X = useTransform(sx, (v) => v * 60)
  const orb1Y = useTransform(sy, (v) => v * 60)
  const orb2X = useTransform(sx, (v) => v * -80)
  const orb2Y = useTransform(sy, (v) => v * -80)

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMouse}
      className="relative h-[100svh] min-h-[560px] flex items-center justify-center overflow-hidden"
    >
      {/* animated background orbs */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute -top-40 -left-20 w-[420px] h-[420px] rounded-full bg-indigo-600/30 blur-[90px] md:blur-[120px] animate-float"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute -bottom-40 -right-10 w-[500px] h-[500px] rounded-full bg-fuchsia-600/25 blur-[90px] md:blur-[130px] animate-float"
      />

      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-haze tracking-[0.3em] uppercase text-xs md:text-sm mb-6"
        >
          {profile.tagline}
        </motion.p>

        <h1
          aria-label={fullName}
          className="grid justify-center text-[clamp(1.75rem,10vw,8.5rem)] leading-[1.12] font-semibold tracking-tight py-[0.15em] min-h-[1.3em]"
        >
          {/* invisible sizer — reserves the final name's box so the typed text
              never shifts the layout width. Font clamps down to stay on one line. */}
          <span aria-hidden className="[grid-area:1/1] invisible whitespace-nowrap pb-[0.12em]">
            {fullName}
          </span>
          {/* live text — left-aligned inside the reserved box */}
          <span
            aria-hidden
            data-text={typed}
            className={`[grid-area:1/1] w-full whitespace-nowrap text-left gradient-text animate-shimmer pb-[0.12em] ${
              typingDone ? 'glitch' : ''
            }`}
          >
            {typed}
            {!typingDone && <span aria-hidden className="caret" />}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 text-xl md:text-3xl text-haze font-light"
        >
          {profile.title}
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-haze"
      >
        <span className="text-xs tracking-widest uppercase">{t.hero.scrollCue}</span>
        <div className="w-[24px] h-[38px] rounded-full border border-white/25 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </section>
  )
}
