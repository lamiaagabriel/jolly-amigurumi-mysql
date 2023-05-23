import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { buttonVariants } from "@/ui/button"
import { ShoppingBag, Boxes } from "lucide-react"

import { CartBadge, SignOutButton } from "@/components/client-actions"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/next-auth"

const navLinks: { to: string; title: string }[] = [
  { to: "/", title: "Overview" },
  { to: "/products", title: "Products" },
  { to: "/customers", title: "Customers" },
  { to: "/orders", title: "Orders" },
]
const Header = async () => {
  const session = await getServerSession(authOptions)
  return (
    <header className="border-b bg-card">
      <div className="container py-4 flex justify-between items-center gap-8">
        <nav className="flex justify-start items-center gap-4">
          {navLinks.map((navLink, i) => (
            <Link key={i} href={{ pathname: `/admin${navLink.to}` }}>
              {navLink.title}
            </Link>
          ))}
        </nav>

        <>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={session.user?.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  {session.user?.name}
                  <p className="text-[10px] text-slate-500">
                    {session.user?.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={{ pathname: `/orders/${session.user.id}` }}>
                    <DropdownMenuItem>
                      <Boxes className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <SignOutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={{ pathname: "/auth" }} className={buttonVariants({})}>
              Sign in
            </Link>
          )}
        </>
      </div>
    </header>
  )
}
export default Header
