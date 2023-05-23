"use client"

import { CartProduct, add_to_cart } from "@/context/slices"
import { useAppDispatch } from "@/context/slices/StoreProvider"
import { Button } from "@/ui/button"

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import { cn } from "@/ui/utils"
import { useToast } from "@/ui/use-toast"

const AddToCartButton = forwardRef<
  ElementRef<typeof Button>,
  ComponentPropsWithoutRef<typeof Button> & { product: CartProduct }
>(({ className, product, ...props }, ref) => {
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  return (
    <Button
      className={cn("w-full py-3 sm:py-1", className)}
      ref={ref}
      {...props}
      onClick={() => {
        dispatch(add_to_cart(product))
        toast({ description: "1 record added to cart successfully. " })
      }}
    />
  )
})

AddToCartButton.displayName = "AddToCartButton"
export default AddToCartButton
