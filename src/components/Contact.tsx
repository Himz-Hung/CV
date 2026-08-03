import { motion } from 'framer-motion'
import { profile } from '../data'
import Reveal from './Reveal'

const items = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Điện thoại', value: profile.phone, href: `tel:${profile.phone}` },
  { label: 'GitHub', value: 'Himz-Hung', href: profile.github },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-40 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-fuchsia-600/20 blur-[150px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="text-sm tracking-[0.25em] uppercase text-fuchsia-400">
            Cùng làm việc nhé
          </span>
          <h2 className="mt-6 text-4xl md:text-7xl font-semibold tracking-tight leading-[1.05] py-[0.08em]">
            Great products start <br />
            <span className="gradient-text animate-shimmer">with a conversation.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block mt-12 text-lg font-medium px-8 py-4 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            Gửi email cho tôi →
          </a>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.08}>
              {it.href ? (
                <motion.a
                  href={it.href}
                  target={it.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  className="block glass rounded-2xl p-5 text-left hover:border-fuchsia-400/40 transition-colors"
                >
                  <div className="text-xs text-haze uppercase tracking-wider">{it.label}</div>
                  <div className="mt-1 font-medium truncate">{it.value}</div>
                </motion.a>
              ) : (
                <div className="glass rounded-2xl p-5 text-left">
                  <div className="text-xs text-haze uppercase tracking-wider">{it.label}</div>
                  <div className="mt-1 font-medium">{it.value}</div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
