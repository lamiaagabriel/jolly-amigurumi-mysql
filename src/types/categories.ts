import { z } from "zod"
import { req_string, req_type_message } from "@/types/utils"

export const categorySchema = z
  .object({
    id: req_string("select category"),
    title: req_string("title"),
  })
  .required()

export type Category = z.infer<typeof categorySchema>

// -------------------- Create
export const createCategorySchema = categorySchema.pick({ title: true })
export interface createCategoryProps
  extends z.infer<typeof createCategorySchema> {}

// -------------------- Update
export const updateCategorySchema = z.object({
  title: z.object({
    old: req_string("select category"),
    new: req_string("title"),
  }),
})
export interface updateCategoryProps
  extends z.infer<typeof updateCategorySchema> {}

// -------------------- Delete
export const deleteCategorySchema = categorySchema.pick({ id: true })
export interface deleteCategoryProps
  extends z.infer<typeof deleteCategorySchema> {}
