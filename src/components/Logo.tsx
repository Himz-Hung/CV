import { useId } from 'react'

type Props = {
  className?: string
  withText?: boolean
  textClassName?: string
}

const H_PATH = 'M10 8 H17 V20 H31 V8 H38 V40 H31 V27 H17 V40 H10 Z'
// horizontal stripe positions inside the H
const STRIPES = [6, 12, 18, 24, 30, 36, 42]

/**
 * "Himz" monogram — an italic (slanted) letter H filled with gradient
 * stripes, sharp corners (no rounding).
 */
export default function Logo({ className, withText = false, textClassName }: Props) {
  const id = useId()
  const grad = `himz-grad-${id}`
  const clip = `himz-clip-${id}`

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
          <clipPath id={clip}>
            <path d={H_PATH} />
          </clipPath>
        </defs>

        {/* slanted (italic) H, revealed through stripes */}
        <g transform="translate(6 0) skewX(-12)">
          <g clipPath={`url(#${clip})`}>
            {STRIPES.map((y) => (
              <rect key={y} x="6" y={y} width="36" height="3.6" fill={`url(#${grad})`} />
            ))}
          </g>
        </g>
      </svg>

      {withText && (
        <span className={`italic ${textClassName ?? 'font-semibold tracking-tight text-lg'}`}>
          Himz<span className="text-fuchsia-400">.</span>
        </span>
      )}
    </span>
  )
}
