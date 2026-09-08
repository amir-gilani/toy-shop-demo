import { useState } from 'react'
import type { Category } from '../data/shop'
import { CATEGORIES } from '../data/shop'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'
import { Confetti, Squiggle } from './Decor'

/** Shelf photo when there is one, otherwise the plate shows through — see Product.image. */
function CategoryArt({ category }: { category: Category }) {
  const [photoFailed, setPhotoFailed] = useState(false)

  if (!category.image || photoFailed) {
    return null
  }

  return (
    <img
      src={category.image}
      alt={category.name}
      loading="lazy"
      decoding="async"
      onError={() => setPhotoFailed(true)}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  )
}

export default function Categories() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="categories"
      ref={ref}
      className="reveal relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28"
    >
      <Confetti />

      <SectionHeading
        eyebrow="Browse the shelves"
        highlight="aisle"
        title="Pick an aisle"
        body="Six shelves, restocked every Friday morning. Everything is age-labelled, safety-tested and cuddle-approved by our own small focus group."
      />

      <Squiggle className="relative -mt-2 ml-1 h-5 w-32 text-mint" />

      <ul className="relative mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <li key={category.name}>
            <a
              href="#shop"
              className="lift shelf-card group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-ink/8 bg-cloud hover:border-ink"
              style={{ '--tilt': category.tilt } as React.CSSProperties}
            >
              <span
                className="plate relative block aspect-[4/3] w-full overflow-hidden"
                style={{ '--plate': category.tint } as React.CSSProperties}
              >
                <CategoryArt category={category} />
              </span>

              <span className="flex flex-1 items-center justify-between gap-2.5 px-4 py-4 sm:gap-3 sm:px-5">
                <span className="min-w-0">
                  {/* Wraps rather than truncates: two narrow columns on a phone
                      leave "Ready-wrapped gifts" no room on one line. */}
                  <span className="font-display block text-[16px] leading-tight font-semibold text-ink sm:text-[19px]">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-ink-soft">
                    {category.count}
                  </span>
                </span>

                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink/10 text-[13px] text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream sm:h-8 sm:w-8 sm:text-[14px]"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
