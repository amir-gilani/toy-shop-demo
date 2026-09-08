import { useState } from 'react'
import type { Category } from '../data/shop'
import { CATEGORIES } from '../data/shop'
import { useReveal } from '../hooks/useReveal'
import ToyArt from './ToyArt'
import SectionHeading from './SectionHeading'
import { Confetti, Squiggle } from './Decor'

/** Shelf photo when there is one, the drawing when there isn't — see Product.image. */
function CategoryArt({ category }: { category: Category }) {
  const [photoFailed, setPhotoFailed] = useState(false)

  if (!category.image || photoFailed) {
    return <ToyArt name={category.art} title={category.name} />
  }

  return (
    <img
      src={category.image}
      alt={category.name}
      loading="lazy"
      decoding="async"
      onError={() => setPhotoFailed(true)}
      className="h-full w-full rounded-[1.5rem] border-2 border-ink/8 object-cover"
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
              className="group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[2rem] border-2 border-dashed border-ink/15 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-solid hover:border-ink hover:shadow-[0_26px_44px_-26px_rgb(36_26_46_/_0.65)] sm:p-6"
              style={{ backgroundColor: category.tint }}
            >
              <div
                className="h-32 w-32 self-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 sm:h-44 sm:w-44"
                style={{ transform: `rotate(${category.tilt})` }}
              >
                <CategoryArt category={category} />
              </div>

              <div>
                <h3 className="font-display text-[17px] leading-tight font-semibold text-ink sm:text-[20px]">
                  {category.name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-soft">
                  {category.count}
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
