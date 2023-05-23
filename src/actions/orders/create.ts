"use server"

import { Customer } from "@/types/customers"
import { CreateOrderItemProps } from "@/types/order-items"
import { CreateOrderProps } from "@/types/orders"

import { Product } from "@/types/products"
import db, { pool } from "@/utils/db"

import { nanoid } from "nanoid"
import { revalidateTag } from "next/cache"
import { redirect } from "next/dist/server/api-utils"

export async function createOrder({
  products,
  address,
  payment_method,
  shipping_fees,
  customer_id,
}: CreateOrderProps): Promise<{
  status: boolean
  message: string
  id?: string
}> {
  const order_id = nanoid()

  try {
    const isCustomer = await db.findOne<Customer>({
      table: "customers",
      filter: { id: customer_id },
    })

    if (!isCustomer) {
      return {
        status: false,
        message: "Your account is invalid. Try another one",
      }
    }

    const isProducts = await db.findManyIn<Pick<Product, "id">[]>({
      select: "id",
      table: "products",
      column: "id",
      filter: products.map(({ product }) => product.id),
    })

    if (isProducts.length < products.length) {
      return {
        status: false,
        message: "Some products is not available. Please try again later.",
      }
    }

    products.map(async ({ product, quantity }) => {
      await db.createOne({
        table: "order_items",
        record: {
          order_id,
          product_id: product.id,
          price: product.price,
          discount: product.discount,
          quantity,
        } as CreateOrderItemProps,
      })
    })

    await db.createOne({
      table: "addresses",
      record: { order_id, ...address },
    })

    const message = await db.createOne({
      table: "orders",
      record: {
        id: order_id,
        shipping_fees,
        customer_id,
        payment_method: payment_method?.title,
      },
    })

    revalidateTag("getOrders")

    return {
      status: true,
      message: message,
      id: order_id,
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
