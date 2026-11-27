"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useShopCart } from "./shop-cart"
import type { Product } from "./data"

export function ProductDetails({ product }: { product: Product }) {
  const router = useRouter()
  const { addToCart, setIsCartOpen } = useShopCart()
  return (
    <main className="mx-auto max-w-3xl p-4 text-zinc-900 dark:text-zinc-100">
      <Link href="/" className="text-sm underline">Back to products</Link>
      <article className="mt-4 overflow-hidden rounded-lg bg-white dark:bg-zinc-900 md:flex">
        <img src={product.image} alt={product.name} className="h-64 w-full object-cover md:w-2/5" />
        <div className="flex-1 space-y-3 p-5">
          <h1 className="text-lg font-medium">{product.name}</h1>
          <p className="text-sm text-zinc-500">{product.category}</p>
          <p className="font-medium">${product.price}</p>
          <p className="text-sm">{product.description}</p>
          <p className="text-xs">SKU: {product.id}</p>
          <p className="text-xs">Stock: Available</p>
          <button type="button" className="w-full rounded-md bg-green-600 py-2 text-sm font-medium text-white"
            onClick={() => { addToCart(product); setIsCartOpen(true); router.push("/") }}>Add to Bag</button>
        </div>
      </article>
    </main>
  )
}
