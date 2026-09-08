import { useEffect, useRef } from 'react'

/** Diameter of the reveal, in px. */
const LENS = 340

/**
 * How far left of the cursor the circle sits. Nudging it off-centre puts more
 * of the revealed backdrop on the left of the pointer than the right, which is
 * where the eye is already looking as it sweeps across.
 */
const LENS_OFFSET_X = -34

/** Per-frame fraction of the remaining distance. High enough to feel attached. */
const EASE = 0.35

/** Below this the lens has arrived and another frame would not show. */
const SETTLED = 0.3

/**
 * The hero backdrop: the white artwork, with a circle under the cursor showing
 * the red one.
 *
 * The reveal moves layers rather than repainting a mask. A
 * `mask-image: radial-gradient(... at Xpx Ypx ...)` updated every frame would
 * repaint a full-screen image on each move; here the circle is a clipped box
 * that is translated, and the red image inside it is translated by exactly the
 * opposite amount so it stays pinned to the page. Both are composited
 * transforms, so a cursor sweep costs no repaint at all.
 *
 * The soft edge is a static mask on the circle, so it never changes either.
 */
export default function HeroBackdrop() {
  const hostRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLImageElement>(null)

  /** Pointer target and the eased position actually drawn, in host coordinates. */
  const targetRef = useRef({ x: -9999, y: -9999 })
  const easedRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef(0)

  useEffect(() => {
    const host = hostRef.current
    const lens = lensRef.current
    const inner = innerRef.current
    if (!host || !lens || !inner) return

    // The revealed image has to match the base one exactly, so it is sized to
    // the host rather than to the circle that clips it.
    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      inner.style.width = `${width}px`
      inner.style.height = `${height}px`
    }
    resize()

    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize)
    observer?.observe(host)

    const draw = () => {
      frameRef.current = 0

      const target = targetRef.current
      const eased = easedRef.current
      eased.x += (target.x - eased.x) * EASE
      eased.y += (target.y - eased.y) * EASE

      const lx = eased.x - LENS / 2 + LENS_OFFSET_X
      const ly = eased.y - LENS / 2
      lens.style.transform = `translate3d(${lx.toFixed(2)}px, ${ly.toFixed(2)}px, 0)`
      inner.style.transform = `translate3d(${(-lx).toFixed(2)}px, ${(-ly).toFixed(2)}px, 0)`

      if (
        Math.abs(target.x - eased.x) > SETTLED ||
        Math.abs(target.y - eased.y) > SETTLED
      ) {
        frameRef.current = requestAnimationFrame(draw)
      }
    }

    const wake = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(draw)
    }

    const handleMove = (event: PointerEvent) => {
      // A finger dragging the page is scrolling, not pointing.
      if (event.pointerType === 'touch') return

      const rect = host.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      lens.style.opacity = inside ? '1' : '0'
      if (!inside) return

      // First sighting: put the lens straight under the cursor instead of
      // letting it fly in from wherever it was parked.
      if (easedRef.current.x < -9000) easedRef.current = { x, y }

      targetRef.current = { x, y }
      wake()
    }

    const handleLeave = () => {
      lens.style.opacity = '0'
    }

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!reduced) {
      window.addEventListener('pointermove', handleMove, { passive: true })
      document.addEventListener('pointerleave', handleLeave)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerleave', handleLeave)
      observer?.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    /*
     * Full-bleed on a wide hero, where the 16:9 artwork is barely cropped at
     * all. A portrait phone is the opposite case: covering it would blow the
     * picture up more than 3x and leave a vertical stripe of fur, so there the
     * artwork becomes a band across the bottom with the copy sitting above it.
     */
    <div
      ref={hostRef}
      className="hero-backdrop absolute inset-x-0 bottom-0 z-0 h-[34%] overflow-hidden md:-right-[4%] md:left-auto md:h-[88%] md:w-[84%]"
    >
      <img
        src="/panda-white.jpg"
        alt="Panda in a straw hat"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'var(--panda-pos, 58% 50%)' }}
      />

      <div
        ref={lensRef}
        aria-hidden="true"
        className="absolute top-0 left-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-300"
        style={{
          width: LENS,
          height: LENS,
          willChange: 'transform',
          // Static, so it never repaints: soft-edged circle.
          WebkitMaskImage: 'radial-gradient(circle, #000 52%, transparent 78%)',
          maskImage: 'radial-gradient(circle, #000 52%, transparent 78%)',
        }}
      >
        <img
          ref={innerRef}
          src="/panda-red.jpg"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 max-w-none object-cover"
          style={{
            objectPosition: 'var(--panda-pos, 58% 50%)',
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  )
}
