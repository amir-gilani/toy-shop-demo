import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { PRODUCTS, type Product } from '../data/shop'

export type CartLine = {
  product: Product
  quantity: number
}

type CartValue = {
  lines: CartLine[]
  /** Total number of toys in the bag, not the number of distinct lines. */
  count: number
  subtotal: number
  isOpen: boolean
  add: (product: Product) => void
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  clear: () => void
  open: () => void
  close: () => void
}

const CartContext = createContext<CartValue | null>(null)

const STORAGE_KEY = 'toopoli.bag'

/**
 * Only the id and quantity are persisted. Prices, names and photographs come
 * back from PRODUCTS on load, so a bag saved last week cannot resurrect an old
 * price or a toy we have since stopped making.
 */
type StoredLine = { id: string; quantity: number }

function readStoredLines(): CartLine[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return (parsed as StoredLine[])
      .map(({ id, quantity }) => {
        const product = PRODUCTS.find((candidate) => candidate.id === id)
        if (!product) return null

        const clamped = Math.min(Math.max(Math.round(Number(quantity)), 1), 99)
        if (!Number.isFinite(clamped)) return null

        return { product, quantity: clamped }
      })
      .filter((line): line is CartLine => line !== null)
  } catch {
    // A corrupt or unreadable bag is not worth a broken page.
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStoredLines)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const stored: StoredLine[] = lines.map(({ product, quantity }) => ({
        id: product.id,
        quantity,
      }))
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // Private browsing and a full quota both land here; the bag still works
      // for this visit, it just will not survive a reload.
    }
  }, [lines])

  const add = useCallback((product: Product) => {
    setLines((current) => {
      const existing = current.find((line) => line.product.id === product.id)
      if (!existing) return [...current, { product, quantity: 1 }]

      return current.map((line) =>
        line.product.id === product.id
          ? { ...line, quantity: Math.min(line.quantity + 1, 99) }
          : line,
      )
    })
  }, [])

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((current) =>
      quantity < 1
        ? current.filter((line) => line.product.id !== id)
        : current.map((line) =>
            line.product.id === id
              ? { ...line, quantity: Math.min(quantity, 99) }
              : line,
          ),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.product.id !== id))
  }, [])

  const clear = useCallback(() => setLines([]), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0)
    const subtotal = lines.reduce(
      (total, line) => total + line.product.price * line.quantity,
      0,
    )

    return {
      lines,
      count,
      subtotal,
      isOpen,
      add,
      setQuantity,
      remove,
      clear,
      open,
      close,
    }
  }, [lines, isOpen, add, setQuantity, remove, clear, open, close])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used inside a CartProvider')
  return value
}
