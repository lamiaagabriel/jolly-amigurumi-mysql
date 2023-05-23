import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"

const customers: {
  image: string
  name: string
  email: string
  totalAmount: number
}[] = [
  {
    image: "",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    totalAmount: 1999,
  },

  {
    image: "",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    totalAmount: 39,
  },

  {
    image: "",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    totalAmount: 2999,
  },

  {
    image: "",
    name: "William Kim",
    email: "will@email.com",
    totalAmount: 99,
  },

  {
    image: "",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    totalAmount: 39,
  },
]

const RecentSales = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {customers.map((customer, i) => (
          <div key={i} className="flex justify-between items-center gap-4">
            <div className="flex justify-between items-start gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p>{customer.name}</p>
                <p className="text-sm text-muted-foreground">
                  {customer.email}
                </p>
              </div>
            </div>
            <span className="text-lg font-semibold leading-none tracking-tight">
              +${customer.totalAmount}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
export default RecentSales
