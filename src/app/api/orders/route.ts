import { NextResponse } from "next/server"

import db from "@/utils/db"
import { Order, orderSchema } from "@/types/orders"

export async function GET(req: Request) {
  const rows: any = await db.query(`
      SELECT
        JSON_OBJECT(
          'id', orders.id,
          'shipping_fees', orders.shipping_fees,
          'payment_method', orders.payment_method,
          'status', orders.status,
          'customer', JSON_OBJECT(
            'id', customers.id,
            'name', customers.name,
            'email', customers.email,
            'image', customers.image,
            'created_at', customers.created_at,
            'updated_at', customers.updated_at
          ),
          'items', JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', products.id,
              'slug', products.slug,
              'title', products.title,
              'description', products.description,
              'price', products.price,
              'count_in_stock', products.count_in_stock,
              'discount', products.discount,
              'created_at', products.created_at,
              'updated_at', products.updated_at,
              'category', JSON_OBJECT(
                'id', categories.id,
                'title', categories.title
              )
            )
          )
        )
      FROM
        orders
        JOIN customers ON orders.customer_id = customers.id
        JOIN order_items ON orders.id = order_items.order_id
        JOIN products ON order_items.product_id = products.id
        JOIN product_images ON products.id = product_images.product_id
        JOIN categories ON products.category_id = categories.id
      GROUP BY orders.id;
  `)

  if (rows && Array.isArray(rows) && rows.length) {
    const orders = rows?.map((row) =>
      Object.values(row)
    )[0] as unknown as Order[]

    if (orders) {
      const validOrders = orderSchema.safeParse(orders[0])
      if (validOrders.success) return NextResponse.json(orders)
    }
  }
  return NextResponse.json([])
}
