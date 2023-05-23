import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog"
import { Button } from "@/ui/button"

import {
  CreateCategoryCard,
  DeleteCategoryCard,
  UpdateCategoryCard,
} from "@/components/dialogs/categories"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card"

const CategoryDialog = async () => {
  const categories = await fetch("http://localhost:3000/api/categories", {
    next: { tags: ["getCategories"] },
  }).then((res) => res.json())

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Categories</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {categories ? (
          <>
            <div className="sm:flex gap-8 items-center">
              <AlertDialogHeader>
                <AlertDialogTitle>Categories</AlertDialogTitle>
                <AlertDialogDescription>
                  Make changes to categories here. Click cancel when you&apos;re
                  done.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </div>

            <Tabs defaultValue="create">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="update">Update</TabsTrigger>
                <TabsTrigger value="delete">Delete</TabsTrigger>
              </TabsList>

              <TabsContent value="create">
                <CreateCategoryCard categories={categories} />
              </TabsContent>
              <TabsContent value="update">
                {categories.length ? (
                  <UpdateCategoryCard categories={categories} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Update Category</CardTitle>
                      <CardDescription>
                        No categories to be updated.
                        <br /> Add categories first, then update.
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <TabsList className="w-full">
                        <TabsTrigger value="create" className="w-full">
                          Create
                        </TabsTrigger>
                      </TabsList>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="delete">
                {categories.length ? (
                  <DeleteCategoryCard categories={categories} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Delete Category</CardTitle>
                      <CardDescription>
                        No categories to be deleted.
                        <br /> Add categories first, then delete.
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <TabsList className="w-full">
                        <TabsTrigger value="create" className="w-full">
                          Create
                        </TabsTrigger>
                      </TabsList>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Categories</AlertDialogTitle>
              <AlertDialogDescription>
                Oops, Something went wrong. Please, try again later.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default CategoryDialog
