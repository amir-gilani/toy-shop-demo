import { MARQUEE_ITEMS } from '../data/shop'

/** Each promise gets its own colour, so the ribbon reads as a string of flags. */
const COLOURS = ['#ff6fb5', '#ffd66e', '#7adfc0', '#6ec6ff', '#c6a8ff', '#ff8a5b']

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y-[3px] border-ink bg-ink py-4">
      {/* The track holds the list twice so a half-lap loops seamlessly. */}
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {MARQUEE_ITEMS.map((item, index) => (
              <li
                key={item}
                className="font-display flex items-center gap-6 px-7 text-[16px] font-semibold whitespace-nowrap text-cream sm:text-[19px]"
              >
                {item}
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 rotate-45 rounded-[3px]"
                  style={{ backgroundColor: COLOURS[index % COLOURS.length] }}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
