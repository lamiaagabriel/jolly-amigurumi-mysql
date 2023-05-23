import { Provider } from "react-redux"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "@/context/slices/cart"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}
export default StoreProvider
