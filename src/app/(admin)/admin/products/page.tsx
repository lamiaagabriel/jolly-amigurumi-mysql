import React from "react"

import type { Metadata } from "next"
export const metadata: Metadata = {
  title: `Products | ${process.env.app_title}`,
}

import { H1, Paragraph } from "@/ui/typography"

import CategoryDialog from "@/components/dialogs/categories"
import ProductsDialog from "@/components/dialogs/products"

import ProductsTable from "@/components/tables/products"
import { Product } from "@/types/products"
import { fetcher } from "@/utils/helper"

const Products = async () => {
  const products: Product[] = await fetcher("/products", {
    next: { tags: ["getProducts"] },
    cache: "no-cache",
  })

  return (
    <>
      <section>
        <div className="container my-8 flex justify-between items-start gap-4">
          <div>
            <H1>Products</H1>
            <Paragraph variant="subtle">See All Products</Paragraph>
          </div>

          <div className="flex items-center gap-4">
            {/* @ts-expect-error Server Component */}
            <CategoryDialog />
            {/* @ts-expect-error Server Component */}
            <ProductsDialog />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <ProductsTable products={products} />
        </div>
      </section>
    </>
  )
}
export default Products
