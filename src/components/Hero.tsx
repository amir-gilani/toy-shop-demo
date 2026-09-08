import { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { useParallax } from '../hooks/useParallax'
import HeroBackdrop from './HeroBackdrop'

const TYPED_LINES = [
  'plush friends built to be dragged everywhere',
  'solid-wood toys that outlive the childhood',
  'gifts wrapped by hand, ready to give',
]

const STATS = [
  { value: '19k', label: 'toys adopted' },
  { value: '4.9★', label: 'from 2,400 reviews' },
  { value: '60d', label: 'change of heart' },
]

/**
 * Small sticker that floats over the artwork. It sits nearer the viewer than the
 * card, so it travels further with the pointer — that difference is what reads
 * as depth.
 */
function Sticker({
  className,
  tilt,
  depth,
  children,
}: {
  className: string
  tilt: string
  depth: number
  children: React.ReactNode
}) {
  const ref = useParallax<HTMLDivElement>(depth, { base: `rotate(${tilt})` })

  return (
    <div
      ref={ref}
      /*
       * No transform prop: Hero re-renders on every typewriter character, and a
       * React-owned transform would fight the rAF loop for the same property.
       * The resting rotation rides along in the hook's `base` instead.
       */
      className={`absolute hidden rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-24px_rgb(36_26_46_/_0.55)] md:block ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

/**
 * The typewriter owns its own component on purpose. Left in Hero it would
 * re-render the artwork and both stickers roughly 24 times a second, for as
 * long as the page is open, competing with the parallax for the same frames.
 */
function TypedLine() {
  const [lineIndex, setLineIndex] = useState(0)
  const { displayed, done } = useTypewriter(TYPED_LINES[lineIndex], 42, 500)

  // Hold the finished line for a beat, then move on to the next promise.
  useEffect(() => {
    if (!done) return
    const timeout = setTimeout(
      () => setLineIndex((index) => (index + 1) % TYPED_LINES.length),
      2200,
    )
    return () => clearTimeout(timeout)
  }, [done, lineIndex])

  return (
    <span className="font-semibold text-ink">
      {displayed}
      <span
        className={`ml-[2px] inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-candy ${
          done ? 'opacity-0' : 'animate-blink'
        }`}
      />
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-cream pt-[104px] pb-[38%] md:pt-[120px] md:pb-0"
    >
      <HeroBackdrop />

      {/*
        Cream over the left of the artwork, clearing before the panda's face.
        Without it the headline sits on whatever the picture happens to be
        doing; the reveal still reads across everything to the right.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            'linear-gradient(96deg, rgb(255 249 242 / 0.96) 0%, rgb(255 249 242 / 0.82) 24%, rgb(255 249 242 / 0.28) 44%, rgb(255 249 242 / 0) 60%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 hidden md:block"
        style={{
          background:
            'linear-gradient(180deg, rgb(255 249 242 / 0) 0%, rgb(255 249 242 / 0.9) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 sm:px-8 md:grid-cols-2">
        <div className="max-w-[34rem]">
          <span className="pill pill-ghost mb-6 text-[13px]">
            <span aria-hidden="true">🧸</span>
            A small toy shop for big imaginations
          </span>

          <h1 className="font-display text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.95] font-bold text-ink">
            Toys that get
            <br />
            loved
            <span className="relative mx-2 inline-block">
              <span className="relative z-10">to bits</span>
              {/*
                Hand-drawn underline. preserveAspectRatio is off so the stroke
                stretches to whatever width the words happen to take.
              */}
              <svg
                viewBox="0 0 220 20"
                preserveAspectRatio="none"
                className="absolute bottom-[-0.05em] left-[-2%] h-[0.22em] w-[104%] text-butter"
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
            .
          </h1>

          <p className="mt-5 min-h-[3.5em] max-w-[30rem] text-[clamp(1rem,2.2vw,1.2rem)] leading-relaxed text-ink-soft sm:min-h-[2.6em]">
            Every week we put out <TypedLine />
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#shop" className="pill pill-candy text-[15px]">
              Shop the shelf
              <span aria-hidden="true">→</span>
            </a>
            <a href="#gifts" className="pill pill-outline text-[15px]">
              Find a gift
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-[26px] leading-none font-bold text-ink">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[13px] text-ink-soft">{stat.label}</dd>
              </div>
            ))}
          </dl>

          {/*
            The backdrop swap has no affordance of its own — without a line of
            copy most people never find it.
          */}
          <p className="mt-8 hidden items-center gap-2 text-[13px] text-ink-soft md:flex">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full bg-candy"
            />
            move your mouse across the picture to uncover the original
          </p>
        </div>

        {/* One caption, low and right, where the picture is quiet. */}
        <div className="relative hidden h-full min-h-[520px] md:block">
          <Sticker className="right-[6%] bottom-[14%]" tilt="-4deg" depth={48}>
            <p className="font-display text-[15px] font-semibold text-ink">
              Hand-finished
            </p>
            <p className="text-[12px] text-ink-soft">every seam, every time</p>
          </Sticker>
        </div>
      </div>

   </section>
  )
}
