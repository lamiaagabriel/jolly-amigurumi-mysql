import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/context/slices/StoreProvider"
import { getCookie, setCookie } from "cookies-next"
import { Product } from "@/types/products"
import { Address, CreateAddressProps } from "@/types/address"
import { PaymentMethod } from "@/types/payment-method"

export interface CartProduct {
  product: Product
  quantity: number
  // size: string
  // color: string
}

export interface CartState {
  products: CartProduct[] | []
  address: CreateAddressProps | null
  payment_method: PaymentMethod | null
  shipping_fees: number
  subtotal: number
  totalItems: number
}

const initialState: CartState = getCookie("cart")
  ? (JSON.parse(getCookie("cart") as string) as unknown as CartState)
  : {
      products: [],
      address: null,
      payment_method: null,
      shipping_fees: 5.99,
      subtotal: 0,
      totalItems: 0,
    }

const setCartCookie = (state: CartState) => {
  setCookie(
    "cart",
    JSON.stringify({
      products: state.products,
      address: state.address,
      payment_method: state.payment_method,
      shipping_fees: state.shipping_fees,
      subtotal: state.subtotal,
      totalItems: state.totalItems,
    } as CartState)
  )
}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_to_cart: (state, action: PayloadAction<CartProduct>) => {
      state.totalItems++
      const exists = state.products.filter(
        ({ product }) => product.id === action.payload.product.id
      )[0]

      if (exists) {
        const i = state.products.indexOf(exists as never) as number
        ;(state.products.at(i) as CartProduct).quantity++
        state.subtotal += (state.products.at(i) as CartProduct).product.price

        setCartCookie(state)
        return
      }

      state.products.push(action.payload as never)
      state.subtotal += action.payload.product.price
      setCartCookie(state)
    },
    remove_from_cart: (state, action: PayloadAction<{ id: string }>) => {
      state.totalItems--
      const exists = state.products.filter(
        ({ product }) => product.id === action.payload.id
      )[0]
      if (exists) {
        const i = state.products.indexOf(exists as never)
        const quantity = state.products.at(i)!.quantity
        state.subtotal -= state.products.at(i)!.product.price
        if (quantity > 1) {
          state.products.at(i)!.quantity--
          setCartCookie(state)
          return
        }

        state.products = state.products.filter(
          ({ product }) => product.id != exists.product.id
        )
        setCartCookie(state)
      }
    },
    add_address: (state, action: PayloadAction<CreateAddressProps | null>) => {
      state.address = action.payload
      setCartCookie(state)
    },
    add_payment_method: (
      state,
      action: PayloadAction<PaymentMethod | null>
    ) => {
      state.payment_method = action.payload
      setCartCookie(state)
    },
    reset_cart: (state) => {
      state = {
        products: [],
        address: null,
        payment_method: null,
        shipping_fees: 5.99,
        subtotal: 0,
        totalItems: 0,
      }

      setCartCookie({
        products: [],
        address: null,
        payment_method: null,
        shipping_fees: 5.99,
        subtotal: 0,
        totalItems: 0,
      })
    },
  },
})

export const {
  add_to_cart,
  remove_from_cart,
  add_address,
  add_payment_method,
  reset_cart,
} = cartSlice.actions
export const useCart = (state: RootState) => state.cart
export default cartSlice.reducer
