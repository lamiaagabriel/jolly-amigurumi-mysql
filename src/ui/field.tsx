import { forwardRef, HTMLAttributes } from "react"
import { cn } from "@/ui/utils"

const Field = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("space-y-1 mb-2", className)} ref={ref} {...props} />
    )
  }
)

Field.displayName = "Field"
export { Field }
