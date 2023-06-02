import React from "react"

import type { Metadata } from "next"
export const metadata: Metadata = {
  title: `Customers | ${process.env.app_title}`,
}

import { H1, Paragraph } from "@/ui/typography"
import CustomersTable from "@/components/tables/customers"
import { Customer } from "@/types/customers"
import { fetcher } from "@/utils/helper"

const Customers = async () => {
  const customers: Customer[] = await fetcher("/customers", {
    next: { tags: ["getCustomers"] },
  })

  return (
    <>
      <section>
        <div className="container my-8 flex justify-between items-start gap-4">
          <div>
            <H1>Customers</H1>
            <Paragraph variant="subtle" className="max-w-prose">
              Manipulate all customers by creating, reading, updating, and
              deleting any of them.
            </Paragraph>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <CustomersTable customers={customers} />
        </div>
      </section>
    </>
  )
}
export default Customers
