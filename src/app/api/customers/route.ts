import { NextResponse } from "next/server"

import db from "@/utils/db"
import { Customer } from "@/types/customers"

export async function GET(req: Request) {
  const customers = await db.findMany<Customer[]>({ table: "customers" })

  return NextResponse.json(customers)
}
