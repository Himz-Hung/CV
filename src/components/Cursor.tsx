import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A custom glowing cursor: a small solid dot that tracks the pointer exactly,
// plus a larger ring that lags behind with spring physics and expands over
// interactive elements. Only shown on devices with a fine pointer (mouse).
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement | null
      setHovering(!!el?.closest('a, button, [data-cursor="hover"]'))
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', dn)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', dn)
      window.removeEventListener('mouseup', up)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* trailing ring */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[200]"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/70 mix-blend-difference"
          animate={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            opacity: down ? 0.5 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
      </motion.div>

      {/* center dot */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[200]"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
          animate={{ scale: down ? 0.6 : hovering ? 0.4 : 1 }}
        />
      </motion.div>
    </>
  )
}
