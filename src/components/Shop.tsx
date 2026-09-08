import { useState } from 'react'
import { PRODUCTS } from '../data/shop'
import { useReveal } from '../hooks/useReveal'
import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'

const FILTERS = ['Everything', 'Plush', 'Wooden', 'Under £40'] as const

type Filter = (typeof FILTERS)[number]

const PLUSH = new Set(['bear', 'bunny', 'dino', 'doll'])
const WOODEN = new Set(['train', 'blocks', 'horse'])

function matches(filter: Filter, art: string, price: number) {
  if (filter === 'Plush') return PLUSH.has(art)
  if (filter === 'Wooden') return WOODEN.has(art)
  if (filter === 'Under £40') return price < 40
  return true
}

export default function Shop() {
  const ref = useReveal<HTMLElement>()
  const [filter, setFilter] = useState<Filter>('Everything')

  const shown = PRODUCTS.filter((product) =>
    matches(filter, product.art, product.price),
  )

  return (
    <section
      id="shop"
      ref={ref}
      className="reveal relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="This week on the shelf"
          highlight="selling out"
          title="The ones that keep selling out"
          body="Restocked Friday, packed Monday. If a favourite loses an ear, send us a photo and we post a repair kit — free, for as long as you own it."
        />

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={`pill text-[13px] ${
                filter === option ? 'pill-solid' : 'pill-ghost'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <a href="#shop" className="pill pill-outline text-[15px]">
          See all 251 toys
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
