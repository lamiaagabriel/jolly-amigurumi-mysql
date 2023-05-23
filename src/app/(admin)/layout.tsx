import Header from "./Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header />
      <main className="grow py-4">{children}</main>
    </>
  )
}
