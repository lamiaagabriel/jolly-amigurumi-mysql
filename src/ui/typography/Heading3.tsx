import { forwardRef, HTMLAttributes } from "react"
import { cn } from "@/ui/utils"

const Heading3 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Heading3.displayName = "H3"
export default Heading3
