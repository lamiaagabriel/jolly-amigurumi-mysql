import { z } from "zod"
import { req_string, req_type_message } from "@/types/utils"
import { Address, addressSchema } from "./address"
import { productSchema } from "./products"
import { CartState } from "@/context/slices"
import { customerSchema } from "./customers"

export const orderSchema = z.object({
  id: req_string("id"),
  customer: customerSchema,
  items: z.array(productSchema),
  shipping_fees: z
    .number(req_type_message("shippingFees", "number"))
    .min(0, "shippingFees can't be less than 0."),
  address: addressSchema.omit({ order_id: true }).optional(),
  payment_method: req_string("payment method"),
  status: req_string("status"),
})

export type Order = z.infer<typeof orderSchema>

export interface getOrder extends Address {
  id: string
  total_price: number
  image: string
}
// -------------------- Create

type include = "products" | "address" | "shipping_fees" | "payment_method"
export interface CreateOrderProps extends Pick<CartState, include> {
  customer_id: string
}

// -------------------- Delete
export const deleteOrderSchema = orderSchema.pick({ id: true })
export interface deleteOrderProps extends z.infer<typeof deleteOrderSchema> {}
