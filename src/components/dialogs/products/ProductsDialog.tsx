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

import { CreateProductCard } from "@/components/dialogs/products"
import { Category } from "@/types/categories"

const ProductsDialog = async () => {
  const categories: Category[] = await fetch(
    "https://jolly-amigurumi.vercel.app/api/categories",
    {
      next: { tags: ["getCategories"] },
    }
  ).then((res) => res.json())

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Products</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="sm:flex gap-8 items-center">
          <AlertDialogHeader>
            <AlertDialogTitle>Products</AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to products here. Click cancel when you&apos;re done.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </div>

        <CreateProductCard categories={categories} />

        {/* <TabsContent value="update">
                {products.length ? (
                  <UpdateCategoryCard products={products} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Update Category</CardTitle>
                      <CardDescription>
                        No products to be updated.
                        <br /> Add products first, then update.
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
                {products.length ? (
                  <DeleteCategoryCard products={products} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Delete Category</CardTitle>
                      <CardDescription>
                        No products to be deleted.
                        <br /> Add products first, then delete.
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
              </TabsContent> */}
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default ProductsDialog
