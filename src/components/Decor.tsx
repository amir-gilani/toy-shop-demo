/**
 * Background furniture: sparkles, squiggles, dot fields, blobs and the wavy
 * edges between sections.
 *
 * All of it is decorative, so every piece is aria-hidden and pointer-events
 * none — it should never end up in the tab order or in a screen reader, and it
 * must never sit between a cursor and a card.
 *
 * None of them position themselves: pass `absolute` (or not) from the call
 * site. Baking it in meant a caller asking for `relative` got whichever of the
 * two Tailwind wrote last, which is not something to leave to chance.
 */

const HIDDEN = {
  'aria-hidden': true as const,
  focusable: 'false' as const,
}

/** Four-point sparkle. The workhorse — scatter these anywhere. */
export function Sparkle({
  className = '',
  color = 'currentColor',
  style,
}: {
  className?: string
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`pointer-events-none ${className}`}
      fill={color}
      style={style}
      {...HIDDEN}
    >
      <path d="M12 1c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z" />
    </svg>
  )
}

/** Hand-drawn wobble, good under a heading or trailing off a corner. */
export function Squiggle({
  className = '',
  color = 'currentColor',
}: {
  className?: string
  color?: string
}) {
  return (
    <svg
      viewBox="0 0 140 26"
      className={`pointer-events-none ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
      {...HIDDEN}
    >
      <path d="M5 18c11-15 22 8 33-4s22 12 33 0 22 10 33-1" />
    </svg>
  )
}

/** A little field of dots, like the pin-board behind a toy shelf. */
export function Dots({
  className = '',
  color = 'currentColor',
  rows = 4,
  cols = 6,
}: {
  className?: string
  color?: string
  rows?: number
  cols?: number
}) {
  const gap = 14
  return (
    <svg
      viewBox={`0 0 ${cols * gap} ${rows * gap}`}
      className={`pointer-events-none ${className}`}
      fill={color}
      {...HIDDEN}
    >
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * gap + gap / 2}
            cy={row * gap + gap / 2}
            r="2.6"
          />
        )),
      )}
    </svg>
  )
}

/** Big soft shape, meant to sit at very low opacity behind a whole section. */
export function Blob({
  className = '',
  color = 'currentColor',
}: {
  className?: string
  color?: string
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`pointer-events-none ${className}`}
      fill={color}
      {...HIDDEN}
    >
      <path d="M44 26c22-18 60-30 88-14s36 56 30 88-26 60-58 66-72-10-88-40-4-72 28-100Z" />
    </svg>
  )
}

/**
 * The wavy join between two sections.
 *
 * `from` paints the strip and `to` draws the wave over it, so stacking it
 * between a cream section and a shell one makes the boundary a curve instead of
 * a ruled line. It is a block element in normal flow — no negative margins, no
 * overlap to go wrong at odd widths.
 */
export function WaveDivider({
  from,
  to,
  flip = false,
}: {
  from: string
  to: string
  flip?: boolean
}) {
  return (
    <div style={{ background: from }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="block h-14 w-full sm:h-24"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
        {...HIDDEN}
      >
        <path
          d="M0 58C220 4 440 2 720 52s500 54 720 4v54H0Z"
          fill={to}
        />
      </svg>
    </div>
  )
}

/** Confetti scattered across a section — a fixed spread, not random per render. */
export function Confetti({ className = '' }: { className?: string }) {
  const bits = [
    { top: '18%', left: '93%', color: '#ff6fb5', size: 26, tilt: -14 },
    { top: '36%', left: '2%', color: '#ffd66e', size: 20, tilt: 12 },
    { top: '58%', left: '96%', color: '#7adfc0', size: 24, tilt: 24 },
    { top: '80%', left: '4%', color: '#c6a8ff', size: 22, tilt: -20 },
    { top: '92%', left: '90%', color: '#6ec6ff', size: 18, tilt: 8 },
    { top: '70%', left: '50%', color: '#ff8a5b', size: 16, tilt: -8 },
  ]

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {bits.map((bit) => (
        <Sparkle
          key={`${bit.top}-${bit.left}`}
          color={bit.color}
          className="animate-float absolute"
          // Inline: every bit gets its own position, size and lean.
          style={{
            top: bit.top,
            left: bit.left,
            width: bit.size,
            height: bit.size,
            transform: `rotate(${bit.tilt}deg)`,
            // Stagger so they do not bob in unison.
            animationDelay: `${(bit.size % 5) * 0.6}s`,
          }}
        />
      ))}
    </div>
  )
}
