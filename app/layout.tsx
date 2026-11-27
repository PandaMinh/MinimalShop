import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ShopProvider } from "@/components/kokonutui/shop-cart"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Minimal Shop",
  description: "A minimalist e-commerce experience",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="mdl-js">
      <body className={inter.className}><ShopProvider>{children}</ShopProvider></body>
    </html>
  )
}

