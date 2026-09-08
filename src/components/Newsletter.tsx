import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Newsletter() {
  const ref = useReveal<HTMLElement>()
  const [email, setEmail] = useState('')
  const [signedUp, setSignedUp] = useState(false)

  return (
    <section ref={ref} className="reveal px-5 py-20 sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-center sm:px-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-[34rem]">
          <p className="text-[13px] font-bold tracking-[0.14em] text-butter uppercase">
            The Friday restock
          </p>
          <h2 className="font-display mt-3 text-[clamp(1.9rem,4.4vw,2.9rem)] leading-[1.05] font-bold text-cream">
            Know what lands before it sells out
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-cream/70">
            One email a week: what came off the workbench, what is nearly gone,
            and £5 off your first order. No tricks, unsubscribe in one click.
          </p>

          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault()
              setSignedUp(true)
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-full border-2 border-cream/20 bg-cream/10 px-6 py-3.5 text-[15px] text-cream placeholder:text-cream/45 focus:border-bubblegum focus:outline-none"
            />
            <button type="submit" className="pill pill-candy shrink-0 text-[15px]">
              {signedUp ? 'You are on the list ✓' : 'Send me the restock'}
            </button>
          </form>

          <p className="mt-4 text-[13px] text-cream/50">
            {signedUp
              ? 'Lovely — check your inbox for the £5 code.'
              : 'Joined by 31,000 parents, aunts, uncles and one very organised grandad.'}
          </p>
        </div>
      </div>
    </section>
  )
}
