import { useLayoutEffect, useRef } from 'react'

/**
 * Pointer parallax.
 *
 * One store, one listener and one rAF loop for the whole page: every layer is
 * eased towards the same normalised pointer position and written straight to
 * `transform`, which the compositor can handle without touching layout or the
 * video decoder. The loop parks itself as soon as everything has settled, so an
 * idle page costs nothing.
 */

type Layer = {
  el: HTMLElement
  /** Maximum travel in px at full pointer deflection. */
  depth: number
  /** Degrees of tilt at full deflection. */
  tilt: number
  /** Transform appended after the parallax part (scale, resting rotation). */
  base: string
  x: number
  y: number
}

const layers = new Set<Layer>()

/** Normalised pointer, -1 to 1 on each axis, (0,0) at the centre of the window. */
let targetX = 0
let targetY = 0

let frame = 0
let listening = false

/** Per-frame fraction of the remaining distance. Lower is heavier and smoother. */
const EASE = 0.085

/** Below this the layer is close enough that another frame would not show. */
const SETTLED = 0.08

function render() {
  let moving = false

  for (const layer of layers) {
    const toX = targetX * layer.depth
    const toY = targetY * layer.depth

    layer.x += (toX - layer.x) * EASE
    layer.y += (toY - layer.y) * EASE

    if (Math.abs(toX - layer.x) > SETTLED || Math.abs(toY - layer.y) > SETTLED) {
      moving = true
    }

    // Tilt from the *eased* offset, not the raw pointer: taking it straight
    // from targetX would snap the rotation into place while the translate was
    // still gliding, and the two would visibly disagree on a fast sweep.
    const eased = layer.depth ? layer.x / layer.depth : 0
    const tilt = layer.tilt ? ` rotate(${(eased * layer.tilt).toFixed(3)}deg)` : ''
    layer.el.style.transform =
      `translate3d(${layer.x.toFixed(2)}px, ${layer.y.toFixed(2)}px, 0)${tilt} ${layer.base}`
  }

  // Park the loop once every layer has arrived; the next move restarts it.
  frame = moving ? requestAnimationFrame(render) : 0
}

function wake() {
  if (!frame) frame = requestAnimationFrame(render)
}

function handlePointerMove(event: PointerEvent) {
  // A finger dragging the page should not shove the hero around; anything that
  // is not a touch (mouse, trackpad, pen) drives the effect.
  if (event.pointerType === 'touch') return

  targetX = (event.clientX / window.innerWidth) * 2 - 1
  targetY = (event.clientY / window.innerHeight) * 2 - 1
  wake()
}

function handlePointerLeave() {
  // Drift back to rest rather than snapping when the pointer leaves the window.
  targetX = 0
  targetY = 0
  wake()
}

function startListening() {
  if (listening) return
  listening = true
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.addEventListener('pointerleave', handlePointerLeave)
}

function stopListening() {
  if (!listening) return
  listening = false
  window.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('pointerleave', handlePointerLeave)
  if (frame) cancelAnimationFrame(frame)
  frame = 0
}

/**
 * The only thing worth asking up front is whether the visitor has opted out of
 * motion. Whether a mouse exists is *not* something to infer from
 * `(hover: hover)` — a Windows laptop with a touchscreen reports `hover: none`
 * with a mouse plugged in, and the effect would silently never run. The pointer
 * events answer the question honestly instead: if a mouse moves, we animate.
 */
function motionAllowed() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  depth: number,
  { tilt = 0, base = '' }: { tilt?: number; base?: string } = {},
) {
  const ref = useRef<T>(null)

  // Layout effect, not effect: the resting transform must land before the
  // first paint, or the sticker flashes unrotated for a frame.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced-motion visitors keep the resting transform, untouched.
    if (!motionAllowed()) {
      if (base) el.style.transform = base
      return
    }

    const layer: Layer = { el, depth, tilt, base, x: 0, y: 0 }
    layers.add(layer)
    // Rest position now; the loop takes over from the next pointer move.
    el.style.transform = base
    startListening()
    wake()

    return () => {
      layers.delete(layer)
      el.style.transform = base
      if (layers.size === 0) stopListening()
    }
  }, [depth, tilt, base])

  return ref
}
