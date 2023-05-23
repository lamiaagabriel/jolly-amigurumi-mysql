import { pool } from "@/utils/db"
interface FindProps {
  select?: string
  table: Table
  filter?: object
}

export const findMany = async <T>({
  select = "*",
  table,
  filter,
}: FindProps): Promise<T> => {
  const query = `SELECT ${select} FROM ${table}${
    filter ? ` WHERE ${Object.keys(filter).join(" = ?,")} = ?` : ""
  };`

  try {
    const db = await pool.getConnection()
    const [results] = (await db.query(
      query,
      filter ? Object.values(filter) : undefined
    )) as unknown as [T]

    db.release()
    return results
  } catch (err: any) {
    console.log(err.message)
    throw Error("Error in finding data within Database.")
  }
}

export const findManyIn = async <T>({
  select = "*",
  table,
  filter,
  column,
}: FindProps & { column: string }): Promise<T> => {
  const query = `SELECT ${select} FROM ${table} WHERE ${column} IN (?);`

  // `SELECT title FROM products WHERE id IN (?);`,
  // [products.map(({ product }) => product.id)]

  try {
    const db = await pool.getConnection()
    const [results] = (await db.query(query, [filter])) as unknown as [T]

    db.release()
    return results
  } catch (err: any) {
    console.log(err.message)
    throw Error("Error in finding data within Database.")
  }
}

export const findOne = async <T>(props: FindProps): Promise<T | null> => {
  try {
    const results = await findMany<T>(props)
    return Array.isArray(results) && results.length === 1 ? results[0] : null
  } catch (err: any) {
    console.log(err.message)
    throw Error("Error in finding data within Database.")
  }
}
