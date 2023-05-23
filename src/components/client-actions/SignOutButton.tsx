"use client"
import { useState } from "react"
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

const SignOutButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <DropdownMenuItem
      onClick={async () => {
        setLoading(true)
        try {
          await signOut()
          console.log("Signed Out Successfully")
        } catch (error) {
          console.log("Error in Signing Out")
        } finally {
          setLoading(false)
        }
      }}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}
export default SignOutButton
