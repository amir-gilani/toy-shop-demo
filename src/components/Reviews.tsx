import { REVIEWS } from '../data/shop'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'
import ToyArt from './ToyArt'

export default function Reviews() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="reveal bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          align="center"
          tone="cream"
          eyebrow="2,400 reviews"
          title="What the grown-ups say"
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <li
              key={review.name}
              className="flex flex-col rounded-[2rem] bg-cream p-6 sm:p-7"
            >
              <span className="text-[15px] tracking-[0.08em] text-butter" aria-label="5 out of 5">
                ★★★★★
              </span>
              <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-ink">
                “{review.quote}”
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full p-1.5"
                  style={{ backgroundColor: review.tint }}
                >
                  <ToyArt name={review.art} title={review.detail} />
                </span>
                <span>
                  <span className="font-display block text-[15px] font-semibold text-ink">
                    {review.name}
                  </span>
                  <span className="block text-[13px] text-ink-soft">{review.detail}</span>
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
