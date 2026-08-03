import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { profile } from '../data'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* animated background orbs */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-indigo-600/30 blur-[120px] animate-float"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute -bottom-40 -right-10 w-[600px] h-[600px] rounded-full bg-fuchsia-600/25 blur-[130px] animate-float"
      />
      <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

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

        <h1 className="text-[14vw] md:text-[8.5rem] leading-[1.12] font-semibold tracking-tight py-[0.15em]">
          {profile.name.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.25em] pb-[0.12em] gradient-text animate-shimmer"
            >
              {word}
            </motion.span>
          ))}
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
        <span className="text-xs tracking-widest uppercase">Cuộn xuống</span>
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
