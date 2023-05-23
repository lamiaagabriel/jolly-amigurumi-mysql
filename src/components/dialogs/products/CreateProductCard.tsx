"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/ui/use-toast"

import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card"

import { CreateProductProps, createProductSchema } from "@/types/products"

import { ScrollArea } from "@/ui/scroll-area"
import ProductForm from "./ProductForm"
import { Category } from "@/types/categories"
import { createProduct } from "@/actions/products/create"

const CreateProductCard = ({ categories }: { categories: Category[] }) => {
  const { toast } = useToast()

  const form = useForm<CreateProductProps>({
    resolver: zodResolver(createProductSchema),
  })

  const onSubmitHandler = async (fields: CreateProductProps) => {
    const { status, message, errors: getErrors } = await createProduct(fields)

    if (!status) {
      if (getErrors?.slug) form.setError("slug", { message: getErrors.slug })
      if (getErrors?.category.id)
        form.setError("category.id", { message: getErrors.category.id })
      return
    }

    toast({ description: message })
    form.reset()
  }

  return (
    <Card>
      <ScrollArea className="h-[65vh] -mr-4 pr-4">
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>
            You can create new products from here easily.
          </CardDescription>
        </CardHeader>

        <ProductForm
          categories={categories}
          form={form}
          onSubmitHandler={onSubmitHandler}
        />
      </ScrollArea>
    </Card>
  )
}
export default CreateProductCard
