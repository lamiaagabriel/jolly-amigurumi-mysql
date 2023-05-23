"use client"
import { useAppSelector } from "@/context/slices/StoreProvider"
import { useCart } from "@/context/slices"

import { Card } from "@/ui/card"
import { CheckoutDialog } from "@/components/dialogs/checkout"

const CartSummary = () => {
  const cart = useAppSelector(useCart)

  return (
    <Card>
      <div className="container py-4 space-y-2">
        <h5 className="text-lg font-bold tracking-tight truncate">Summary</h5>

        <div className="font-medium [&>div>p]:flex [&>div>p]:justify-between [&>div>p]:items-center [&>div>p]:gap-4 [&>div>p>span]:text-slate-500 [&>div>p>span]:text-sm">
          <div>
            <p>
              Subtotal:
              <span>${cart.subtotal}</span>
            </p>
            <p>
              Items:
              <span>{`${cart?.products?.length ? cart?.totalItems : 0}`}</span>
            </p>
            <p>
              Shipping: <span>${cart.shipping_fees}</span>
            </p>
            <p>
              Payment Method: <span>{cart?.payment_method?.title || "__"}</span>
            </p>
          </div>
          <div className="pt-4">
            <p>
              Total:
              <span className="flex flex-col justify-end items-end">
                <span>${cart.subtotal + cart.shipping_fees} USD</span>
                <span className="text-slate-500 text-[10px]">
                  including VAT
                </span>
              </span>
            </p>
            <CheckoutDialog />
          </div>
        </div>
      </div>
    </Card>
  )
}
export default CartSummary
