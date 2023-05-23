"use server"

import { Order, deleteOrderProps } from "@/types/orders"
import db from "@/utils/db"
import { revalidateTag } from "next/cache"

export async function deleteOrder({ id }: deleteOrderProps): Promise<{
  status: boolean
  message: string
  errors?: deleteOrderProps
}> {
  try {
    const isExists = await db.findMany<Order[]>({
      table: "orders",
      filter: { id },
    })

    if (!isExists.length) {
      return {
        status: false,
        message: "Error in deleting data within Database",
        errors: {
          id: "This Order doesn't exists anymore. Please refresh.",
        },
      }
    }

    try {
      const message = await db.deleteOne({
        table: "orders",
        filter: { id },
      })
      revalidateTag("getOrders")
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
