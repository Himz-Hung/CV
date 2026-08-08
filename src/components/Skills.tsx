import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import Reveal from './Reveal'

export default function Skills() {
  const { t } = useI18n()
  const skills = t.skills_data
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="text-sm tracking-[0.25em] uppercase text-indigo-400">
            {t.skills.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">
            {t.skills.headingLines[0]} <br />
            {t.skills.headingLines[1]}
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={(i % 4) * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass rounded-3xl p-6 h-full group"
              >
                <div className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 group-hover:scale-150 transition-transform" />
                  {s.group}
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-haze hover:text-white hover:border-fuchsia-400/50 transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
