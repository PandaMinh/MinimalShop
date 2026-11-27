import { notFound } from "next/navigation"
import { products } from "@/components/kokonutui/data"
import { ProductDetails } from "@/components/kokonutui/product-details"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((item) => item.id === id)
  if (!product) notFound()
  return <ProductDetails product={product} />
}
