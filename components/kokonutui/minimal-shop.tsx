"use client"

import { AnimatePresence } from "motion/react"
import { useState } from "react"
import { ProductGrid } from "./product-grid"
import { ProductModal } from "./product-modal"
import { TopBar } from "./top-bar"
import { type Product, products } from "./data"
import { useShopCart } from "./shop-cart"
import { useRouter } from "next/navigation"

export default function MinimalShop() {
  const router = useRouter()
  const { cart, addToCart, searchQuery, setSearchQuery } = useShopCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-950">
      <TopBar cartItemCount={cart.length} onCartClick={() => router.push("/cart")} onSearch={setSearchQuery} />

      <div className="mx-auto px-2 pt-12 pb-16">
        <ProductGrid products={filteredProducts} onProductSelect={setSelectedProduct} />
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(product) => {
              addToCart(product)
              setSelectedProduct(null)
              router.push("/cart")
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
