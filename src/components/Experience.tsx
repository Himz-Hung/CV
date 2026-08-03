import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience, education } from '../data'
import Reveal from './Reveal'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end 0.7'],
  })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <span className="text-sm tracking-[0.25em] uppercase text-orange-400">
            Hành trình
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">
            Kinh nghiệm làm việc
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-20 pl-10">
          {/* timeline track */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/10" />
          <motion.div
            style={{ height }}
            className="absolute left-[7px] top-2 w-[2px] bg-gradient-to-b from-indigo-400 via-fuchsia-400 to-orange-400"
          />

          {experience.map((e, i) => (
            <Reveal key={i} className="relative mb-16 last:mb-0">
              <span className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-ink border-2 border-fuchsia-400" />
              <div className="text-sm text-haze mb-1">{e.period}</div>
              <h3 className="text-2xl font-semibold">{e.role}</h3>
              <div className="text-fuchsia-300 mb-4">{e.company}</div>
              <ul className="space-y-2">
                {e.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-haze leading-relaxed">
                    <span className="text-indigo-400 mt-1">▹</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="relative">
            <span className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-ink border-2 border-orange-400" />
            <div className="text-sm text-haze mb-1">{education.period}</div>
            <h3 className="text-2xl font-semibold">{education.degree}</h3>
            <div className="text-orange-300 mb-2">{education.school}</div>
            <div className="inline-block text-sm px-3 py-1 rounded-full glass">
              GPA: {education.gpa}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
