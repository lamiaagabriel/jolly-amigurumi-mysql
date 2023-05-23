/* eslint-disable no-unused-vars */
import type { Session, User as NextUser } from "next-auth"
import type { JWT } from "next-auth/jwt"
import { Customer } from "./customers"

type ex = "name" | "email" | "image"

declare module "next-auth/jwt" {
  interface JWT extends Omit<Customer, ex> {}
}

declare module "next-auth" {
  interface Session {
    user: NextUser & Omit<Customer, ex>
  }
}
