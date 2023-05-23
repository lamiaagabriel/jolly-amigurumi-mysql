import mysql from "mysql2/promise"

// Database Connection
export const pool = mysql.createPool(
  'mysql://ckpcjhqw3z6i0630n9o4:pscale_pw_Mj3WP7OBA1fPNbNIAGx8aPXjg0b5gjYIrZzPYT6NHZ0@aws.connect.psdb.cloud/jolly-amigurumi-mysql?ssl={"rejectUnauthorized":true}'
)

// query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
//     sql: string
//   ): Promise<[T, FieldPacket[]]>;

const query = async (query: string, values?: any) => {
  try {
    const db = await pool.getConnection()
    const [results] = await db.query(query, values)

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
