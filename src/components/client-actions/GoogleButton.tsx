"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

import { Button } from "@/ui/button"
import { FcGoogle } from "react-icons/fc"

const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={async () => {
        setIsLoading(true)
        try {
          await signIn("google")
          console.log("Logged in with Google successfully.")
        } catch (error) {
          console.log("Error in Logging with Google.")
        } finally {
          setIsLoading(false)
        }
      }}
      isLoading={isLoading}
      disabled={isLoading}
    >
      {!isLoading && <FcGoogle className="w-4 h-4 mr-2" />}
      Sign in with Google
    </Button>
  )
}
export default GoogleButton
