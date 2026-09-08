import Logo from './Logo'

const COLUMNS = [
  {
    title: 'Shop',
    links: ['Plush friends', 'Wooden classics', 'Build & stack', 'Dolls', 'Sale'],
  },
  {
    title: 'Help',
    links: ['Delivery & returns', 'Repair kits', 'Size & age guide', 'Track an order'],
  },
  {
    title: 'Toopoli',
    links: ['Our story', 'How we make things', 'Safety & testing', 'Stockists'],
  },
]

const SOCIAL = ['Instagram', 'Pinterest', 'TikTok']

export default function Footer() {
  return (
    <footer className="bg-shell pt-16 pb-8">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[24rem] text-[14px] leading-relaxed text-ink-soft">
              A small toy shop for big imaginations. Made in Bristol, sent
              everywhere, mended for free for as long as you own it.
            </p>
            <ul className="mt-6 flex gap-2">
              {SOCIAL.map((name) => (
                <li key={name}>
                  <a href="#top" className="pill pill-ghost text-[13px]">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-[16px] font-semibold text-ink">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-[14px] text-ink-soft transition-colors hover:text-candy"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 text-[13px] text-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} Toopoli Ltd. Registered in England.</p>
          <p className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span aria-hidden="true">·</span>
            <span>EN71 tested</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
