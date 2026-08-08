import { useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import Magnetic from './Magnetic'
import { vi } from '../i18n/vi'
import { en } from '../i18n/en'
import type { Lang } from '../i18n'

// Greeting / language-selection page shown when a visitor first enters the CV.
// It is self-contained (doesn't rely on the i18n context) because the visitor
// hasn't picked a language yet — it shows both language labels side by side.
export default function Welcome({ onChoose }: { onChoose: (lang: Lang) => void }) {
  const [selected, setSelected] = useState<Lang>('en')
  const dict = selected === 'vi' ? vi : en
  const w = dict.welcome

  const options: { lang: Lang; flag: string; label: string; native: string }[] = [
    { lang: 'vi', flag: '🇻🇳', label: vi.welcome.vietnamese, native: 'Tiếng Việt' },
    { lang: 'en', flag: '🇬🇧', label: en.welcome.english, native: 'English' },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-[#05050a] flex flex-col items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ambient glow */}
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[130px]" />
      <div className="absolute -bottom-40 right-1/3 w-[500px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <Logo className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_30px_rgba(232,121,249,0.35)]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative mt-8 text-4xl md:text-6xl font-semibold tracking-tight gradient-text animate-shimmer py-[0.1em]"
      >
        {w.greeting}
      </motion.h1>

      <motion.p
        key={selected + '-subtitle'}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mt-4 max-w-md text-center text-haze md:text-lg leading-relaxed"
      >
        {w.subtitle}
      </motion.p>

      {/* language options */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md"
      >
        {options.map((o) => {
          const active = selected === o.lang
          return (
            <button
              key={o.lang}
              type="button"
              onClick={() => setSelected(o.lang)}
              className={`flex-1 glass rounded-2xl px-6 py-5 flex items-center gap-4 transition-all duration-300 ${
                active
                  ? 'border-fuchsia-400/60 ring-1 ring-fuchsia-400/40 scale-[1.02]'
                  : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
              }`}
            >
              <span className="text-3xl">{o.flag}</span>
              <span className="text-left">
                <span className="block font-semibold">{o.native}</span>
                <span className="block text-xs text-haze">{o.label}</span>
              </span>
            </button>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="relative mt-10"
      >
        <Magnetic>
          <motion.button
            type="button"
            onClick={() => onChoose(selected)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-lg font-medium px-8 py-4 rounded-full bg-white text-black"
          >
            {w.enter}
          </motion.button>
        </Magnetic>
      </motion.div>
    </motion.div>
  )
}
