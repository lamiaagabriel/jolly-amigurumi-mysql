import { z } from "zod"
import { req_string, req_type_message } from "@/types/utils"

const orderItemSchema = z.object({
  order_id: req_string("order id"),
  product_id: req_string("product"),
  price: z
    .number(req_type_message("price", "number"))
    .min(0, "price can't be less than 0."),
  quantity: z
    .number(req_type_message("quantity", "number"))
    .min(0, "quantity can't be less than 0.")
    .int("quantity must be only integer."),
  discount: z
    .number(req_type_message("discount", "number"))
    .min(0, "discount can't be less than 0.")
    .max(100, "discount can't be greater than 100."),
})

export type OrderItem = z.infer<typeof orderItemSchema>

// -------------------- Create
export const createOrderItemSchema = orderItemSchema
export interface CreateOrderItemProps
  extends z.infer<typeof createOrderItemSchema> {}
