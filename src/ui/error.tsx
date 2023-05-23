import { forwardRef, HTMLAttributes } from "react"
import { cn } from "@/ui/utils"

const Error = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn("text-xs  text-red-500", className)}
      ref={ref}
      {...props}
    />
  )
})

Error.displayName = "Error"
export { Error }
