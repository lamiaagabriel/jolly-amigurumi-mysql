"use server"

import { Product, DeleteProductProps } from "@/types/products"
import db from "@/utils/db"
import { revalidateTag } from "next/cache"

export async function deleteProduct({ id }: DeleteProductProps): Promise<{
  status: boolean
  message: string
  errors?: DeleteProductProps
}> {
  try {
    const isExists = await db.findMany<Product[]>({
      table: "products",
      filter: { id },
    })

    if (!isExists.length) {
      return {
        status: false,
        message: "Error in deleting data within Database",
        errors: {
          id: "This Product doesn't exists anymore. Please refresh.",
        },
      }
    }

    try {
      await db.deleteOne({
        table: "product_images",
        filter: { product_id: id },
      })

      const message = await db.deleteOne({
        table: "products",
        filter: { id },
      })
      revalidateTag("getProducts")
      return { status: true, message }
    } catch (error: any) {
      console.log("Delete Error")
      console.log(error)
      return { status: false, message: error.message }
    }
  } catch (error: any) {
    console.log("Searching Error")
    console.log(error)
    return { status: false, message: error.message }
  }
}
