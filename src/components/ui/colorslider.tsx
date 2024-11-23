import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { workspaceCore } from "@/atoms";
import { useAtomValue } from "jotai";

const ColorSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const workspaceOption = useAtomValue(workspaceCore);
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20"
        style={{
          background: `linear-gradient(\
          90deg,\
          oklch( 50%, ${workspaceOption.chroma},0%) 0%,\
           oklch(50%, ${workspaceOption.chroma},36%) 10%,\
           oklch(50%, ${workspaceOption.chroma},72%) 20%,\
           oklch(50%, ${workspaceOption.chroma},108%) 30%,\
           oklch(50%, ${workspaceOption.chroma},144%) 40%,\
           oklch(50%, ${workspaceOption.chroma},180%) 50%,\
           oklch(50%, ${workspaceOption.chroma},216%) 60%,\
           oklch(50%, ${workspaceOption.chroma},252%) 70%,\
           oklch(50%, ${workspaceOption.chroma},288%) 80%,\
           oklch(50%, ${workspaceOption.chroma},324%) 90%,\
           oklch( 50%, ${workspaceOption.chroma},360%) 100%)`,
        }}
      />
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});
ColorSlider.displayName = SliderPrimitive.Root.displayName;

export { ColorSlider };
