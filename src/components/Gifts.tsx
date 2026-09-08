import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'

type AgeBand = {
  age: string
  label: string
  image: string
  tint: string
}

const AGES: AgeBand[] = [
  {
    age: '0–1',
    label: 'First cuddles',
    image: '/ages/first-cuddles.jpg',
    tint: '#ffe6f2',
  },
  {
    age: '1–3',
    label: 'Grabbers & stackers',
    image: '/ages/grabbers-stackers.jpg',
    tint: '#fff4dd',
  },
  {
    age: '3–5',
    label: 'Whole worlds',
    image: '/ages/whole-worlds.jpg',
    tint: '#e4f8f1',
  },
  {
    age: '5+',
    label: 'Proper projects',
    image: '/ages/proper-projects.jpg',
    tint: '#e6f3ff',
  },
]

/**
 * The photo fills the whole disc; the tint stays underneath as the ring, so a
 * band keeps its colour while the image loads — and stays a plain coloured disc
 * for as long as there is no photograph to put in it.
 */
function AgeArt({ band }: { band: AgeBand }) {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <span
      className="plate grid h-28 w-28 place-items-center overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105 sm:h-32 sm:w-32"
      style={{ '--plate': band.tint } as React.CSSProperties}
    >
      {!photoFailed && (
        <img
          src={band.image}
          alt={band.label}
          loading="lazy"
          decoding="async"
          onError={() => setPhotoFailed(true)}
          className="h-full w-full rounded-full object-cover"
        />
      )}
    </span>
  )
}

export default function Gifts() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="gifts"
      ref={ref}
      className="reveal relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading
        eyebrow="Stuck for a present?"
        highlight="how old"
        title="Tell us how old they are"
        body="Pick an age and we will show you what children that age actually keep playing with three months later — not what sells best in the week before a birthday."
        align="center"
      />

      <ul className="relative mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {AGES.map((band) => (
          <li key={band.age}>
            <a
              href="#shop"
              className="lift group flex h-full flex-col items-center rounded-[2rem] border-2 border-ink/8 bg-cloud p-6 text-center hover:border-ink"
            >
              <AgeArt band={band} />

              {/*
                The age sets the type, not a black pill: a solid badge under the
                disc gave the card two things competing to be looked at first.
              */}
              <span className="font-display mt-5 text-[26px] leading-none font-semibold text-ink transition-colors duration-300 group-hover:text-candy">
                {band.age}
              </span>
              <span className="mt-2 text-[13px] tracking-[0.02em] text-ink-soft">
                {band.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Gift-wrap note, doubling as the second call to action. */}
      <div className="raised relative mt-12 flex flex-col items-center justify-between gap-6 rounded-[2.5rem] border-2 border-ink/10 bg-butter px-7 py-8 text-center sm:px-10 md:flex-row md:text-left">
        <div>
          <h3 className="font-display text-[clamp(1.4rem,3vw,2rem)] leading-tight font-bold text-ink">
            Every order arrives wrapped, at no extra cost
          </h3>
          <p className="mt-2 max-w-[38rem] text-[15px] leading-relaxed text-ink/70">
            Recycled tissue, a cotton ribbon and a handwritten card in your own
            words. Tick the box at checkout and tell us what to write.
          </p>
        </div>
        <a href="#shop" className="pill pill-solid shrink-0 text-[15px]">
          Start a gift
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
