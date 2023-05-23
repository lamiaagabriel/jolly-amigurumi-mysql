import { forwardRef, HTMLAttributes } from "react"
import { cn } from "@/ui/utils"

const Heading4 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Heading4.displayName = "H4"
export default Heading4
