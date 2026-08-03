const words = [
  'ReactJS',
  'TypeScript',
  'Redux Toolkit',
  'TailwindCSS',
  'React Query',
  'Vite',
  'RESTful API',
  'Performance',
  'Responsive',
  'Agile',
]

export default function Marquee() {
  return (
    <div className="relative py-8 border-y border-white/10 overflow-hidden select-none">
      <div className="flex gap-8 whitespace-nowrap animate-[scrollx_28s_linear_infinite]">
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="text-3xl md:text-5xl font-semibold text-white/10 hover:text-white/40 transition-colors duration-300"
          >
            {w} <span className="text-fuchsia-500/40">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scrollx {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
