import { NextResponse } from "next/server"

import db from "@/utils/db"
import { Product, productSchema } from "@/types/products"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const rows: any = await db.query(
    `
      SELECT p.id, p.slug, p.title, p.description, c.id AS category_id, c.title AS category_title, 
      GROUP_CONCAT(DISTINCT pi.src) AS images, p.price, p.count_in_stock, p.discount, p.created_at, p.updated_at
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.slug = ?
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT 1
  ;`,
    [params.slug]
  )

  if (rows && Array.isArray(rows) && rows.length) {
    const products: Product[] = rows.map(
      ({ category_id, category_title, images, price, ...row }) => ({
        ...row,
        price: Number.parseFloat(price.toString()),
        category: {
          id: category_id || "",
          title: category_title || "",
        },
        images: images?.toString().split(","),
      })
    )

    if (products) {
      const validProducts = productSchema.safeParse(products[0])
      if (validProducts.success) return NextResponse.json(products[0])
    }
  }
  return NextResponse.json(null)
}
