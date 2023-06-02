import type { Metadata } from "next"
export const metadata: Metadata = {
  title: `Products | ${process.env.app_title}`,
}

import { fetcher } from "@/utils/helper"

import ProductsLayout from "@/components/sections/products"
import { Product } from "@/types/products"

const Products = async () => {
  const products: Product[] = await fetcher("/products", {
    next: { tags: ["getProducts"] },
  })

  if (!products?.length) return <h1>NO PRODUCTS</h1>

  return <ProductsLayout products={products} />
}
export default Products
