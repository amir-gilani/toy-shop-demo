import type { Review } from '../data/shop'
import { REVIEWS } from '../data/shop'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'

/** "Hannah W." -> "HW". Falls back to the first letter for a single-word name. */
function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

/**
 * Reviewer profile picture.
 *
 * A monogram rather than a face: these reviews are written copy, and putting a
 * real photographed person beside words they never said is the one thing a
 * testimonial must not do. The line underneath already names the toy, so the
 * circle carries the initials alone.
 */
function ReviewerAvatar({ review }: { review: Review }) {
  return (
    <span
      className="font-display grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink text-[15px] leading-none font-bold tracking-[0.02em] text-ink"
      style={{ backgroundColor: review.tint }}
      aria-hidden="true"
    >
      {initialsOf(review.name)}
    </span>
  )
}

export default function Testimonials() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden bg-mintwash py-20 sm:py-28">
      {/*
        The reveal sits on the content, never on the section, because the
        section carries the background colour. Fading that made the wavy divider
        above it paint its colour at full strength while the block it leads into
        was still transparent — the join arrived before the thing it joined to.
      */}
      <div ref={ref} className="reveal relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="2,400 reviews, 4.9 average"
          title="What the grown-ups say"
          highlight="grown-ups"
          align="center"
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <li
              key={review.name}
              className="speech lift relative flex flex-col rounded-[2rem] border-2 border-ink/10 bg-cloud p-7"
            >
              <span
                className="text-[14px] tracking-[0.08em] text-butter"
                aria-label="5 out of 5"
              >
                ★★★★★
              </span>

              <blockquote className="font-display mt-4 flex-1 text-[18px] leading-snug font-medium text-ink">
                “{review.quote}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3.5 border-t border-ink/8 pt-5">
                <ReviewerAvatar review={review} />
                <span>
                  <span className="block text-[14px] font-semibold text-ink">
                    {review.name}
                  </span>
                  <span className="block text-[13px] text-ink-soft">
                    {review.detail}
                  </span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
