import type { Metadata } from "next"

export const revalidate = 10
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product: Product = await fetcher(`/products/${params.slug}`, {
    next: { tags: ["getProducts"] },
  })

  if (!product)
    return {
      title: "NOT FOUND",
    }

  return { title: `${product.title} | ${process.env.app_title}` }
}

import { Product } from "@/types/products"

import { ProductImageGallery } from "@/components/sections/products"
import { AddToCartButton } from "@/components/client-actions"
import { fetcher } from "@/utils/helper"

const Product = async ({ params }: { params: { slug: string } }) => {
  const product: Product | null = await fetcher(`/products/${params.slug}`, {
    next: { tags: ["getProducts"] },
    cache: "no-cache",
  })

  if (!product) return <h1>PRODUCT NOT FOUND</h1>

  return (
    <section>
      <div className="container">
        <div className="grid md:grid-cols-[1fr,0.9fr] gap-8">
          <ProductImageGallery images={product?.images || []} />

          <div className="flex flex-col justify-between gap-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.title}
              </h1>
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  ${product.price?.toFixed(2)}
                </p>
              </div>
              <div className="my-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
            <div className="mt-10 flex sm:flex-col1">
              <AddToCartButton product={{ product, quantity: 1 }}>
                Add To Cart
              </AddToCartButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Product
