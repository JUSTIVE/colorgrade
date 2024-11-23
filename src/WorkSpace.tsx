import { useAtom } from "jotai";
import { oklch, workspaceAtom } from "./atoms";
import convert from "color-convert";

export const WorkSpace = () => {
  const [workSpace, setWorkSpace] = useAtom(workspaceAtom);

  const luminanceFromRGB = ([red, green, blue]: [number, number, number]) =>
    0.2126729 * red + 0.7151522 * green + 0.072175 * blue;
  return (
    <div className="p-2 size-full bg-gray-100 rounded-xl">
      <div className="flex flex-1 rounded-sm overflow-hidden h-full">
        {workSpace.luminances.map((luminance, index) => {
          return (
            <button
              type="button"
              key={`${luminance}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              className="flex-1 flex items-center justify-center transition-all text-sm text-center hover:text-xs active:text-[13px] flex-col"
              style={{
                backgroundColor: oklch(
                  luminance,
                  workSpace.chroma,
                  workSpace.hue,
                ),
                color:
                  luminanceFromRGB(convert.hex.rgb(luminance)) > 127
                    ? "#000000"
                    : "#ffffff",
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  oklch(luminance, workSpace.chroma, workSpace.hue),
                );
              }}
            >
              {workSpace.gradientLevels === 9 && (
                <div className="mb-2">{`${1000 - (index + 1) * 100}`}</div>
              )}
              <div>{`${Math.round(luminance * 100) / 100}%`}</div>
              <div>{workSpace.chroma}</div>
              <div>{workSpace.hue}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
