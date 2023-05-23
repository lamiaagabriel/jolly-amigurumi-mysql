import { useCart } from "@/context/slices"
import { useAppSelector } from "@/context/slices/StoreProvider"

const ShowShippingAddress = () => {
  const cart = useAppSelector(useCart)

  return cart.address ? (
    <div className="font-medium pb-6 [&>p]:flex [&>p]:justify-between [&>p]:items-center [&>p]:gap-4 [&>p>span]:text-slate-500 [&>p>span]:text-sm">
      <p>
        Name:
        <span>{cart.address?.name}</span>
      </p>

      <p>
        Phone Number:
        <span>{cart.address?.phone}</span>
      </p>

      <p>
        Address Line:
        <span>{cart.address?.address_line}</span>
      </p>

      <p>
        ZIP Code:
        <span>{cart.address?.zip}</span>
      </p>

      <p>
        City:
        <span>{cart.address?.city}</span>
      </p>

      <p>
        Country:
        <span>{cart.address?.country}</span>
      </p>
    </div>
  ) : (
    <></>
  )
}
export default ShowShippingAddress
