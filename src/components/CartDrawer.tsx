import { useEffect, useRef, useState } from 'react'
import { useCart, type CartLine } from '../hooks/useCart'
import type { Product } from '../data/shop'

const FREE_DELIVERY_OVER = 50

/** Same empty-frame behaviour as the shop card, at thumbnail size. */
function LineThumb({ product }: { product: Product }) {
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = Boolean(product.image) && !photoFailed

  return (
    <div
      className="plate h-[74px] w-[74px] shrink-0 overflow-hidden rounded-2xl"
      style={{ '--plate': product.tint } as React.CSSProperties}
    >
      {showPhoto && (
        <img
          src={product.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setPhotoFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}

function StepperButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-full text-[16px] leading-none font-bold text-ink transition-colors hover:bg-ink hover:text-white"
    >
      {children}
    </button>
  )
}

function Line({ line }: { line: CartLine }) {
  const { setQuantity, remove } = useCart()
  const { product, quantity } = line

  return (
    <li className="flex gap-4 border-b border-ink/8 py-5 last:border-b-0">
      <LineThumb product={product} />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[16px] leading-tight font-semibold text-ink">
            {product.name}
          </h3>
          <button
            type="button"
            onClick={() => remove(product.id)}
            aria-label={`Remove ${product.name} from bag`}
            className="-mt-1 shrink-0 rounded-full p-1 text-[18px] leading-none text-ink-soft transition-colors hover:text-candy"
          >
            ×
          </button>
        </div>

        <p className="mt-0.5 text-[13px] text-ink-soft">Ages {product.age}</p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-full border-2 border-ink/10 bg-white p-0.5">
            <StepperButton
              label={
                quantity === 1
                  ? `Remove ${product.name} from bag`
                  : `One fewer ${product.name}`
              }
              onClick={() => setQuantity(product.id, quantity - 1)}
            >
              −
            </StepperButton>
            <span className="min-w-5 text-center text-[14px] font-bold tabular-nums">
              {quantity}
            </span>
            <StepperButton
              label={`One more ${product.name}`}
              onClick={() => setQuantity(product.id, quantity + 1)}
            >
              +
            </StepperButton>
          </div>

          <p className="font-display text-[17px] font-bold text-ink tabular-nums">
            £{product.price * quantity}
          </p>
        </div>
      </div>
    </li>
  )
}

export default function CartDrawer() {
  const { lines, count, subtotal, isOpen, close, clear } = useCart()
  const panelRef = useRef<HTMLDivElement>(null)

  // Escape closes it, and the page behind it should not scroll while it is up.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  // Move focus into the panel so the keyboard follows the eye.
  useEffect(() => {
    if (isOpen) panelRef.current?.focus()
  }, [isOpen])

  const shortOfFreeDelivery = Math.max(FREE_DELIVERY_OVER - subtotal, 0)

  return (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className="fixed inset-0 z-30 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        aria-hidden={!isOpen}
        tabIndex={-1}
        className="fixed top-0 right-0 z-40 flex h-dvh w-full max-w-[26rem] flex-col bg-cream shadow-[0_0_60px_-12px_rgba(36,26,46,0.45)] transition-transform duration-300 ease-out outline-none"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          visibility: isOpen ? 'visible' : 'hidden',
        }}
      >
        <header className="flex items-center justify-between gap-4 border-b border-ink/8 px-6 py-5">
          <h2 className="font-display text-[22px] font-bold text-ink">
            Your bag
            {count > 0 && (
              <span className="ml-2 text-[15px] font-semibold text-ink-soft">
                {count} {count === 1 ? 'toy' : 'toys'}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close bag"
            className="grid h-10 w-10 place-items-center rounded-2xl border-2 border-ink/10 bg-white/70 text-[20px] leading-none text-ink transition-colors hover:border-ink"
          >
            ×
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span aria-hidden="true" className="text-[44px]">
              🧸
            </span>
            <p className="font-display text-[20px] font-semibold text-ink">
              Nothing in here yet
            </p>
            <p className="text-[14px] leading-relaxed text-ink-soft">
              Pick a toy from the shelf and it will wait for you right here.
            </p>
            <a href="#shop" onClick={close} className="pill pill-candy mt-2 text-[15px]">
              Start browsing
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map((line) => (
                <Line key={line.product.id} line={line} />
              ))}
            </ul>

            <div className="border-t border-ink/8 bg-cloud px-6 py-5">
              <p className="text-[13px] text-ink-soft">
                {shortOfFreeDelivery > 0
                  ? `£${shortOfFreeDelivery} more for free delivery`
                  : 'Free delivery included ✓'}
              </p>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-[17px] font-semibold text-ink">
                  Subtotal
                </span>
                <span className="font-display text-[26px] font-bold text-ink tabular-nums">
                  £{subtotal}
                </span>
              </div>

              <button type="button" className="pill pill-candy mt-4 w-full text-[16px]">
                Checkout
              </button>

              <button
                type="button"
                onClick={clear}
                className="mt-3 w-full text-[13px] font-semibold text-ink-soft transition-colors hover:text-candy"
              >
                Empty the bag
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
