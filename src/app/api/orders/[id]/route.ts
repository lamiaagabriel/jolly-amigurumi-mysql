import { Order } from "@/types/orders"
import { pool } from "@/utils/db"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const db = await pool.getConnection()
  const query = `
    SELECT *
    FROM orders
      JOIN products ON 
        orders.id = order_items.order_id AND order_items.product_id = products.id
      JOIN address ON 
          orders.id = address.order_id
      JOIN categories ON 
          categories.id =  products.category_id
    WHERE customer_id = ?
    `

  const [rows] = (await db.query(query, [params.id])) as unknown as Order[]
  db.release()

  console.log(rows)

  return NextResponse.json([])
}
