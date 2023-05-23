"use client"
import Link from "next/link"
import dynamic from "next/dynamic"

import { useAppSelector } from "@/context/slices/StoreProvider"
import { useCart } from "@/context/slices"

import { ShoppingBag } from "lucide-react"
import { cn } from "@/ui/utils"
import { buttonVariants } from "@/ui/button"

const CartBadge = () => {
  const cart = useAppSelector(useCart)

  return (
    <div className="flex-shrink-0 group block">
      <Link
        href={{ pathname: "/cart" }}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "flex items-center"
        )}
      >
        <span className="inline-block relative">
          <ShoppingBag className="w-4 h-4" />
          <span className="flex p-2 h-1 w-1 justify-center items-center absolute -top-3/4 -right-3/4 text-[10px] text-center rounded-full bg-primary text-primary-foreground">
            {cart?.products?.length ? cart?.totalItems : 0}
          </span>
        </span>
      </Link>
    </div>
  )
}
export default dynamic(() => Promise.resolve(CartBadge), { ssr: false })
