"use client"
import Link from "next/link"
import Image from "next/image"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import type { Product as ProductType } from "@/types/products"
import { H1, Paragraph } from "@/ui/typography"

import { SelectCategory } from "@/components/dialogs/categories"

const ProductsLayout = ({ products }: { products: ProductType[] }) => {
  const defaultValue: string = "0"
  const [filtered, setFiltered] = useState<ProductType[] | null>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultValue)

  useEffect(() => {
    if (selectedCategory == defaultValue) {
      setFiltered(products)
      return
    }
    if (products)
      setFiltered(
        products.filter((movie) => movie.category.id === selectedCategory)
      )
  }, [products, selectedCategory])

  if (!filtered) return <h1>No Toys</h1>

  return (
    <>
      <section>
        <div className="container mb-6 flex justify-between items-center gap-4">
          <div className="space-y-2">
            <H1>Products</H1>
            <Paragraph variant="subtle">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </Paragraph>
          </div>
          <div className="w-[250px]">
            <SelectCategory
              defaultValue={defaultValue}
              onValueChange={(val: string) => setSelectedCategory(val)}
            />
          </div>
        </div>
      </section>

      <section className="min-h-[40rem]">
        <div className="container">
          <motion.div
            layout
            className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            <AnimatePresence>
              {filtered.map((product, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col justify-between"
                  layout
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Link
                    href={{ pathname: `/products/${product.slug}` }}
                    className="pb-6 relative"
                  >
                    <div className="relative w-full h-72 rounded-lg overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={10000}
                        height={10000}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category.title}
                      </p>
                    </div>

                    <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                      />
                      <p className="relative text-lg font-semibold text-white">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  )
}
export default ProductsLayout
