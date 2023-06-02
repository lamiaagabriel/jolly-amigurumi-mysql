import mysql from "mysql2/promise"

// Database Connection
export const pool = mysql.createPool(process.env.DATABASE_URL!)

const query = async (query: string, values?: any) => {
  try {
    const db = await pool.getConnection()
    const [results] = await db.query(query, values || [])

    db.release()
    return results
  } catch (err: any) {
    console.log(err.message)
    throw Error("Error in querying data within Database.")
  }
}

import { findMany, findOne, findManyIn } from "@/utils/db/_read"
import { createOne } from "@/utils/db/_create"
import { deleteOne } from "@/utils/db/_delete"
import { updateOne } from "@/utils/db/_update"

const db = {
  query,
  findMany,
  findManyIn,
  findOne,
  createOne,
  updateOne,
  deleteOne,
}

export default db
