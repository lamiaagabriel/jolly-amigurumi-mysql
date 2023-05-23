"use client"

import { useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"

import { Button } from "@/ui/button"
import { CardContent, CardFooter } from "@/ui/card"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Field } from "@/ui/field"
import { Error } from "@/ui/error"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"

import { CreateProductProps } from "@/types/products"

import { Category } from "@/types/categories"
import { Textarea } from "@/ui/textarea"
import { SelectCategory } from "../categories"

const ProductForm = ({
  form,
  categories,
  onSubmitHandler,
}: {
  categories: Category[]
  form: UseFormReturn<CreateProductProps, any>
  onSubmitHandler: (fields: CreateProductProps) => Promise<void>
  // | UseFormReturn<update>
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (fields: CreateProductProps) => {
    setIsLoading(true)
    try {
      await onSubmitHandler(fields)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardContent>
        <Field>
          <Label htmlFor="title">Title</Label>
          <Input {...form.register("title")} id="title" />
          <Error>{form.formState.errors.title?.message}</Error>
        </Field>

        <Field>
          <Label htmlFor="slug">Slug</Label>
          <Input
            {...form.register("slug", {
              //   pattern: "^S+$",
            })}
            id="slug"
          />
          <Error>{form.formState.errors.slug?.message}</Error>
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field>
            <Label htmlFor="price">Price</Label>
            <Input
              {...form.register("price", { valueAsNumber: true })}
              id="price"
              type="number"
            />
            <Error>{form.formState.errors.price?.message}</Error>
          </Field>

          <Field>
            <Label htmlFor="discount">Discount</Label>
            <Input
              {...form.register("discount", {
                valueAsNumber: true,
              })}
              id="discount"
              type="number"
            />
            <Error>{form.formState.errors.discount?.message}</Error>
          </Field>

          <Field>
            <Label htmlFor="count_in_stock">Count In Stock</Label>
            <Input
              {...form.register("count_in_stock", { valueAsNumber: true })}
              id="count_in_stock"
              type="number"
            />
            <Error>{form.formState.errors.count_in_stock?.message}</Error>
          </Field>
        </div>

        <Field>
          <Label htmlFor="image1">Image 1</Label>
          <Input {...form.register("image1")} id="image1" />
          <Error>{form.formState.errors.image1?.message}</Error>
        </Field>

        <Field>
          <Label htmlFor="image2">Image 2</Label>
          <Input {...form.register("image2")} id="image2" />
          <Error>{form.formState.errors.image2?.message}</Error>
        </Field>

        <Field>
          <Label htmlFor="image3">Image 3</Label>
          <Input {...form.register("image3")} id="image3" />
          <Error>{form.formState.errors.image3?.message}</Error>
        </Field>

        <Field>
          <Label htmlFor="image4">Image 4</Label>
          <Input {...form.register("image4")} id="image4" />
          <Error>{form.formState.errors.image4?.message}</Error>
        </Field>

        <Field>
          <Label htmlFor="category">Choose Category</Label>
          <SelectCategory
            {...form.register("category.id")}
            defaultValue="0"
            onValueChange={(val: string) => {
              if (val == "0") {
                form.setError("category.id", {
                  message: "Select category first.",
                })
                return
              }

              form.clearErrors("category.id")
              form.setValue("category.id", val)
              form.setValue("category.title", " sca ")
            }}
          />

          <Error>{form.formState.errors.category?.id?.message}</Error>
        </Field>

        <Field>
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...form.register("description")}
            id="description"
            className="h-[15rem]"
          />
          <Error>{form.formState.errors.description?.message}</Error>
        </Field>
      </CardContent>

      <CardFooter>
        <Button type="submit" disabled={isLoading} isLoading={isLoading}>
          Save Changes
        </Button>
      </CardFooter>
    </form>
  )
}

export default ProductForm
