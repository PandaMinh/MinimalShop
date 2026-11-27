"use client"

import { AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import { ProductGrid } from "./product-grid"
import { CartDrawer } from "./cart-drawer"
import { ProductModal } from "./product-modal"
import { TopBar } from "./top-bar"
import { type Product, type CartItem, products } from "./data"

export default function MinimalShop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [catalogReady, setCatalogReady] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setCatalogReady(true), 2000)
    return () => window.clearTimeout(timer)
  }, [])

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

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-950">
      <TopBar cartItemCount={cart.length} onCartClick={() => setIsCartOpen(true)} onSearch={setSearchQuery} />

      <div className="mx-auto px-2 pt-12 pb-16">
        {catalogReady ? (
          <ProductGrid products={filteredProducts} onProductSelect={setSelectedProduct} />
        ) : (
          <p role="status" className="py-8 text-center text-sm text-zinc-500">Loading products…</p>
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(product) => {
              addToCart(product)
              setSelectedProduct(null)
              setIsCartOpen(true)
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer cart={cart} onClose={() => setIsCartOpen(false)} onRemoveFromCart={removeFromCart} />
        )}
      </AnimatePresence>
    </div>
  )
}
