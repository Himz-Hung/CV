import type { ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/* ---------- brand glyphs (viewBox 0 0 24 24) ---------- */

const ReactGlyph = (
  <g fill="none" stroke="currentColor" strokeWidth="1.1">
    <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="12" rx="10" ry="3.9" />
    <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(120 12 12)" />
  </g>
)

const Letters = (t: string) => (
  <text
    x="12"
    y="12"
    textAnchor="middle"
    dominantBaseline="central"
    fontSize="9.5"
    fontWeight="800"
    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
    fill="currentColor"
  >
    {t}
  </text>
)

const ReduxGlyph = (
  <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="16.5" cy="7.5" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="7" cy="16.5" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="17" cy="16.5" r="1.7" fill="currentColor" stroke="none" />
    <path d="M15.2 8.6c1.7 2 1.9 4.6.6 6.4" />
    <path d="M15.4 15.9c-2.4.9-5 .4-6.6-1.2" />
    <path d="M7.7 14.7C6.4 12 7 8.7 9.3 6.9c1.4-1.1 3-1.5 4.6-1.3" />
  </g>
)

const TailwindGlyph = (
  <path
    fill="currentColor"
    d="M12 7.2c-2.13 0-3.47 1.07-4 3.2.8-1.07 1.73-1.47 2.8-1.2.61.15 1.05.59 1.53 1.08.79.8 1.7 1.72 3.67 1.72 2.13 0 3.47-1.07 4-3.2-.8 1.07-1.73 1.47-2.8 1.2-.61-.15-1.05-.59-1.53-1.08C14.88 8.12 13.97 7.2 12 7.2ZM8 12c-2.13 0-3.47 1.07-4 3.2.8-1.07 1.73-1.47 2.8-1.2.61.15 1.05.59 1.53 1.08.79.8 1.7 1.72 3.67 1.72 2.13 0 3.47-1.07 4-3.2-.8 1.07-1.73 1.47-2.8 1.2-.61-.15-1.05-.59-1.53-1.08C10.88 12.92 9.97 12 8 12Z"
  />
)

const ViteGlyph = (
  <path
    fill="currentColor"
    d="M13.2 3 6.2 12.6c-.2.28-.03.66.31.6l3.05-.55-1.02 6.9c-.08.5.56.76.83.33l6.6-9.8c.2-.3.02-.68-.33-.6l-3.14.55L13.66 3.4c.13-.5-.53-.8-.83-.4H13.2Z"
  />
)

const NodeGlyph = (
  <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round">
    <path d="M12 3 4.5 7.3v9.4L12 21l7.5-4.3V7.3L12 3Z" />
    <path
      strokeWidth="1.35"
      d="M9.7 14.4c0 .8.6 1.2 1.9 1.2 1.2 0 1.9-.5 1.9-1.4 0-.8-.5-1.1-1.7-1.3-1.4-.2-1.9-.5-1.9-1.3 0-.8.7-1.3 1.8-1.3 1.1 0 1.8.4 1.8 1.2"
    />
  </g>
)

const GitGlyph = (
  <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="7" cy="7" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="7" cy="17" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="1.7" fill="currentColor" stroke="none" />
    <path d="M7 8.7v6.6" />
    <path d="M7 9.5c0 2.6 2.4 2.5 4.2 2.5h3" />
  </g>
)

const GraphqlGlyph = (
  <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round">
    <path d="M12 3.5 19 7.5v8L12 19.5 5 15.5v-8L12 3.5Z" />
    <path d="M12 4 5.5 15.5h13L12 4Z" fill="none" />
    <circle cx="12" cy="3.8" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="7.6" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="15.6" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="5" cy="15.6" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="5" cy="7.6" r="1.4" fill="currentColor" stroke="none" />
  </g>
)

type TechItem = {
  name: string
  color: string
  glyph: ReactNode
  side: 'left' | 'right'
  top: string
  offset: number // px from edge
  size: number
  speed: number // parallax factor (negative → drifts up on scroll)
  delay: number
}

const ITEMS: TechItem[] = [
  { name: 'React', color: '#61dafb', glyph: ReactGlyph, side: 'left', top: '8%', offset: 40, size: 60, speed: -0.16, delay: 0 },
  { name: 'TypeScript', color: '#3178c6', glyph: Letters('TS'), side: 'right', top: '14%', offset: 52, size: 54, speed: -0.24, delay: 0.6 },
  { name: 'Redux', color: '#a879f0', glyph: ReduxGlyph, side: 'left', top: '30%', offset: 90, size: 46, speed: -0.09, delay: 1.1 },
  { name: 'JavaScript', color: '#f7df1e', glyph: Letters('JS'), side: 'right', top: '34%', offset: 34, size: 50, speed: -0.13, delay: 0.3 },
  { name: 'TailwindCSS', color: '#38bdf8', glyph: TailwindGlyph, side: 'left', top: '52%', offset: 44, size: 56, speed: -0.2, delay: 0.9 },
  { name: 'Vite', color: '#ffa827', glyph: ViteGlyph, side: 'right', top: '55%', offset: 96, size: 44, speed: -0.11, delay: 1.4 },
  { name: 'Node.js', color: '#6cc24a', glyph: NodeGlyph, side: 'left', top: '74%', offset: 70, size: 50, speed: -0.15, delay: 0.5 },
  { name: 'Git', color: '#f1502f', glyph: GitGlyph, side: 'right', top: '76%', offset: 40, size: 52, speed: -0.22, delay: 1.2 },
  { name: 'GraphQL', color: '#e535ab', glyph: GraphqlGlyph, side: 'left', top: '92%', offset: 48, size: 46, speed: -0.1, delay: 0.2 },
  { name: 'HTML', color: '#e8652b', glyph: Letters('</>'), side: 'right', top: '94%', offset: 78, size: 44, speed: -0.18, delay: 0.8 },
]

function FloatIcon({ item }: { item: TechItem }) {
  const { scrollY } = useScroll()
  const rawY = useTransform(scrollY, (v) => v * item.speed)
  const y = useSpring(rawY, { stiffness: 45, damping: 20, mass: 0.6 })
  const rotate = useTransform(scrollY, (v) => v * item.speed * 0.15)

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute',
        top: item.top,
        [item.side]: item.offset,
        y,
        rotate,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4 + item.delay * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, item.side === 'left' ? 5 : -5, 0] }}
        transition={{ duration: 6 + item.delay, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
        style={{
          width: item.size,
          height: item.size,
          color: item.color,
          background: `${item.color}2e`,
          border: `1px solid ${item.color}99`,
          boxShadow: `0 10px 34px -10px ${item.color}b0`,
          borderRadius: item.size * 0.28,
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <svg width={item.size * 0.62} height={item.size * 0.62} viewBox="0 0 24 24">
          {item.glyph}
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function FloatingTech() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden opacity-95 lg:block"
    >
      {ITEMS.map((item) => (
        <FloatIcon key={item.name} item={item} />
      ))}
    </div>
  )
}
