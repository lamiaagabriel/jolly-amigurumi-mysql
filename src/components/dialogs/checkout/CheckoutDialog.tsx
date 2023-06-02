"use client"

import Image from "next/image"

import { reset_cart, useCart } from "@/context/slices"

import { Check, Clock } from "lucide-react"

import Link from "next/link"

import { ShowShippingAddress } from "@/components/dialogs/ShippingAddress"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog"
import { Button } from "@/ui/button"

import { useAppDispatch, useAppSelector } from "@/context/slices/StoreProvider"

import dynamic from "next/dynamic"

import { CardContent, CardFooter } from "@/ui/card"

import { Card } from "@/ui/card"

import { ScrollArea } from "@/ui/scroll-area"
import { FormEvent, useState } from "react"
import { createOrder } from "@/actions/orders/create"
import { useToast } from "@/ui/use-toast"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const CheckoutDialog = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const cart = useAppSelector(useCart)
  const dispatch = useAppDispatch()
  const { data: session, status } = useSession()

  const { toast } = useToast()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (status === "unauthenticated" || !session?.user) {
      toast({
        variant: "destructive",
        description: "You must login in first.",
      })
      return
    }

    setIsLoading(true)
    try {
      if (
        !cart?.products?.length ||
        !cart?.address ||
        !cart?.payment_method?.title
      ) {
        toast({
          variant: "destructive",
          description: "There is a missing required data.",
        })
        return
      }

      const { status, message, id } = await createOrder({
        products: cart?.products,
        address: cart?.address,
        shipping_fees: cart?.shipping_fees,
        payment_method: cart?.payment_method,
        customer_id: session?.user?.id,
      })

      if (!status) {
        toast({
          variant: "destructive",
          description: message,
        })

        return
      }

      toast({ description: message })
      dispatch(reset_cart())
      location.reload()
      // redirect(`/orders/${id}`)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full mt-4"
          disabled={
            !cart.address || !cart?.products?.length || !cart.payment_method
          }
        >
          Checkout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="sm:flex gap-8 justify-between items-center">
          <AlertDialogHeader>
            <AlertDialogTitle>Checkout Overview</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to order this products.
              <br /> After this step, the order will be placed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </div>

        <Card>
          <ScrollArea className="h-[65vh] -mr-4 pr-4">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div aria-labelledby="cart-heading">
                  <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                  </h2>

                  <ul role="list" className="divide-y divide-gray-200">
                    {cart.products.map(({ product, quantity }) => (
                      <li key={product.id} className="flex py-6">
                        {product?.images && (
                          <div className="flex-shrink-0">
                            <Image
                              src={product?.images[0]}
                              alt={product?.images[0]}
                              width={10000}
                              height={10000}
                              className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                            />
                          </div>
                        )}

                        <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                          <div>
                            <div className="flex justify-between">
                              <h4 className="text-sm">
                                <Link
                                  href={{
                                    pathname: `/products/${product.slug}`,
                                  }}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.title}
                                </Link>
                              </h4>
                              <div className="inline-flex items-center">
                                <p className="ml-4 text-sm font-medium text-gray-900">
                                  ${product.price.toFixed(2)}
                                </p>

                                <p className="ml-4 text-xs text-slate-500">
                                  x {quantity}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex-1 flex items-end justify-between">
                            <p className="flex items-center text-sm text-gray-700 space-x-2">
                              {product.count_in_stock ? (
                                <Check
                                  className="flex-shrink-0 h-5 w-5 text-green-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <Clock
                                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                                  aria-hidden="true"
                                />
                              )}

                              <span>
                                {product.count_in_stock
                                  ? "In stock"
                                  : `Will be available soon.`}
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shipping Address */}
                <div className=" text-sm font-medium [&>div>p]:flex [&>div>p]:justify-between [&>div>p]:items-center [&>div>p]:gap-4 [&>div>p>span]:text-slate-500 [&>div>p>span]:text-sm">
                  <h2 id="cart-heading" className="sr-only">
                    Shipping Address in your shopping cart
                  </h2>

                  <h1 className="w-full text-left mb-2 font-medium text-gray-500 cursor-auto">
                    Shipping Address
                  </h1>
                  <ShowShippingAddress />
                </div>

                {/* Payment Method */}
                <div className=" text-sm font-medium [&>div>p]:flex [&>div>p]:justify-between [&>div>p]:items-center [&>div>p]:gap-4 [&>div>p>span]:text-slate-500 [&>div>p>span]:text-sm">
                  <h2 id="cart-heading" className="sr-only">
                    Payment Method in your shopping cart
                  </h2>

                  <div className="w-full text-left font-medium [&>p]:flex [&>p]:justify-between [&>p]:items-center [&>p]:gap-4 [&>div>p>span]:text-slate-500 [&>p>span]:text-sm">
                    <p>
                      Payment Method:
                      <span className="text-inherit">
                        {cart.payment_method?.title}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className=" text-sm font-medium [&>div>p]:flex [&>div>p]:justify-between [&>div>p]:items-center [&>div>p]:gap-4 [&>div>p>span]:text-slate-500 [&>div>p>span]:text-sm">
                  <h2 id="cart-heading" className="sr-only">
                    Summary in your shopping cart
                  </h2>

                  <h1 className="w-full text-left mb-2 font-medium text-gray-500 cursor-auto">
                    Summary
                  </h1>
                  <div className="w-full text-left font-medium [&>p]:flex [&>p]:justify-between [&>p]:items-center [&>p]:gap-4 [&>div>p>span]:text-slate-500 [&>p>span]:text-sm">
                    <p>
                      Subtotal:
                      <span>${cart.subtotal}</span>
                    </p>
                    <p>
                      Items:
                      <span>{`${
                        cart?.products?.length ? cart?.totalItems : 0
                      }`}</span>
                    </p>

                    <p>
                      Total:
                      <span>
                        <span className="block">
                          ${cart.subtotal + cart.shipping_fees} USD
                        </span>
                        <span className="text-slate-500 text-[10px] block text-end">
                          including VAT
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Place Order
                </Button>
              </CardFooter>
            </form>
          </ScrollArea>
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default dynamic(() => Promise.resolve(CheckoutDialog), { ssr: false })
