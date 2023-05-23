import React from "react"

import type { Metadata } from "next"
export const metadata: Metadata = { title: `Auth | ${process.env.app_title}` }

import Link from "next/link"
import { buttonVariants } from "@/ui/button"
import { BiChevronLeft } from "react-icons/bi"
import { GoogleButton } from "@/components/client-actions"

const Auth = () => {
  return (
    <section className="min-h-screen grid place-items-center">
      <div className="container py-8 bg-card w-full max-w-lg mx-auto shadow rounded-md space-y-4">
        <div className="flex flex-col justify-center items-center w-full">
          <Link
            href="/"
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            <BiChevronLeft className="w-4 h-4 mr-2" />
            <span>Go Home</span>
          </Link>

          <h1 className="scroll-m-20 mb-2 mt-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Join Us Today
          </h1>
          <p className="text-slate-900 text-opacity-70 font-medium text-sm leading-6">
            Sign in with one of the following providers.
          </p>
        </div>
        <hr />
        <GoogleButton />
      </div>
    </section>
  )
}
export default Auth
