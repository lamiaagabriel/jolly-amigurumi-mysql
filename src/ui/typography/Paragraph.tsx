import { forwardRef, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/ui/utils"

interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export const paragraphVariants = cva("", {
  variants: {
    variant: {
      p: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-slate-700 dark:text-slate-400",
      large: "text-lg font-semibold text-slate-900 dark:text-slate-50",
      small: "text-sm font-medium leading-none",
      subtle:
        "text-sm text-slate-500 dark:text-slate-400 [&:not(:first-child)]:mt-2",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <p
        className={cn(paragraphVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Paragraph.displayName = "Paragraph"
export default Paragraph
