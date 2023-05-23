import { pool } from "@/utils/db"
import { ResultSetHeader } from "mysql2"

export const updateOne = async ({
  table,
  values,
  where,
}: {
  table: Table
  values: object
  where: object
}): Promise<string> => {
  const query: string = `UPDATE ${table} SET ${Object.keys(values).join(
    " = ?, "
  )} = ? WHERE ${Object.keys(where).join(" = ?,")} = ?;`

  try {
    const db = await pool.getConnection()
    const [results] = (await db.query(query, [
      ...Object.values(values),
      ...Object.values(where),
    ])) as unknown as [ResultSetHeader]

    db.release()
    return results?.affectedRows
      ? `${results?.affectedRows} record(s) Updated Successfully.`
      : `Already Updated.`
  } catch (err: any) {
    console.log(err.message)
    throw Error("Error in updating data within Database.")
  }
}
