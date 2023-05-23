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
import { Button } from "@/ui/button"

import {
  CreateShippingAddressCard,
  ShowShippingAddress,
} from "@/components/dialogs/ShippingAddress"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { Plus } from "lucide-react"

const ShippingAddressDialog = () => {
  return (
    <Card>
      <AlertDialog>
        <CardHeader className="flex flex-row justify-between items-center gap-4">
          <CardTitle>Shipping Address</CardTitle>

          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
        </CardHeader>

        <AlertDialogContent>
          <div className="sm:flex gap-8 items-center">
            <AlertDialogHeader>
              <AlertDialogTitle>Shipping Address</AlertDialogTitle>
              <AlertDialogDescription>
                Make changes to shipping address here. Click cancel when
                you&apos;re done.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </div>
          <CreateShippingAddressCard />
        </AlertDialogContent>
      </AlertDialog>

      <CardContent className="py-0 pt-0">
        <ShowShippingAddress />
      </CardContent>
    </Card>
  )
}
export default ShippingAddressDialog
