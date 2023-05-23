import { ResultSetHeader } from "mysql2"
import { pool } from "@/utils/db"

export const createOne = async ({
  table,
  record,
}: {
  table: Table
  record: object
}): Promise<string> => {
  const query: string = `INSERT INTO ${table}(${Object.keys(record).join(
    ", "
  )}) VALUES (?${Array(Object.keys(record).length).fill("").join(", ?")});`

  try {
    const db = await pool.getConnection()
    const [results] = (await db.query(
      query,
      Object.values(record)
    )) as unknown as [ResultSetHeader]

    db.release()
    return results?.affectedRows
      ? `${results?.affectedRows} record Inserted Successfully.`
      : `Nothing Inserted.`
  } catch (err: any) {
    console.log(err)
    throw Error("Error in creating data within Database.")
  }
}
