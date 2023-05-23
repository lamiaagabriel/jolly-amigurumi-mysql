"use server"

import { Category, updateCategoryProps } from "@/types/categories"
import db from "@/utils/db"
import { revalidateTag } from "next/cache"

export async function updateCategory({ title }: updateCategoryProps): Promise<{
  status: boolean
  message: string
  errors?: updateCategoryProps
}> {
  try {
    const isOldExists = await db.findMany<Category[]>({
      table: "categories",
      filter: { title: title.old },
    })

    if (!isOldExists.length) {
      return {
        status: false,
        message: "Error in updating data within Database",
        errors: {
          title: {
            old: "This category doesn't exists anymore. Please refresh.",
            new: "",
          },
        },
      }
    }
    const isNewExists = await db.findMany<Category[]>({
      table: "categories",
      filter: { title: title.new },
    })

    if (isNewExists.length) {
      return {
        status: false,
        message: "Error in updating data within Database",
        errors: {
          title: {
            old: "",
            new: "This category already exists.",
          },
        },
      }
    }

    try {
      const message = await db.updateOne({
        table: "categories",
        values: { title: title.new },
        where: { title: title.old },
      })

      revalidateTag("getCategories")
      console.log(message)

      return { status: false, message }
    } catch (error: any) {
      console.log("Update Error")
      console.log(error)

      return { status: false, message: error.message }
    }
  } catch (error: any) {
    console.log("Searching Error")
    console.log(error)

    return { status: false, message: error.message }
  }
}
