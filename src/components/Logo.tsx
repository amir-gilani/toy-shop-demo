/**
 * The Toopoli mark: a plush bear head reduced to five circles, which is about
 * as small as a friendly face gets before it stops reading as one. It keeps its
 * own colours in every context, so only the wordmark needs to react to a dark
 * background.
 */
export default function Logo({
  wordmarkClass = 'text-ink',
}: {
  wordmarkClass?: string
}) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-bubblegum shadow-[0_8px_18px_-8px_rgb(244_67_139_/_0.85)] sm:h-11 sm:w-11">
        <svg
          viewBox="0 0 64 64"
          className="h-7 w-7 sm:h-8 sm:w-8"
          role="img"
          aria-label="Toopoli"
        >
          <circle cx="20" cy="20" r="9" fill="#fff" />
          <circle cx="44" cy="20" r="9" fill="#fff" />
          <circle cx="32" cy="36" r="19" fill="#fff" />
          <circle cx="25" cy="33" r="3" fill="#241a2e" />
          <circle cx="39" cy="33" r="3" fill="#241a2e" />
          <ellipse cx="32" cy="42" rx="6" ry="4.5" fill="#ffd66e" />
        </svg>
      </span>
      <span
        className={`font-display text-[22px] leading-none font-semibold tracking-tight sm:text-[25px] ${wordmarkClass}`}
      >
        Toopoli
        <span className="align-super text-[0.5em] font-normal opacity-60">®</span>
      </span>
    </span>
  )
}
