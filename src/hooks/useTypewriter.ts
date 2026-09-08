import { useEffect, useState } from 'react'

/**
 * Reveals `text` one character at a time.
 *
 * @param text       the full string to type out
 * @param speed      milliseconds between characters
 * @param startDelay milliseconds to wait before the first character
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    let interval: ReturnType<typeof setInterval> | undefined

    const timeout = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}
