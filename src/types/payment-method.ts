import { z } from "zod"
import { req_string } from "@/types/utils"

export const paymentMethodSchema = z.object({
  title: req_string("payment method"),
})

export type PaymentMethod = z.infer<typeof paymentMethodSchema>
