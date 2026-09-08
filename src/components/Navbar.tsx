import { useEffect, useState } from 'react'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Shop all', href: '#shop' },
  { label: 'Plush', href: '#categories' },
  { label: 'Wooden', href: '#categories' },
  { label: 'Gifts', href: '#gifts' },
  { label: 'Our story', href: '#story' },
]

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 8h15l-1.2 11.2a2 2 0 0 1-2 1.8H7.7a2 2 0 0 1-2-1.8Z" />
      <path d="M8.8 8V6.4a3.2 3.2 0 0 1 6.4 0V8" />
    </svg>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // The bar starts transparent over the hero and only earns a background once
  // there is content behind it to separate from.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A scrollable page behind an open full-screen menu is disorienting.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      {/*
        Absolute, not fixed: the strip is a welcome, not a permanent fixture, so
        it scrolls away and hands the top of the screen back to the header.
      */}
      <div className="absolute top-0 left-0 z-30 flex w-full items-center justify-center gap-2 bg-ink px-4 py-2 text-center text-[12px] font-semibold tracking-wide text-cream sm:text-[13px]">
        <span aria-hidden="true">✳</span>
        {/* The long version only when there is a line to spare. */}
        <span className="sm:hidden">Free delivery over £40 · free gift wrap</span>
        <span className="hidden sm:inline">
          Free delivery over £40 — and gift wrap is always on the house
        </span>
        <span aria-hidden="true">✳</span>
      </div>

      {/*
        The bar slides up to meet the top of the screen once the announcement
        has scrolled away. That move is a transform, not a change of `top` or
        padding: both of those relayout the page on every frame of the
        transition, which is exactly the kind of cost you feel while scrolling.
      */}
      <header
        className={`fixed top-0 left-0 z-20 w-full border-b py-3.5 transition-[transform,background-color,border-color] duration-300 ease-out ${
          scrolled
            ? 'translate-y-0 border-ink/8 bg-cream'
            : 'translate-y-[33px] border-transparent bg-transparent sm:translate-y-[35px]'
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
          <a href="#top" aria-label="Toopoli home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-7 text-[15px] font-semibold lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 text-ink/75 transition-colors hover:text-candy"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#shop"
              className="pill pill-candy hidden text-[14px] sm:inline-flex"
            >
              <BagIcon />
              Bag
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-bold text-candy">
                2
              </span>
            </a>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-ink/10 bg-white/70 lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span
                  className="block h-[2px] w-5 bg-ink transition-transform duration-300"
                  style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
                />
                <span
                  className="block h-[2px] w-5 bg-ink transition-opacity duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="block h-[2px] w-5 bg-ink transition-transform duration-300"
                  style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-10 flex flex-col justify-center gap-2 bg-cream/95 px-8 backdrop-blur-xl transition-opacity duration-300 lg:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display border-b border-ink/8 py-4 text-[30px] font-semibold"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#shop"
          onClick={() => setMenuOpen(false)}
          className="pill pill-candy mt-7 self-start text-[16px]"
        >
          <BagIcon />
          View bag (2)
        </a>
      </div>
    </>
  )
}
