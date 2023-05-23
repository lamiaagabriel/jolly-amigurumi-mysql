"use client"
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react"
import { createTheme, LinearProgress, ThemeProvider } from "@mui/material"
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid"

import NoRowsOverlay from "@/ui/table/NoRowsOverlay"
import PaginationPage from "@/ui/table/PaginationPage"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog"
import { Button, buttonVariants } from "../button"
import { Book, Trash } from "lucide-react"
import { useToast } from "../use-toast"
import Link from "next/link"

const Table = forwardRef<
  ElementRef<typeof DataGrid>,
  ComponentPropsWithoutRef<typeof DataGrid> & {
    preview_field?: string

    deletingFunction?: ({ id }: { id: string }) => Promise<{
      status: boolean
      message: string
      errors?: any
    }>
  }
>(({ rows, columns, preview_field, deletingFunction, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: "light",
        },
      })}
    >
      <div style={{ height: 450, width: "100%" }} className="bg-card ">
        <DataGrid
          ref={ref}
          {...props}
          slots={{
            pagination: PaginationPage,
            noRowsOverlay: NoRowsOverlay,
          }}
          style={{
            backgroundColor: "transparent",
            fontSize: "1rem",
          }}
          disableRowSelectionOnClick
          autoHeight={rows.length > 0}
          pagination
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
          columns={[
            ...columns,
            {
              field: "actions",
              headerName: "Actions",
              description:
                "This column has a value getter and is not sortable.",
              sortable: false,
              width: 160,
              renderCell: ({ row }) => (
                <div className="space-x-2">
                  {deletingFunction ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="p-4">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undo. This will permanently
                            delete your this product and remove andy related
                            data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <Button
                            variant="destructive"
                            onClick={async () => {
                              setIsLoading(true)
                              try {
                                const {
                                  status,
                                  message,
                                  errors: getErrors,
                                } = await deletingFunction({ id: row.id })

                                if (!status && getErrors) {
                                  toast({
                                    variant: "destructive",
                                    description: getErrors.id,
                                  })
                                  return
                                }
                                toast({ description: message })
                              } finally {
                                setIsLoading(false)
                              }
                            }}
                            isLoading={isLoading}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    "---"
                  )}

                  {preview_field && (
                    <Link
                      href={{ pathname: `/orders/${row[preview_field]}` }}
                      className={buttonVariants({})}
                    >
                      <Book className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ),
            },
          ]}
          rows={rows}
        />
      </div>
    </ThemeProvider>
  )
})

Table.displayName = "Table"
export default Table
