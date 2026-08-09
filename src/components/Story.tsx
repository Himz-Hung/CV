import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'

/**
 * Story — the scroll-driven centrepiece.
 *
 * A cloud of ~2600 glowing points is projected from 3D to 2D on a <canvas>.
 * As you scroll the tall container, two things happen, both driven directly by
 * scroll progress (so it "scrubs" like an Apple image-sequence):
 *   1. the whole cloud rotates around its Y axis — the "3D model turning" look;
 *   2. it morphs between a set of target shapes, one per chapter of the story.
 *
 * The right half shows the matching text for whichever chapter is in view.
 * Everything animates imperatively inside a single requestAnimationFrame loop,
 * so React never re-renders during scroll.
 */

const POINTS_DESKTOP = 4200
const POINTS_MOBILE = 850

// ---- shape generators -------------------------------------------------------
// Every generator returns a Float32Array of length n*3 (x,y,z), roughly bounded
// to a unit-ish radius so shapes morph into each other at a consistent scale.

type Shape = Float32Array

function makeSphere(n: number, r = 1): Shape {
  // Fibonacci sphere — evenly distributed points on a sphere surface.
  const out = new Float32Array(n * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    out[i * 3] = Math.cos(theta) * radius * r
    out[i * 3 + 1] = y * r
    out[i * 3 + 2] = Math.sin(theta) * radius * r
  }
  return out
}

function makeGlobe(n: number, r = 1.15): Shape {
  // A "wireframe globe" feel: points snapped onto latitude/longitude rings.
  const out = new Float32Array(n * 3)
  const rings = 16
  for (let i = 0; i < n; i++) {
    const lat = (Math.floor((i / n) * rings) / rings) * Math.PI - Math.PI / 2
    const lon = (i * 0.61803398875 * Math.PI * 2) % (Math.PI * 2)
    const cl = Math.cos(lat)
    out[i * 3] = Math.cos(lon) * cl * r
    out[i * 3 + 1] = Math.sin(lat) * r
    out[i * 3 + 2] = Math.sin(lon) * cl * r
  }
  return out
}

function makeTorus(n: number, R = 0.85, tube = 0.34): Shape {
  const out = new Float32Array(n * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const u = golden * i
    const v = i * 0.293 * Math.PI * 2
    out[i * 3] = (R + tube * Math.cos(v)) * Math.cos(u)
    out[i * 3 + 1] = tube * Math.sin(v)
    out[i * 3 + 2] = (R + tube * Math.cos(v)) * Math.sin(u)
  }
  return out
}

function makeClusters(n: number): Shape {
  // Several small cubes floating in a grid — evokes "products / projects".
  const out = new Float32Array(n * 3)
  const centers = [
    [-0.7, 0.45, 0.2],
    [0.7, 0.5, -0.2],
    [-0.6, -0.5, -0.3],
    [0.65, -0.45, 0.3],
    [0, 0.05, 0],
  ]
  for (let i = 0; i < n; i++) {
    const c = centers[i % centers.length]
    const s = 0.28
    out[i * 3] = c[0] + (fract(i * 0.1234) - 0.5) * s
    out[i * 3 + 1] = c[1] + (fract(i * 0.5678) - 0.5) * s
    out[i * 3 + 2] = c[2] + (fract(i * 0.9012) - 0.5) * s
  }
  return out
}

// Deterministic pseudo-fraction so shapes are stable across renders (no random).
function fract(x: number) {
  return x - Math.floor(x)
}

// Sample the opaque pixels of a rendered glyph into a flat (z≈0) point cloud.
function makeGlyph(n: number, glyph: string): Shape {
  const size = 220
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `bold ${Math.floor(size * 0.62)}px "SF Pro Display", Inter, system-ui, sans-serif`
  ctx.fillText(glyph, size / 2, size / 2 + size * 0.02)
  const data = ctx.getImageData(0, 0, size, size).data

  // collect all lit pixels
  const pts: number[] = []
  for (let y = 0; y < size; y += 2) {
    for (let x = 0; x < size; x += 2) {
      if (data[(y * size + x) * 4 + 3] > 128) {
        pts.push((x / size - 0.5) * 2.4, -(y / size - 0.5) * 2.4)
      }
    }
  }

  const out = new Float32Array(n * 3)
  const count = pts.length / 2
  for (let i = 0; i < n; i++) {
    // sample deterministically across the glyph, add a little depth jitter
    const idx = Math.floor(fract(i * 0.61803398875) * count)
    out[i * 3] = pts[idx * 2]
    out[i * 3 + 1] = pts[idx * 2 + 1]
    out[i * 3 + 2] = (fract(i * 0.311) - 0.5) * 0.25
  }
  return out
}

export default function Story() {
  const { t } = useI18n()
  const chapters = t.story.chapters
  const NC = chapters.length

  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Which chapter is centred right now, and the typewriter state for its title.
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState('')

  // Type the active chapter's title out, character by character, each time the
  // chapter changes (and on first mount).
  useEffect(() => {
    const full = chapters[active]?.title ?? ''
    setTyped('')
    let i = 0
    let timer = window.setTimeout(function step() {
      i += 1
      setTyped(full.slice(0, i))
      if (i < full.length) timer = window.setTimeout(step, 30 + Math.random() * 45)
    }, 140)
    return () => window.clearTimeout(timer)
  }, [active, chapters])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const N = window.innerWidth < 768 ? POINTS_MOBILE : POINTS_DESKTOP

    // desktop vs mobile changes where the cloud sits vertically
    const mq = window.matchMedia('(min-width: 768px)')
    let desktop = mq.matches
    const onMq = () => {
      desktop = mq.matches
      resize()
    }
    mq.addEventListener('change', onMq)

    // One shape per chapter (must be exactly NC entries).
    const shapes: Shape[] = [
      makeSphere(N, 1),
      makeGlobe(N),
      makeGlyph(N, '</>'),
      makeTorus(N),
      makeClusters(N),
      makeGlyph(N, '@'),
    ]
    while (shapes.length < NC) shapes.push(makeSphere(N))

    // Live buffer that eases toward the current morph target.
    const cur = new Float32Array(shapes[0])
    const tgt = new Float32Array(N * 3)

    // sizing (device-pixel-ratio aware, matches the canvas's own box)
    let W = 0
    let H = 0
    // Cap the pixel ratio lower on phones: the cloud is drawn with additive
    // ('lighter') compositing every frame, and fill-rate — not point count — is
    // what stutters on mobile GPUs. 1.5 keeps it crisp while roughly halving work.
    let dpr = Math.min(window.devicePixelRatio || 1, desktop ? 2 : 1.5)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, desktop ? 2 : 1.5)
      W = rect.width
      H = rect.height
      canvas.width = Math.max(1, Math.floor(W * dpr))
      canvas.height = Math.max(1, Math.floor(H * dpr))
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // scroll progress across the tall wrapper, 0 → 1.
    // We measure in whole viewports: each chapter occupies one viewport of
    // scroll, so chapterFloat advances by 1 per screen. Clamping to NC-1 makes
    // the final chapter "dwell" through the trailing spacer instead of being
    // centred only at the very last pixel (which caused the end-of-scroll gap).
    let progress = 0
    // Cache the viewport height and refresh it only on resize/orientation —
    // NOT on every scroll tick. On mobile the address bar collapses as you
    // scroll, which changes window.innerHeight mid-gesture; reading it live made
    // `scrolled / vh` jump and the whole cloud stutter. A cached value keeps the
    // scroll→progress mapping smooth through the bar animation.
    let vh = window.innerHeight
    const readProgress = () => {
      const rect = wrap.getBoundingClientRect()
      const scrolled = clamp(-rect.top, 0, rect.height - vh)
      const chapterFloat = clamp(scrolled / vh, 0, NC - 1)
      progress = NC === 1 ? 0 : chapterFloat / (NC - 1)
    }
    readProgress()
    const onResize = () => {
      vh = window.innerHeight
      resize()
      readProgress()
    }
    window.addEventListener('scroll', readProgress, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    let raf = 0
    let visible = true
    let idle = 0
    let lastActive = -1
    const cIndigo = [129, 140, 248]
    const cFuchsia = [240, 171, 252]

    const frame = () => {
      // Bail if the section has scrolled out of view — no reason to keep
      // repainting a cloud nobody can see (saves battery and frees the main
      // thread for the rest of the page's scrolling).
      if (!visible) {
        raf = 0
        return
      }
      idle += reduced ? 0 : 1

      // --- build the morph target from the two neighbouring chapter shapes ---
      const f = progress * (NC - 1)
      const i0 = Math.min(NC - 1, Math.floor(f))
      const i1 = Math.min(NC - 1, i0 + 1)
      const lf = f - i0
      // smootherstep for organic transitions
      const k = lf * lf * lf * (lf * (lf * 6 - 15) + 10)
      const a = shapes[i0]
      const b = shapes[i1]
      for (let j = 0; j < N * 3; j++) tgt[j] = a[j] + (b[j] - a[j]) * k
      // ease the live buffer toward the target (scrubs, with a soft trail)
      for (let j = 0; j < N * 3; j++) cur[j] += (tgt[j] - cur[j]) * 0.14

      // --- rotation: driven by scroll (the "turning model") + gentle drift ---
      const ay = progress * Math.PI * 3 + idle * 0.0016
      const ax = Math.sin(progress * Math.PI * 2) * 0.35
      const cosY = Math.cos(ay)
      const sinY = Math.sin(ay)
      const cosX = Math.cos(ax)
      const sinX = Math.sin(ax)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      const cx = W / 2
      // nudge the cloud down a touch on desktop so it reads dead-centre; on
      // mobile the canvas is its own top strip, so plain centre is correct.
      const cy = H / 2 + (desktop ? H * 0.05 : 0)
      const scale = Math.min(W, H) * (desktop ? 0.34 : 0.32)
      const fov = 3.2

      for (let i = 0; i < N; i++) {
        let x = cur[i * 3]
        let y = cur[i * 3 + 1]
        let z = cur[i * 3 + 2]
        // rotate Y
        let nx = x * cosY - z * sinY
        let nz = x * sinY + z * cosY
        // rotate X
        const ny = y * cosX - nz * sinX
        nz = y * sinX + nz * cosX
        x = nx
        y = ny
        z = nz

        const persp = fov / (fov + z)
        const sx = cx + x * scale * persp
        const sy = cy - y * scale * persp

        // depth → colour & size (near = bright/white-ish, far = indigo)
        const depth = clamp((z + 1.4) / 2.8, 0, 1)
        const r = Math.round(cFuchsia[0] * depth + cIndigo[0] * (1 - depth))
        const g = Math.round(cFuchsia[1] * depth + cIndigo[1] * (1 - depth))
        const bl = Math.round(cFuchsia[2] * depth + cIndigo[2] * (1 - depth))
        const alpha = 0.3 + depth * 0.6
        const size = Math.max(0.85, persp * 2.15 * (0.55 + depth))

        ctx.fillStyle = `rgba(${r},${g},${bl},${alpha})`
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      // --- sync the text panels to the current chapter -----------------------
      const panels = panelRefs.current
      for (let i = 0; i < panels.length; i++) {
        const el = panels[i]
        if (!el) continue
        const center = NC === 1 ? 0 : i / (NC - 1)
        const dist = Math.abs(progress - center)
        const win = 1 / (NC - 1) / 2 + 0.06
        const o = clamp(1 - dist / win, 0, 1)
        el.style.opacity = String(o)
        el.style.transform = `translateY(${(1 - o) * 26}px)`
        el.style.pointerEvents = o > 0.6 ? 'auto' : 'none'
      }

      // --- light up the progress rail for the active chapter -----------------
      const activeIdx = Math.round(progress * (NC - 1))
      if (activeIdx !== lastActive) {
        lastActive = activeIdx
        setActive(activeIdx) // triggers the title typewriter (rare — on change only)
      }
      const dots = dotRefs.current
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        if (!d) continue
        const on = i === activeIdx
        d.style.width = on ? '28px' : '14px'
        d.style.backgroundColor = on ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.18)'
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    // Pause/resume the render loop as the section enters and leaves the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(frame)
      },
      { threshold: 0 },
    )
    io.observe(wrap)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mq.removeEventListener('change', onMq)
      window.removeEventListener('scroll', readProgress)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [NC])

  return (
    <section id="top" ref={wrapRef} className="relative">
      <div className="sticky top-0 z-10 h-[100dvh] overflow-hidden">
        {/* soft ambient glow behind the cloud — lighter blur on phones, where
            huge blur radii are the single most expensive thing to composite */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[12%] top-1/2 -translate-y-1/2 h-[70vmin] w-[70vmin] rounded-full bg-indigo-600/20 blur-[70px] md:blur-[120px]" />
          <div className="absolute left-[24%] top-1/3 h-[40vmin] w-[40vmin] rounded-full bg-fuchsia-600/15 blur-[60px] md:blur-[110px]" />
        </div>

        {/* the point cloud — top strip on mobile, left half on desktop */}
        <canvas
          ref={canvasRef}
          className="absolute left-0 right-0 top-0 h-[42dvh] w-full md:inset-y-0 md:right-auto md:h-full md:w-1/2"
        />

        {/* stacked story panels — lower-centre on mobile, right half on desktop */}
        <div className="absolute inset-x-0 top-[42%] bottom-0 md:inset-0 md:left-1/2 md:top-0 md:w-1/2">
          {chapters.map((ch, i) => (
            <div
              key={i}
              ref={(el) => {
                panelRefs.current[i] = el
              }}
              className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 lg:px-20"
              style={{ opacity: 0 }}
            >
              <p className="mb-4 text-xs md:text-sm uppercase tracking-[0.3em] text-haze">
                {ch.eyebrow}
              </p>
              {/* title as a typewriter for the active chapter; an invisible
                  sizer reserves the full box so the layout never jumps */}
              <h2 className="grid text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
                <span aria-hidden className="[grid-area:1/1] invisible">
                  {ch.title}
                </span>
                <span className="gradient-text animate-shimmer [grid-area:1/1]">
                  {i === active ? typed : ch.title}
                  {i === active && typed.length < ch.title.length && (
                    <span aria-hidden className="caret" />
                  )}
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/70">
                {ch.body}
              </p>
            </div>
          ))}
        </div>

        {/* progress rail */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex gap-2 md:left-1/4">
          {chapters.map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el
              }}
              className="h-1 w-[14px] rounded-full bg-white/[0.18] transition-all duration-300"
            />
          ))}
        </div>
      </div>

      {/* Invisible scroll spacers give the section its height AND act as
          scroll-snap targets — one per chapter after the first, so each chapter
          "clicks" into place. The trailing spacer lets the last chapter dwell
          before the pin releases (no more end-of-scroll gap). */}
      <div aria-hidden>
        {Array.from({ length: NC - 1 }).map((_, i) => (
          <div key={i} className="h-[100dvh] snap-start" />
        ))}
        <div className="h-[60dvh]" />
      </div>
    </section>
  )
}

function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v
}
