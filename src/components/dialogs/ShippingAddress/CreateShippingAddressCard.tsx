"use client"

import { Button } from "@/ui/button"
import { CardContent, CardFooter } from "@/ui/card"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Field } from "@/ui/field"
import { Error } from "@/ui/error"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/ui/use-toast"

import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card"

import { ScrollArea } from "@/ui/scroll-area"
import { CreateAddressProps, createAddressSchema } from "@/types/address"
import { useAppDispatch, useAppSelector } from "@/context/slices/StoreProvider"
import { add_address, useCart } from "@/context/slices"

const CreateShippingAddressCard = () => {
  const cart = useAppSelector(useCart)
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateAddressProps>({
    defaultValues: cart?.address || {
      name: "",
      phone: "",
      address_line: "",
      zip: "",
      city: "",
      country: "",
    },
    resolver: zodResolver(createAddressSchema),
  })

  const onSubmitHandler = async (fields: CreateAddressProps) => {
    dispatch(add_address(fields))
    toast({ description: "Shipping Address updated successfully." })
    reset()
  }

  return (
    <Card>
      <ScrollArea className="h-[65vh] -mr-4 pr-4">
        <CardHeader>
          <CardTitle>Create Address</CardTitle>
          <CardDescription>
            You can create new address from here easily.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <CardContent>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input {...register("name")} id="name" placeholder="Jon Doe" />
              <Error>{errors.name?.message}</Error>
            </Field>
            <Field>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                {...register("phone")}
                id="phone"
                placeholder="01022124578"
              />
              <Error>{errors.phone?.message}</Error>
            </Field>

            <Field>
              <Label htmlFor="address_line">Address Line</Label>
              <Input
                {...register("address_line")}
                id="address_line"
                placeholder="00 Apt, 000 Building, Region"
              />
              <Error>{errors.address_line?.message}</Error>
            </Field>

            <Field>
              <Label htmlFor="zip">ZIP Code</Label>
              <Input {...register("zip")} id="zip" placeholder="00000" />
              <Error>{errors.zip?.message}</Error>
            </Field>

            <Field>
              <Label htmlFor="city">City</Label>
              <Input {...register("city")} id="city" placeholder="Cairo" />
              <Error>{errors.city?.message}</Error>
            </Field>

            <Field>
              <Label htmlFor="country">Country</Label>
              <Input
                {...register("country")}
                id="country"
                placeholder="Egypt"
              />
              <Error>{errors.country?.message}</Error>
            </Field>
          </CardContent>

          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </ScrollArea>
    </Card>
  )
}
export default CreateShippingAddressCard
