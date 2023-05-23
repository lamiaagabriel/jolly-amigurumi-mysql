import type { Metadata } from "next"
export const metadata: Metadata = { title: `Cart | ${process.env.app_title}` }

import CartLayout from "@/components/sections/cart/CartLayout"

const Cart = () => {
  return <CartLayout />
}
export default Cart
