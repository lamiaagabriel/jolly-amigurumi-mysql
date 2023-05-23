import Link from "next/link"
import { buttonVariants } from "@/ui/button"
import { BiChevronLeft } from "react-icons/bi"

const CartEmpty = () => {
  return (
    <section className="grow grid place-items-center">
      <div className="container">
        <div className="container py-8 max-w-md mx-auto space-y-4">
          <h1 className="text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
            Cart is Empty
          </h1>
          <hr />
          <div className="w-full grid place-items-center">
            <Link
              href={{ pathname: "/products" }}
              className={buttonVariants({
                variant: "ghost",
              })}
            >
              <BiChevronLeft />
              <span>Go Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
export default CartEmpty
