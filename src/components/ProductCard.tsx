import { useEffect, useState } from 'react'
import type { Product } from '../data/shop'
import ToyArt from './ToyArt'

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating)
  return (
    <span
      className="text-[13px] tracking-[0.05em] text-butter"
      aria-label={`${rating} out of 5`}
    >
      {'★'.repeat(rounded)}
      <span className="text-ink/15">{'★'.repeat(5 - rounded)}</span>
    </span>
  )
}

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)
  // A missing photo must not leave a hole in the grid: one failed load and the
  // card goes back to the drawing that shipped with the product.
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = Boolean(product.image) && !photoFailed

  // There is no basket yet, so the button confirms and then quietly resets.
  useEffect(() => {
    if (!added) return
    const timeout = setTimeout(() => setAdded(false), 1800)
    return () => clearTimeout(timeout)
  }, [added])

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-ink/8 bg-cloud transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:shadow-[0_28px_44px_-30px_rgb(36_26_46_/_0.65)]">
      <div
        className={`relative flex aspect-[4/3.4] items-center justify-center overflow-hidden ${
          showPhoto ? '' : 'p-6'
        }`}
        style={{ backgroundColor: product.tint }}
      >
        {product.badge && (
          <span className="absolute top-3.5 left-3.5 rounded-full bg-ink px-3 py-1 text-[11px] font-bold tracking-wide text-cream">
            {product.badge}
          </span>
        )}
        <span className="absolute top-3.5 right-3.5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-bold text-ink-soft">
          {product.age}
        </span>

        {showPhoto ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onError={() => setPhotoFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full max-w-[190px] transition-transform duration-500 group-hover:scale-108 group-hover:-rotate-2">
            <ToyArt name={product.art} title={product.name} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-[12px] text-ink-soft">({product.reviews})</span>
        </div>

        <h3 className="font-display mt-2 text-[19px] leading-tight font-semibold text-ink">
          {product.name}
        </h3>
        <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-ink-soft">
          {product.blurb}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-[22px] font-bold text-ink">
              £{product.price}
            </span>
            {product.wasPrice && (
              <span className="text-[14px] text-ink-soft line-through">
                £{product.wasPrice}
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={() => setAdded(true)}
            aria-label={`Add ${product.name} to bag`}
            className={`pill text-[13px] ${added ? 'pill-candy' : 'pill-solid'}`}
          >
            {added ? 'In the bag ✓' : 'Add to bag'}
          </button>
        </div>
      </div>
    </article>
  )
}
