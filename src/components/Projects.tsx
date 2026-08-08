import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useI18n } from '../i18n'
import type { Project } from '../i18n/types'
import Reveal from './Reveal'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  // cards scale down slightly as the next one stacks over them
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.65, 1])

  // 3D tilt following the cursor across the card
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 150, damping: 15, mass: 0.4 })
  const sRotY = useSpring(rotY, { stiffness: 150, damping: 15, mass: 0.4 })

  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotY.set(px * 8)
    rotX.set(-py * 8)
  }
  const resetTilt = () => {
    rotX.set(0)
    rotY.set(0)
  }

  const topOffset = 90 + index * 24

  return (
    <div ref={ref} className="static md:sticky" style={{ top: `${topOffset}px` }}>
      <motion.div
        onMouseMove={onTilt}
        onMouseLeave={resetTilt}
        style={{ scale, opacity, rotateX: sRotX, rotateY: sRotY, transformPerspective: 1200 }}
        className="relative rounded-[2rem] overflow-hidden bg-[#0c0c13] border border-white/10 shadow-2xl shadow-black/60 p-6 md:p-14 md:min-h-[60vh] flex flex-col justify-between"
      >
        {/* accent glow */}
        <div
          className={`absolute -top-32 -right-24 w-72 md:w-96 h-72 md:h-96 rounded-full blur-[80px] md:blur-[120px] opacity-40 bg-gradient-to-br ${project.accent}`}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm text-haze">{project.period}</div>
              <h3 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">
                {project.name}
              </h3>
              <div className="mt-2 text-fuchsia-300">{project.role}</div>
            </div>
            <div
              className={`text-6xl font-bold bg-gradient-to-br ${project.accent} bg-clip-text text-transparent opacity-60`}
            >
              0{index + 1}
            </div>
          </div>

          <p className="mt-6 text-lg text-haze max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="relative z-10 mt-8 grid md:grid-cols-2 gap-8">
          <ul className="space-y-2">
            {project.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/80">
                <span className="text-fuchsia-400 mt-0.5">→</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 content-start">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-sm px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 h-fit"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const { t } = useI18n()
  const projects = t.projects_data
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <span className="text-sm tracking-[0.25em] uppercase text-emerald-400">
            {t.projects.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">
            {t.projects.headingLines[0]} <br />
            {t.projects.headingLines[1]}
          </h2>
        </Reveal>

        <div className="mt-16 space-y-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
