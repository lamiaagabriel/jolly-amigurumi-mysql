import { forwardRef, HTMLAttributes } from "react"
import { cn } from "@/ui/utils"

const Heading1 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Heading1.displayName = "H1"
export default Heading1
