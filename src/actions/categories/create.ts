"use server"

import { Category, createCategoryProps } from "@/types/categories"
import db from "@/utils/db"
import { nanoid } from "nanoid"
import { revalidateTag } from "next/cache"

export async function createCategory({ title }: createCategoryProps): Promise<{
  status: boolean
  message: string
  errors?: createCategoryProps
}> {
  const id = nanoid()

  try {
    const categories = await db.findMany<Category[]>({
      table: "categories",
      filter: { title },
    })

    if (categories.length) {
      return {
        status: false,
        message: "Error in creating data within Database.",
        errors: {
          title: "This category already exists.",
        },
      }
    }

    try {
      const message = await db.createOne({
        table: "categories",
        record: { id, title },
      })
      revalidateTag("getCategories")

      return {
        status: true,
        message: message,
      }
    } catch (error: any) {
      console.log("Creation Error")
      console.log(error)
      return {
        status: false,
        message: error.message,
      }
    }
  } catch (error: any) {
    console.log("Searching Error")
    console.log(error)
    return {
      status: false,
      message: error.message,
    }
  }
}
