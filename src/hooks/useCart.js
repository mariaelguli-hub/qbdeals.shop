import { useState, useCallback } from 'react'

export function useCart() {
  const [items, setItems] = useState([])

  const addItem = useCallback((product, variant, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === product.id && i.variantId === variant.id
      )
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id && i.variantId === variant.id
            ? { ...i, qty: i.qty + qty }
            : i
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          variantLabel: variant.label,
          price: variant.price,
          qty,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((productId, variantId) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    )
  }, [])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return { items, addItem, removeItem, total }
}
