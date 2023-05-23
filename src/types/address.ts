import { z } from "zod"
import { req_string } from "@/types/utils"

export const addressSchema = z.object({
  order_id: req_string("order id"),
  name: req_string("name"),
  phone: req_string("phone"),
  address_line: req_string("address line"),
  zip: req_string("zip code"),
  city: req_string("city"),
  country: req_string("country"),
})

export type Address = z.infer<typeof addressSchema>

// -------------------- Create
export const createAddressSchema = addressSchema.omit({ order_id: true })
export interface CreateAddressProps
  extends z.infer<typeof createAddressSchema> {}
