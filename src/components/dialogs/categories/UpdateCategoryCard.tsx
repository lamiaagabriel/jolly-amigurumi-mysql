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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Field } from "@/ui/field"
import { Error } from "@/ui/error"

import {
  Category,
  updateCategoryProps,
  updateCategorySchema,
} from "@/types/categories"
import { updateCategory } from "@/actions/categories/update"

const UpdateCategoryCard = ({ categories }: { categories: Category[] }) => {
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
  } = useForm<updateCategoryProps>({
    resolver: zodResolver(updateCategorySchema),
  })

  const onSubmitHandler = async (fields: updateCategoryProps) => {
    setIsLoading(true)
    try {
      if (fields.title.old === fields.title.new) {
        setError("title.new", {
          message: "titles are the same.",
        })
        return
      }

      const {
        status,
        message,
        errors: getErrors,
      } = await updateCategory(fields)

      if (!status && getErrors) {
        if (getErrors.title.old)
          setError("title.old", { message: getErrors.title.old })

        if (getErrors.title.new)
          setError("title.new", { message: getErrors.title.new })
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
        <CardTitle>Update Category</CardTitle>
        <CardDescription>
          You can update a new unique category from here easily.
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
                  setError("title.old", {
                    message: "Select category to be updated.",
                  })
                  return
                }

                clearErrors("title.old")
                setValue("title.old", val)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">All Categories</SelectItem>
                {categories.map((category, i) => (
                  <SelectItem key={i} value={category.title}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Error>{errors.title?.old?.message}</Error>
          </Field>

          <Field>
            <Label htmlFor="new-title">Title</Label>
            <Input
              {...register("title.new", {
                required: "This field is required.",
              })}
              id="new-title"
            />
            <Error>{errors.title?.new?.message}</Error>
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
export default UpdateCategoryCard
