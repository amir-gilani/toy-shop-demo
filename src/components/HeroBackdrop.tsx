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
 * The colour artwork's backdrop, sampled from its edges (they are all within a
 * shade of this). Above the artwork there is no picture left to reveal, so the
 * lens shows this instead and reads as the same backdrop running on behind the
 * nav, rather than a circle cut off by a straight line.
 */
const REVEAL_BACKDROP = '#e56146'

/** Wide enough for the backdrop to show the lens clear of the artwork. */
const WIDE = '(min-width: 48rem)'

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
  const worldRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLImageElement>(null)
  /** How far the revealed backdrop runs on above the artwork, in px. */
  const aboveRef = useRef(0)

  /** Pointer target and the eased position actually drawn, in host coordinates. */
  const targetRef = useRef({ x: -9999, y: -9999 })
  const easedRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef(0)

  useEffect(() => {
    const host = hostRef.current
    const lens = lensRef.current
    const world = worldRef.current
    const inner = innerRef.current
    if (!host || !lens || !world || !inner) return

    // The revealed image has to match the base one exactly, so it is sized to
    // the host rather than to the circle that clips it. The world around it
    // runs on above, up past the top of the hero, so the lens has backdrop to
    // show wherever the cursor goes up there.
    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      const above = window.matchMedia?.(WIDE).matches ? host.offsetTop + LENS : 0
      aboveRef.current = above

      world.style.width = `${width}px`
      world.style.height = `${height + above}px`
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
      world.style.transform = `translate3d(${(-lx).toFixed(2)}px, ${(-ly - aboveRef.current).toFixed(2)}px, 0)`

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

      // The lens stays up while any of the circle still overlaps the artwork,
      // and on a wide hero all the way up behind the nav, where the backdrop
      // carries on above the picture.
      const reach = LENS / 2
      const inside =
        x >= -reach &&
        y >= -reach - aboveRef.current &&
        x <= rect.width + reach &&
        y <= rect.height + reach
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
      className="absolute inset-x-0 bottom-0 z-0 h-[34%] overflow-hidden md:-right-[4%] md:left-auto md:h-[88%] md:w-[84%] md:overflow-visible"
    >
      {/*
        The fade into the cream belongs to the base artwork only. On the host it
        also faded the lens, so the reveal dimmed to nothing exactly where the
        cursor was heading for the nav.
      */}
      <img
        src="/panda-white.jpg"
        alt="Panda in a straw hat"
        className="hero-backdrop absolute inset-0 h-full w-full object-cover"
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
        <div
          ref={worldRef}
          className="hero-reveal absolute top-0 left-0"
          style={{ backgroundColor: REVEAL_BACKDROP, willChange: 'transform' }}
        >
          <img
            ref={innerRef}
            src="/panda-red.jpg"
            alt=""
            aria-hidden="true"
            className="hero-reveal-image absolute bottom-0 left-0 max-w-none object-cover"
            style={{ objectPosition: 'var(--panda-pos, 58% 50%)' }}
          />
        </div>
      </div>
    </div>
  )
}
