import React from "react"

import type { Metadata } from "next"
export const metadata: Metadata = {
  title: `Orders | ${process.env.app_title}`,
}

import { H1, Paragraph } from "@/ui/typography"
import OrdersTable from "@/components/tables/orders"
import { Order } from "@/types/orders"
import { fetcher } from "@/utils/helper"

const Orders = async () => {
  const orders: Order[] = await fetcher("/orders", {
    next: { tags: ["getOrders"] },
    cache: "no-cache",
  })

  return (
    <>
      <section>
        <div className="container my-8 flex justify-between items-start gap-4">
          <div>
            <H1>Orders</H1>
            <Paragraph variant="subtle">See All Orders</Paragraph>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <OrdersTable orders={orders} />
        </div>
      </section>
    </>
  )
}
export default Orders
