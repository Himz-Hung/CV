import { motion } from 'framer-motion'
import Logo from './Logo'
import { useI18n } from '../i18n'

/**
 * EnterLoader — the loading screen shown *after* the visitor picks a language,
 * while the heavy 3D Story canvas builds its shapes and paints its first frame
 * behind it. Mounting that work under a cover (instead of straight into the
 * user's face) is what keeps entry from stuttering on mobile. It fades away via
 * AnimatePresence the moment Story reports it's ready.
 */
export default function EnterLoader() {
  const { t } = useI18n()

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

      {/* indeterminate spinner — no fake percentage, it's a genuine wait */}
      <div className="relative mt-8 h-6 w-6">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-fuchsia-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <p className="relative mt-5 text-xs uppercase tracking-[0.3em] text-haze">
        {t.preloader.preparing}
      </p>
    </motion.div>
  )
}
