import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const descriptionVariants = cva(
  "opacity-80 max-w-2xl leading-relaxed font-mono",
  {
    variants: {
      variant: {
        default: "text-foreground", // First shade of white/black based on theme
        primary: "text-primary",
        secondary: "text-muted-foreground", // Second shade, highly dimmed white/black
      },
      size: {
        default: "text-sm md:text-base",
        sm: "text-xs md:text-sm",
        xs: "text-xs md:text-xs",
        lg: "text-base md:text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface DescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof descriptionVariants> {
  asChild?: boolean
}

export const Description = React.forwardRef<HTMLParagraphElement, DescriptionProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(descriptionVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Description.displayName = "Description"
