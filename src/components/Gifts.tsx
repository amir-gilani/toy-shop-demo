import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'
import { Confetti, Blob } from './Decor'
import ToyArt from './ToyArt'
import type { ToyArtKey } from './ToyArt'

const AGES: { age: string; label: string; art: ToyArtKey; tint: string }[] = [
  { age: '0–1', label: 'First cuddles', art: 'bunny', tint: '#ffe6f2' },
  { age: '1–3', label: 'Grabbers & stackers', art: 'blocks', tint: '#fff4dd' },
  { age: '3–5', label: 'Whole worlds', art: 'train', tint: '#e4f8f1' },
  { age: '5+', label: 'Proper projects', art: 'rocket', tint: '#e6f3ff' },
]

export default function Gifts() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="gifts"
      ref={ref}
      className="reveal relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28"
    >
      <Blob className="absolute -top-10 left-1/2 h-[420px] w-[420px] -translate-x-1/2 text-lilac/25" />
      <Confetti />

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
              className="group flex h-full flex-col items-center gap-4 rounded-[2rem] border-2 border-ink/8 bg-cloud p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:shadow-[0_24px_40px_-28px_rgb(36_26_46_/_0.6)]"
            >
              <span
                className="grid h-28 w-28 place-items-center rounded-full p-4 transition-transform duration-500 group-hover:scale-105 sm:h-32 sm:w-32"
                style={{ backgroundColor: band.tint }}
              >
                <ToyArt name={band.art} title={band.label} />
              </span>
              <span className="font-display rounded-full bg-ink px-4 py-1.5 text-[22px] leading-none font-bold text-cream transition-colors duration-300 group-hover:bg-candy">
                {band.age}
              </span>
              <span className="text-[14px] text-ink-soft">{band.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Gift-wrap note, doubling as the second call to action. */}
      <div className="relative mt-12 flex flex-col items-center justify-between gap-6 rounded-[2.5rem] border-2 border-ink bg-butter px-7 py-8 text-center sm:px-10 md:flex-row md:text-left">
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
