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
  createdAt: string
}[] = [
  {
    image: "",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    createdAt: "2 sec ago",
  },

  {
    image: "",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    createdAt: "5 min ago",
  },

  {
    image: "",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    createdAt: "8 ago",
  },

  {
    image: "",
    name: "William Kim",
    email: "will@email.com",
    createdAt: "10 min ago",
  },

  {
    image: "",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    createdAt: "12 min ago",
  },
]

const RecentJoins = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Joins</CardTitle>
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
            <span className="text-sm text-muted-foreground">
              {customer.createdAt}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
export default RecentJoins
