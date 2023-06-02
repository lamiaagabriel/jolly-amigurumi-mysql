import { NextResponse } from "next/server"

import db from "@/utils/db"
import { Product, productSchema } from "@/types/products"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const rows = (await db.query(
      `
      SELECT
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
          ),
          'images', JSON_ARRAYAGG(
            CONCAT(product_images.src)
          )
        )
      FROM
        products
        JOIN categories ON products.category_id = categories.id
        JOIN product_images ON products.id = product_images.product_id
      WHERE products.slug = ?
      GROUP BY products.id
      LIMIT 1;
    `,
      [params.slug]
    )) as Product[]

    if (rows && Array.isArray(rows) && rows.length) {
      const products = rows?.map((row) => Object.values(row).pop())

      if (products) {
        const validProducts = productSchema.safeParse(products[0])
        if (validProducts.success) return NextResponse.json(products[0])
      }
    }
  } catch (error: any) {
    console.log(error.message)
  }

  return NextResponse.json([])
}
