import { NextResponse } from "next/server"

import db from "@/utils/db"
import { Category } from "@/types/categories"

export async function GET(req: Request) {
  const categories = await db.findMany<Category[]>({ table: "categories" })

  return NextResponse.json(categories)
}
