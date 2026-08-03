import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, stats } from '../data'
import Reveal from './Reveal'

function Word({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })

  const words = profile.summary.split(' ')

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <span className="text-sm tracking-[0.25em] uppercase text-fuchsia-400">
            Về tôi
          </span>
        </Reveal>

        <p
          ref={ref}
          className="mt-8 text-3xl md:text-5xl leading-[1.25] font-medium tracking-tight flex flex-wrap"
        >
          {words.map((w, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {w}
              </Word>
            )
          })}
        </p>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="h-full">
              <div className="glass rounded-3xl p-6 h-full flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500">
                <div className="text-4xl md:text-5xl font-semibold gradient-text">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-haze">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
