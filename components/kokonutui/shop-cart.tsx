"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CartItem, Product } from "./data"

interface ShopState {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (id: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const ShopContext = createContext<ShopState | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  return (
    <ShopContext.Provider value={{ cart, addToCart, removeFromCart, searchQuery, setSearchQuery, isCartOpen, setIsCartOpen }}>
      {children}
    </ShopContext.Provider>
  )
}

export function useShopCart() {
  const state = useContext(ShopContext)
  if (!state) throw new Error("ShopProvider is required")
  return state
}
