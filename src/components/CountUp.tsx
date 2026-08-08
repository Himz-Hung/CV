import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Animates a numeric stat from 0 to its target when it scrolls into view.
// Keeps any non-numeric prefix/suffix (e.g. "~", "+") and matches decimals
// so "8.09", "~3", "30+" all animate correctly.
export default function CountUp({
  value,
  duration = 1600,
}: {
  value: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  const match = value.match(/^(\D*)([\d.]+)(\D*)$/)
  const prefix = match?.[1] ?? ''
  const numStr = match?.[2] ?? ''
  const suffix = match?.[3] ?? ''
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0

  // start showing a zeroed version so there's no jump to the final value
  const [display, setDisplay] = useState(
    match ? `${prefix}${(0).toFixed(decimals)}${suffix}` : value,
  )

  useEffect(() => {
    if (!match) {
      setDisplay(value)
      return
    }
    if (!inView) return

    const target = parseFloat(numStr)
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value])

  return <span ref={ref}>{display}</span>
}
