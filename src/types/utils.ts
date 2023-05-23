import { z } from "zod"

export const req_type_message = (title: string, type: string) => {
  return {
    required_error: `${title} is required.`,
    invalid_type_error: `${title} must be a ${type}.`,
  }
}

export const req_string = (title: string) => {
  return z
    .string(req_type_message(title, "string"))
    .refine((val) => val.length > 0, { message: `${title} is required.` })
}
