import { forwardRef, HTMLAttributes } from "react"
import { cn } from "@/ui/utils"

const Heading2 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Heading2.displayName = "H2"
export default Heading2
