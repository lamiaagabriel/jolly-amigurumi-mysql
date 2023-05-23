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
  deleteCategoryProps,
  deleteCategorySchema,
} from "@/types/categories"

import { deleteCategory } from "@/actions/categories/delete"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"

const DeleteCategoryCard = ({ categories }: { categories: Category[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<deleteCategoryProps>({
    resolver: zodResolver(deleteCategorySchema),
  })

  const onSubmitHandler = async (fields: deleteCategoryProps) => {
    setIsLoading(true)
    try {
      const {
        status,
        message,
        errors: getErrors,
      } = await deleteCategory(fields)

      if (!status && getErrors) {
        if (getErrors?.id) setError("id", { message: getErrors.id })
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
        <CardTitle>Delete Category</CardTitle>
        <CardDescription>
          You can delete a new unique category from here easily.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <CardContent className="space-y-4">
          <Field>
            <Select
              defaultValue="0"
              disabled={isLoading}
              onValueChange={(val: string) => {
                if (val == "0") {
                  setError("id", {
                    message: "Select category to be deleted.",
                  })
                  return
                }

                clearErrors("id")
                setValue("id", val)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">All Categories</SelectItem>
                {categories.map((category, i) => (
                  <SelectItem key={i} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Error>{errors.id?.message}</Error>
          </Field>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            variant="destructive"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
export default DeleteCategoryCard
