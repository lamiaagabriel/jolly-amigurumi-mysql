import { string, z } from "zod"
import { req_string, req_type_message } from "@/types/utils"
import { categorySchema } from "./categories"

export const imageSchema = z
  .object({
    product_id: req_string("id"),
    src: req_string("src"),
  })
  .required()

export type Image = z.infer<typeof imageSchema>

export const productSchema = z.object({
  id: req_string("id"),
  slug: req_string("slug"),
  title: req_string("title"),
  description: req_string("description"),
  category: categorySchema,
  images: z.array(req_string("image")).optional(),
  price: z
    .number(req_type_message("price", "number"))
    .min(0, "price can't be less than 0."),
  count_in_stock: z
    .number(req_type_message("count in stock", "number"))
    .min(0, "count in stock can't be less than 0.")
    .int("count in stock must be only integer."),
  discount: z
    .number(req_type_message("discount", "number"))
    .min(0, "discount can't be less than 0.")
    .max(100, "discount can't be greater than 100."),
})

export type Product = z.infer<typeof productSchema>

// -------------------- Create
export const createProductSchema = productSchema
  .pick({
    title: true,
    slug: true,
    description: true,
    category: true,
    price: true,
    count_in_stock: true,
    discount: true,
  })
  .and(
    z.object({
      image1: req_string("image1"),
      image2: req_string("image2"),
      image3: req_string("image3"),
      image4: req_string("image4"),
    })
  )
export interface CreateProductProps
  extends z.infer<typeof createProductSchema> {}
// -------------------- Delete
export const deleteProductSchema = productSchema.pick({ id: true })
export interface DeleteProductProps
  extends z.infer<typeof deleteProductSchema> {}
