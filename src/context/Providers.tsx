"use client"

import { SessionProvider } from "next-auth/react"

import { Toaster } from "@/ui/toaster"
import StoreProvider from "@/context/slices/StoreProvider"
import { Session } from "next-auth"

const Providers = ({
  session,
  children,
}: {
  session: Session | null
  children: React.ReactNode
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </SessionProvider>
    </>
  )
}
export default Providers
