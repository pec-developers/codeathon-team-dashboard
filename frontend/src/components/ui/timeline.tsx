import * as React from "react"
import { cn } from "@/lib/utils"

const Timeline = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("m-0 p-0 list-none", className)} {...props} />
))
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "relative pl-12 mb-10 last:mb-0",
      className
    )}
    {...props}
  >
    {/* This line connects one item to the next. It sits perfectly behind standard empty circles, 
        but emoji indicators are 32px height and need more careful clipping, so we start it at top-8 */}
    <div className="absolute top-8 left-[15px] bottom-[-2.5rem] w-[2px] bg-border [li:last-child_&]:hidden" />
    {props.children}
  </li>
))
TimelineItem.displayName = "TimelineItem"

function getDominantColor(text: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return undefined;

  ctx.clearRect(0, 0, 16, 16);
  ctx.font = '14px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 8, 8);

  const imgData = ctx.getImageData(0, 0, 16, 16).data;
  let maxCount = 0;
  let domColor = '';
  const colorCounts: Record<string, number> = {};

  for (let i = 0; i < imgData.length; i += 4) {
    const r = imgData[i];
    const g = imgData[i + 1];
    const b = imgData[i + 2];
    const a = imgData[i + 3];

    if (a > 50) { // Only consider non-transparent pixels
      // round to group similar colors
      const qR = Math.round(r / 20) * 20;
      const qG = Math.round(g / 20) * 20;
      const qB = Math.round(b / 20) * 20;
      const key = `${qR},${qG},${qB}`;

      colorCounts[key] = (colorCounts[key] || 0) + 1;
      if (colorCounts[key] > maxCount) {
        maxCount = colorCounts[key];
        domColor = `rgb(${r}, ${g}, ${b})`;
      }
    }
  }
  return domColor || undefined;
}

const TimelineIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, style, ...props }, ref) => {
  const [emojiColor, setEmojiColor] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (typeof children === 'string' && children.trim().length > 0) {
      const color = getDominantColor(children);
      if (color) {
        setEmojiColor(color);
      }
    }
  }, [children]);

  const combinedStyle = React.useMemo(() => {
    if (emojiColor && children) {
      return { ...style, "--round-color": emojiColor } as React.CSSProperties;
    }
    return style;
  }, [style, emojiColor, children]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-0 top-0 flex h-8 w-8 items-center justify-center text-xl z-10 bg-background",
        !children && "h-4 w-4 left-2 top-2 rounded-full border-2 border-primary",
        !!children && "badge",
        className
      )}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  )
})
TimelineIndicator.displayName = "TimelineIndicator"

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1 -mt-1", className)}
    {...props}
  />
))
TimelineContent.displayName = "TimelineContent"

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-base font-semibold leading-none text-foreground", className)}
    {...props}
  />
))
TimelineTitle.displayName = "TimelineTitle"

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
TimelineDescription.displayName = "TimelineDescription"

const TimelineTime = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn("text-xs text-muted-foreground/80 mb-1", className)}
    {...props}
  />
))
TimelineTime.displayName = "TimelineTime"

export {
  Timeline,
  TimelineItem,
  TimelineIndicator,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
}
