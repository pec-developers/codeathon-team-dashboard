import * as React from "react"
import { cn } from "@/lib/utils"

export interface SubTitleProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
}

export const SubTitle = React.forwardRef<HTMLHeadingElement | HTMLParagraphElement, SubTitleProps>(
  ({ className, as: Component = "h2", ...props }, ref) => {
    return (
      <Component
        ref={ref as React.ForwardedRef<any>}
        className={cn(
          "text-xl md:text-3xl tracking-[0.2em] text-primary font-bold uppercase drop-shadow-[0_0_5px_var(--primary-color)]",
          className
        )}
        {...props}
      />
    )
  }
)
SubTitle.displayName = "SubTitle"
