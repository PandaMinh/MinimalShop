"use client"

import { AnimatePresence } from "motion/react"
import { ProductGrid } from "./product-grid"
import { CartDrawer } from "./cart-drawer"
import { TopBar } from "./top-bar"
import { products } from "./data"
import { useShopCart } from "./shop-cart"
import { useRouter } from "next/navigation"

export default function MinimalShop() {
  const router = useRouter()
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, searchQuery, setSearchQuery } = useShopCart()

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-950">
      <TopBar cartItemCount={cart.length} onCartClick={() => setIsCartOpen(true)} onSearch={setSearchQuery} />

      <div className="mx-auto px-2 pt-12 pb-16">
        <ProductGrid products={filteredProducts} onProductSelect={(product) => router.push("/products/" + product.id)} />
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer cart={cart} onClose={() => setIsCartOpen(false)} onRemoveFromCart={removeFromCart} />
        )}
      </AnimatePresence>
    </div>
  )
}
