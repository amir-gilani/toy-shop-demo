import { Sparkle } from './Decor'

/**
 * Every section opens the same way — a candy eyebrow, a display headline and an
 * optional paragraph — so the page reads as one shop rather than six templates.
 *
 * Pass `highlight` with a word from the title to get the same crayon underline
 * the hero uses. It is matched literally, and a title that does not contain it
 * simply renders plain, so a typo costs nothing.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  body,
  align = 'left',
  tone = 'ink',
}: {
  eyebrow: string
  title: string
  highlight?: string
  body?: string
  align?: 'left' | 'center'
  tone?: 'ink' | 'cream'
}) {
  const centered = align === 'center'
  const light = tone === 'cream'

  const cut = highlight ? title.indexOf(highlight) : -1
  const before = cut >= 0 ? title.slice(0, cut) : title
  const marked = cut >= 0 ? title.slice(cut, cut + highlight!.length) : ''
  const after = cut >= 0 ? title.slice(cut + highlight!.length) : ''

  return (
    <div
      className={
        centered ? 'relative mx-auto max-w-[42rem] text-center' : 'relative max-w-[42rem]'
      }
    >
      <p
        className={`inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase ${
          light ? 'text-butter' : 'text-candy'
        }`}
      >
        <Sparkle
          className="relative h-3.5 w-3.5 shrink-0"
          color={light ? '#ffd66e' : '#ff6fb5'}
        />
        {eyebrow}
      </p>

      <h2
        className={`font-display mt-3 text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.05] font-bold ${
          light ? 'text-cream' : 'text-ink'
        }`}
      >
        {before}
        {marked && (
          <span className="relative inline-block">
            <span className="relative z-10">{marked}</span>
            {/*
              preserveAspectRatio is off so the stroke stretches to whatever
              width the word happens to take at this breakpoint.
            */}
            <svg
              viewBox="0 0 220 20"
              preserveAspectRatio="none"
              className={`absolute bottom-[-0.04em] left-[-2%] h-[0.2em] w-[104%] ${
                light ? 'text-bubblegum' : 'text-butter'
              }`}
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 14C60 4 150 3 214 8"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
          </span>
        )}
        {after}
      </h2>

      {body && (
        <p
          className={`mt-4 text-[16px] leading-relaxed sm:text-[17px] ${
            light ? 'text-cream/75' : 'text-ink-soft'
          }`}
        >
          {body}
        </p>
      )}
    </div>
  )
}
