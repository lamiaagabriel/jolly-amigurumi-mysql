"use server"

import { Category } from "@/types/categories"
import { Product, CreateProductProps, Image } from "@/types/products"

import db from "@/utils/db"
import { nanoid } from "nanoid"
import { revalidateTag } from "next/cache"

type PossibleErrors = "slug" | "category"
export async function createProduct({
  category,
  image1,
  image2,
  image3,
  image4,
  ...data
}: CreateProductProps): Promise<{
  status: boolean
  message: string
  errors?: Pick<CreateProductProps, PossibleErrors>
}> {
  const id = nanoid()

  try {
    const products = await db.findMany<Product[]>({
      table: "products",
      filter: { slug: data.slug },
    })

    if (products.length) {
      return {
        status: false,
        message: "Error in creating data within Database",
        errors: {
          slug: "This slug already exists.",
          category: {
            id: "",
            title: "",
          },
        },
      }
    }

    const isCategory = await db.findOne<Category>({
      table: "categories",
      filter: { id: category.id },
    })

    if (!isCategory) {
      return {
        status: false,
        message: "Error in creating data within Database",
        errors: {
          slug: "",
          category: {
            id: "This Product doesn't exists, Please refresh first.",
            title: "",
          },
        },
      }
    }

    ;[image1, image2, image3, image4].map(async (src) => {
      await db.createOne({
        table: "product_images",
        record: {
          product_id: id,
          src,
        } as Image,
      })
    })

    try {
      const message = await db.createOne({
        table: "products",
        record: { id, ...data, category_id: category.id },
      })

      revalidateTag("getProducts")
      return { status: true, message }
    } catch (error: any) {
      console.log("Creation Error")
      console.log(error)

      return { status: true, message: error.message }
    }
  } catch (error: any) {
    console.log("Searching Error")
    console.log(error)
    return { status: true, message: error.message }
  }
}
