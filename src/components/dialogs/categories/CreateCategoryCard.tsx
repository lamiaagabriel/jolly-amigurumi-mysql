"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/ui/use-toast"

import { Button } from "@/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Field } from "@/ui/field"
import { Error } from "@/ui/error"

import {
  Category,
  createCategoryProps,
  createCategorySchema,
} from "@/types/categories"

import { createCategory } from "@/actions/categories/create"

const CreateCategoryCard = ({ categories }: { categories: Category[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<createCategoryProps>({
    resolver: zodResolver(createCategorySchema),
  })

  const onSubmitHandler = async (fields: createCategoryProps) => {
    setIsLoading(true)
    try {
      const {
        status,
        message,
        errors: getErrors,
      } = await createCategory(fields)
      if (!status) {
        if (getErrors?.title) setError("title", { message: getErrors.title })
        return
      }

      toast({ description: message })
      reset()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
        <CardDescription>
          You can create a new unique category from here easily.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <CardContent>
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input {...register("title")} id="title" />
            <Error>{errors.title?.message}</Error>
          </Field>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={isLoading} isLoading={isLoading}>
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
export default CreateCategoryCard
