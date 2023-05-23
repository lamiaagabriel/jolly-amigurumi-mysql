"use server"

import { Category, deleteCategoryProps } from "@/types/categories"
import db from "@/utils/db"
import { revalidateTag } from "next/cache"

export async function deleteCategory({ id }: deleteCategoryProps): Promise<{
  status: boolean
  message: string
  errors?: deleteCategoryProps
}> {
  try {
    const isExists = await db.findMany<Category[]>({
      table: "categories",
      filter: { id },
    })

    if (!isExists.length) {
      return {
        status: false,
        message: "Error in deleting data within Database",
        errors: {
          id: "This category doesn't exists anymore. Please refresh.",
        },
      }
    }

    try {
      const message = await db.deleteOne({
        table: "categories",
        filter: { id },
      })
      revalidateTag("getCategories")
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
