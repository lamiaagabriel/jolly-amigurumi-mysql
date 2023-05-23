import { z } from "zod"
import { req_string, req_type_message } from "@/types/utils"

export const customerSchema = z.object({
  id: req_string("id"),
  name: req_string("name"),
  email: z
    .string(req_type_message("email", "string"))
    .email("email is not a valid email."),
  image: req_string("image"),
  updated_at: req_string("updated at"),
  created_at: req_string("created at"),
})

export type Customer = z.infer<typeof customerSchema>
