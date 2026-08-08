// Global ambient layers shared across the whole page: a slow-drifting aurora
// gradient plus a fine film-grain overlay for a premium, textured feel. Both
// are decorative, sit behind the content, and never intercept pointer events.
export default function Ambient() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animate-float absolute -top-[20%] left-1/2 h-[60vh] w-[120vw] -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-indigo-600/10 via-fuchsia-600/10 to-orange-500/10 blur-[120px]" />
      </div>
      <div aria-hidden className="grain-overlay" />
    </>
  )
}
