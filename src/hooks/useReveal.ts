import { useEffect, useRef } from 'react'

/**
 * Adds `is-visible` the first time the element scrolls into view, which is what
 * the `.reveal` transition in index.css hangs off. It unobserves immediately —
 * sections should settle once, not breathe every time you scroll past them.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Without IntersectionObserver, show the content rather than hide it.
    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}
