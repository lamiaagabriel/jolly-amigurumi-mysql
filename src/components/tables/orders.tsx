"use client"
import { GridColDef } from "@mui/x-data-grid"

import Table from "@/ui/table"
import { Order } from "@/types/orders"
import { deleteOrder } from "@/actions/orders/delete"
import Image from "next/image"
import { Badge } from "@/ui/badge"

const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "customer",
      headerName: "Customer",
      width: 350,
      renderCell: ({
        row: {
          customer: { name, image, email },
        },
      }: {
        row: Order
      }) => (
        <>
          <div className="flex items-center justify-start gap-4">
            <div className="h-10 w-10">
              <Image
                src={image}
                alt={name}
                width={10000}
                height={10000}
                className="h-full w-full rounded-full object-center object-cover"
              />
            </div>
            <div className="text-sm">
              <p>{name}</p>
              <p className="text-muted-foreground">{email}</p>
              {/* <p className="text-muted-foreground">{phone}</p> */}
            </div>
          </div>
        </>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: ({ row: { status } }: { row: Order }) => (
        <Badge>{status}</Badge>
      ),
    },
    {
      field: "shipping_fees",
      headerName: "Shipping Fees",
      width: 100,
      renderCell: ({ row: { shipping_fees } }: { row: Order }) => (
        <>${shipping_fees}</>
      ),
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      width: 100,
      renderCell: ({ row: { payment_method } }: { row: Order }) => (
        <>{payment_method}</>
      ),
    },
    // {
    //   field: "total_price",
    //   headerName: "Total Price",
    //   width: 120,
    //   renderCell: ({ row: { total_price } }: { row: Order }) => (
    //     <>
    //       <p>${total_price}</p>
    //     </>
    //   ),
    // },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   width: 500,
    //   renderCell: ({
    //     row: { address_line, zip, city, country },
    //   }: {
    //     row: Order
    //   }) => (
    //     <>
    //       <p>
    //         {address_line}, {zip}, {city}, {country}
    //       </p>
    //     </>
    //   ),
    // },
  ]

  return (
    <Table
      columns={columns}
      rows={orders}
      deletingFunction={deleteOrder}
      preview_field="id"
    />
  )
}
export default OrdersTable
