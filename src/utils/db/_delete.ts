import { pool } from "@/utils/db"
import { ResultSetHeader } from "mysql2"

export const deleteOne = async ({
  table,
  filter,
}: {
  table: Table
  filter: object
}): Promise<string> => {
  const query = `DELETE FROM ${table} WHERE ${Object.keys(filter).join(
    " = ?,"
  )} = ?`

  try {
    const db = await pool.getConnection()
    const [results] = (await db.query(
      query,
      Object.values(filter)
    )) as unknown as [ResultSetHeader]
    db.release()
    return results?.affectedRows
      ? `${results?.affectedRows} record(s) Deleted Successfully.`
      : `Already Deleted.`
  } catch (err: any) {
    console.log(err.message)
    throw Error("Error in deleting data within Database.")
  }
}
