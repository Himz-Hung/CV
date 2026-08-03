import { useId } from 'react'

type Props = {
  className?: string
  withText?: boolean
  textClassName?: string
}

/**
 * "Himz" monogram — a squircle glass badge with a geometric H
 * filled by the brand gradient (indigo → fuchsia → orange).
 */
export default function Logo({ className, withText = false, textClassName }: Props) {
  const id = useId()
  const grad = `himz-grad-${id}`
  const glow = `himz-glow-${id}`

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg
        className={className ?? 'w-9 h-9'}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Himz logo"
        role="img"
      >
        <defs>
          <linearGradient id={grad} x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818cf8" />
            <stop offset="0.5" stopColor="#e879f9" />
            <stop offset="1" stopColor="#fdba74" />
          </linearGradient>
          <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* squircle badge */}
        <rect
          x="1.25"
          y="1.25"
          width="45.5"
          height="45.5"
          rx="13.5"
          fill="rgba(255,255,255,0.045)"
          stroke={`url(#${grad})`}
          strokeWidth="1.5"
        />

        {/* geometric H */}
        <g fill={`url(#${grad})`} filter={`url(#${glow})`}>
          <rect x="14" y="13" width="5" height="22" rx="2.5" />
          <rect x="29" y="13" width="5" height="22" rx="2.5" />
          <rect x="15.5" y="21.5" width="17" height="5" rx="2.5" />
        </g>

        {/* accent dot */}
        <circle cx="37.5" cy="11" r="2.1" fill="#fdba74" />
      </svg>

      {withText && (
        <span className={textClassName ?? 'font-semibold tracking-tight text-lg'}>
          Himz<span className="text-fuchsia-400">.</span>
        </span>
      )}
    </span>
  )
}
