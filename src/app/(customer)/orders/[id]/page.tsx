import type { Metadata } from "next"
export const metadata: Metadata = { title: `Orders | ${process.env.app_title}` }

const Orders = () => {
  return (
    <section>
      <div className="container">Orders</div>
    </section>
  )
}
export default Orders
