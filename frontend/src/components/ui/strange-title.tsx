import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const strangeTitleVariants = cva(
  "strange-title font-black drop-shadow-md text-primary w-fit",
  {
    variants: {
      as: {
        h1: "text-2xl sm:text-3xl md:text-4xl",
        h2: "text-xl sm:text-2xl md:text-3xl",
        h3: "text-lg sm:text-xl md:text-2xl",
        h4: "text-base sm:text-lg md:text-xl",
        h5: "text-sm sm:text-base md:text-lg",
        h6: "text-xs sm:text-sm md:text-base",
      },
    },
    defaultVariants: {
      as: "h1",
    },
  }
)

export interface StrangeTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof strangeTitleVariants> { }

export const StrangeTitle = React.forwardRef<HTMLHeadingElement, StrangeTitleProps>(
  ({ className, as: Component = "h1", ...props }, ref) => {
    const Tag = Component as React.ElementType
    return (
      <Tag
        ref={ref}
        className={cn(strangeTitleVariants({ as: Component, className }))}
        {...props}
      />
    )
  }
)
StrangeTitle.displayName = "StrangeTitle"
