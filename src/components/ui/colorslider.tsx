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
          hsl(0, ${workspaceOption.saturation}%, 50%) 0%,\
           hsl(36, ${workspaceOption.saturation}%,50%) 10%,\
           hsl(72, ${workspaceOption.saturation}%,50%) 20%,\
           hsl(108, ${workspaceOption.saturation}%,50%) 30%,\
           hsl(144, ${workspaceOption.saturation}%,50%) 40%,\
           hsl(180, ${workspaceOption.saturation}%,50%) 50%,\
           hsl(216, ${workspaceOption.saturation}%,50%) 60%,\
           hsl(252, ${workspaceOption.saturation}%,50%) 70%,\
           hsl(288, ${workspaceOption.saturation}%,50%) 80%,\
           hsl(324, ${workspaceOption.saturation}%,50%) 90%,\
           hsl(360, ${workspaceOption.saturation}%, 50%) 100%)`,
        }}
      />
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});
ColorSlider.displayName = SliderPrimitive.Root.displayName;

export { ColorSlider };
