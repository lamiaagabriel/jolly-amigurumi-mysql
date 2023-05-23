import Announcement from "@/components/Announcement"
import Header from "./Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Announcement />
      {/* @ts-expect-errors Server Component */}
      <Header />
      <main className="grow py-4">{children}</main>
    </>
  )
}
