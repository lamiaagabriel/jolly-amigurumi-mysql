"use client"
import Image from "next/image"
import { GridColDef } from "@mui/x-data-grid"

import Table from "@/ui/table"
import { Product } from "@/types/products"
import { deleteProduct } from "@/actions/products/delete"
import { getDate, getPrice } from "@/utils/helper"

const ProductsTable = ({ products }: { products: Product[] }) => {
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Thumb",
      sortable: false,
      width: 70,
      renderCell: ({ row: { title, images } }: { row: Product }) => (
        <>
          <div className="my-[100rem] py-[1000rem]">
            <div className="h-10 w-10">
              {images && (
                <Image
                  src={images[0]}
                  alt={title}
                  width={10000}
                  height={10000}
                  className="h-full w-full rounded-full object-center object-cover"
                />
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      renderCell: ({ row: { title, slug } }: { row: Product }) => (
        <>
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm">{slug}</p>
          </div>
        </>
      ),
    },

    { field: "description", headerName: "Description", width: 300 },
    {
      field: "price",
      headerName: "Price",
      width: 200,
      renderCell: ({ row: { price, discount } }: { row: Product }) => (
        <>
          <div className="inline-flex items-center gap-4">
            <div className="inline-flex items-center gap-2">
              <p className={discount > 0 ? "line-through text-red-500" : ""}>
                ${price}
              </p>
              {discount && (
                <p className="text-[10px] text-muted-foreground">
                  x{discount}%
                </p>
              )}
            </div>
            {discount > 0 && (
              <>
                <p className="text-green-500">
                  ${getPrice(price - price * (discount / 100))}
                </p>
              </>
            )}
          </div>
        </>
      ),
    },

    { field: "count_in_stock", headerName: "Quantity", width: 100 },
    {
      field: "created_at",
      headerName: "Created at",
      width: 250,
      renderCell: ({ row: { created_at } }) => <>{getDate(created_at)}</>,
    },
    {
      field: "updated_at",
      headerName: "Last updated at",
      width: 250,
      renderCell: ({ row: { updated_at } }) => <>{getDate(updated_at)}</>,
    },
  ]

  return (
    <Table columns={columns} rows={products} deletingFunction={deleteProduct} />
  )
}
export default ProductsTable
