"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { useShopCart } from "@/components/kokonutui/shop-cart"

export default function CartPage() {
  const { cart, removeFromCart } = useShopCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <main className="mx-auto min-h-screen max-w-2xl bg-white dark:bg-zinc-900">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-lg font-medium">Shopping Cart</h1>
          <Link href="/" className="text-sm underline">Continue shopping</Link>
        </div>

        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
          <div className="flex justify-between mb-4">
            <span className="text-base font-medium">Total</span>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">${total}</span>
          </div>
          <button className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-base font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm">
            Checkout Now
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-zinc-500 mt-10">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium truncate">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold mt-1">${item.price * item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
