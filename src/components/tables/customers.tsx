"use client"
import Image from "next/image"
import { GridColDef } from "@mui/x-data-grid"

import Table from "@/ui/table"
import { Customer } from "@/types/customers"
import { getDate } from "@/utils/helper"

const CustomersTable = ({ customers }: { customers: Customer[] }) => {
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Profile",
      sortable: false,
      width: 100,
      renderCell: ({ row: { name, image } }) => (
        <>
          <div className="my-[100rem] py-[1000rem]">
            <div className="h-10 w-10">
              <Image
                src={image}
                alt={name}
                width={10000}
                height={10000}
                className="h-full w-full rounded-full object-center object-cover"
              />
            </div>
          </div>
        </>
      ),
    },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
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

  return <Table columns={columns} rows={customers} />
}
export default CustomersTable
