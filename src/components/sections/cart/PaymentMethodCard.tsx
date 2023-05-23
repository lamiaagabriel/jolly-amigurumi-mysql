"use client"

import { Field } from "@/ui/field"
import { Error } from "@/ui/error"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAppDispatch, useAppSelector } from "@/context/slices/StoreProvider"
import { add_payment_method, useCart } from "@/context/slices"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { PaymentMethod, paymentMethodSchema } from "@/types/payment-method"

const PaymentMethodCard = () => {
  const cart = useAppSelector(useCart)
  const dispatch = useAppDispatch()

  const {
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<PaymentMethod>({
    defaultValues: cart?.payment_method || { title: "0" },
    resolver: zodResolver(paymentMethodSchema),
  })

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center gap-4">
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>

      <CardContent>
        <Field>
          <Select
            defaultValue={getValues("title").toLocaleLowerCase() || "0"}
            onValueChange={(val: string) => {
              if (val == "0") {
                setError("title", {
                  message: "Select payment method first.",
                })

                dispatch(add_payment_method(null))
                return
              }

              clearErrors("title")
              dispatch(add_payment_method({ title: val }))
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Select Payment Method</SelectItem>
                {["Cash", "Paypal"].map((paymentMethod, i) => (
                  <SelectItem key={i} value={paymentMethod.toLocaleLowerCase()}>
                    {paymentMethod}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Error>{errors.title?.message}</Error>
        </Field>
      </CardContent>
    </Card>
  )
}
export default PaymentMethodCard
