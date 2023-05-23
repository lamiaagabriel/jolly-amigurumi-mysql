"use client"
import { Category } from "@/types/categories"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"
import { SelectProps } from "@radix-ui/react-select"
import { FC, useEffect, useState } from "react"

const SelectCategory: FC<SelectProps & { defaultTitle?: string }> = ({
  defaultTitle = "Select Category",
  defaultValue = "0",
  ...props
}) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCategories = async () => {
      await fetch("http://localhost:3000/api/categories", {
        next: { tags: ["getCategories"] },
      }).then(async (res) =>
        setCategories((await res.json()) as unknown as Category[])
      )
    }

    getCategories()
  }, [])
  console.log(categories)
  if (!categories.length) return <></>

  return (
    <Select defaultValue={defaultValue} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={defaultValue}>{defaultTitle}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

SelectCategory.displayName = "SelectCategory"
export default SelectCategory
