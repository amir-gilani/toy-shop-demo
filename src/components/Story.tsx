import { useState } from 'react'
import { PROMISES } from '../data/shop'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'
import { Confetti, Dots } from './Decor'

/** Photograph for the story, served from `public/story/`. Empty until one exists. */
const STORY_PHOTO = '/story/workshop.jpg'

const ICONS: Record<string, string> = {
  stitch: 'M4 12c3-4 6-4 9 0s6 4 9 0',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6Z',
  gift: 'M3 9h18v3H3zM4.5 12h15v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1zM12 9v12M12 9c-3.5 0-5-1-5-3s3-2 5 3c2-5 5-4 5-3s-1.5 3-5 3z',
  truck: 'M3 7h10v9H3zM13 10h4l3 3v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
}

/**
 * The frame keeps its size and tint whether or not the photograph is there, so
 * the section reads as finished either way — see `Product.image`.
 */
function StoryPhoto() {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-[30rem]">
      <div
        className="aspect-square overflow-hidden rounded-[2.5rem] border-2 border-ink/8"
        style={{ backgroundColor: '#ffe6f2' }}
      >
        {!photoFailed && (
          <img
            src={STORY_PHOTO}
            alt="The Toopoli workshop"
            loading="lazy"
            decoding="async"
            onError={() => setPhotoFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <span className="animate-wiggle font-display absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-[14px] font-semibold text-cream shadow-[0_18px_36px_-18px_rgb(36_26_46_/_0.8)]">
        Since 2016
      </span>
    </div>
  )
}

export default function Story() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="story" className="relative overflow-hidden bg-peachwash py-20 sm:py-28">
      <Dots className="absolute top-16 right-8 h-24 w-32 text-bubblegum/30" rows={4} cols={6} />
      <Confetti />

      {/*
        The reveal sits on the content, never on the section, because the
        section carries the background colour. Fading that made the wavy divider
        above it paint its colour at full strength while the block it leads into
        was still transparent — the join arrived before the thing it joined to.
      */}
      <div ref={ref} className="reveal relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Why Toopoli"
              highlight="our own kids"
              title="We only make toys we would hand to our own kids"
              body="Toopoli started in 2016 on one kitchen table, because everything on the high street was either plastic that broke by Boxing Day or beautiful things nobody was allowed to touch. We wanted the third option: toys good enough to keep, sturdy enough to ruin."
            />

            <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {PROMISES.map((promise) => (
                <div key={promise.title}>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bubblegum text-cream">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={ICONS[promise.icon]} />
                    </svg>
                  </span>
                  <dt className="font-display mt-3.5 text-[18px] font-semibold text-ink">
                    {promise.title}
                  </dt>
                  <dd className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
                    {promise.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* One frame for a photograph of the workshop; empty until there is one. */}
          <StoryPhoto />
        </div>
      </div>
    </section>
  )
}
