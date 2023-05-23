import React from "react"

import type { Metadata } from "next"
export const metadata: Metadata = {
  title: `Dashboard | ${process.env.app_title}`,
}

import { H1, Paragraph } from "@/ui/typography"
import {
  RecentSales,
  RecentJoins,
  Stats,
} from "@/components/sections/dashboard"

const Dashboard = () => {
  return (
    <>
      <section>
        <div className="container my-8">
          <div>
            <H1>Dashboard</H1>
            <Paragraph variant="subtle">See All Dashboard</Paragraph>
          </div>
        </div>
      </section>

      <section>
        <div className="container space-y-4">
          <Stats />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RecentJoins />
            <RecentSales />
          </div>
        </div>
      </section>
    </>
  )
}
export default Dashboard
