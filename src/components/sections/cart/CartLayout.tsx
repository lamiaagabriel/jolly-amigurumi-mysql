"use client"

import Image from "next/image"

import dynamic from "next/dynamic"
import { useAppDispatch, useAppSelector } from "@/context/slices/StoreProvider"
import { add_to_cart, remove_from_cart, useCart } from "@/context/slices"

import { Card } from "@/ui/card"
import { Check, Clock } from "lucide-react"

import {
  CartEmpty,
  CartSummary,
  PaymentMethodCard,
} from "@/components/sections/cart"
import Link from "next/link"
import { Button } from "@/ui/button"
import { HiMinus, HiPlus } from "react-icons/hi"
import { H1, Paragraph } from "@/ui/typography"
import { ShippingAddressDialog } from "@/components/dialogs/ShippingAddress"

const CartLayout = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(useCart)
  if (!cart?.products?.length) return <CartEmpty />

  return (
    <>
      <section>
        <div className="container mb-6 flex justify-between items-center gap-4">
          <div className="space-y-2">
            <H1>Shopping Cart</H1>
            <Paragraph variant="subtle">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </Paragraph>
          </div>
        </div>
      </section>

      <section>
        <div className="container grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-5 md:gap-10">
          <Card>
            <div className="container">
              <div aria-labelledby="cart-heading">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul role="list" className="divide-y divide-gray-200">
                  {cart.products.map(({ product, quantity }) => (
                    <li key={product.id} className="flex py-6">
                      {product.images && (
                        <div className="flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.images[0]}
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
                                href={{ pathname: `/products/${product.slug}` }}
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
                          {/* <p className="mt-1 text-sm text-gray-500">{color}</p>
                          <p className="mt-1 text-sm text-gray-500">{size}</p> */}
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
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                dispatch(
                                  remove_from_cart({
                                    id: product.id,
                                  })
                                )
                              }
                            >
                              <HiMinus />
                            </Button>
                            <Button
                              size="icon"
                              onClick={() =>
                                dispatch(
                                  add_to_cart({
                                    product,
                                    quantity: 1,
                                  })
                                )
                              }
                            >
                              <HiPlus />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Order summary */}
          <div className="space-y-4">
            <ShippingAddressDialog />
            <PaymentMethodCard />
            <CartSummary />
          </div>
        </div>
      </section>
    </>
  )
}

export default dynamic(() => Promise.resolve(CartLayout), { ssr: false })
