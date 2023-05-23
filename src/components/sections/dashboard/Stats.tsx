import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import {
  Activity,
  CreditCard,
  DollarSign,
  LucideIcon,
  Users,
} from "lucide-react"

const cards: {
  title: string
  icon: LucideIcon
  indicator: string
  value: number
  description: string
}[] = [
  {
    title: "Total Revenue",
    icon: DollarSign,
    indicator: "$",
    value: 45231.89,
    description: "+20.1% from last month",
  },
  {
    title: "Subscriptions",
    icon: Users,
    indicator: "$",
    value: 45231.89,
    description: "+20.1% from last month",
  },
  {
    title: "Sales",
    icon: CreditCard,
    indicator: "+",
    value: 12234,
    description: "+19% from last month",
  },
  {
    title: "Active Now",
    icon: Activity,
    indicator: "+",
    value: 573,
    description: "+201 since last hou",
  },
]

const Stats = () => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card, i) => (
        <Card key={i}>
          <CardHeader className="pb-4">
            <CardTitle className="font-semibold flex justify-between items-center gap-4">
              {card.title} {<card.icon className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {card.indicator}
              {card.value}
            </p>

            <CardDescription>{card.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
export default Stats
