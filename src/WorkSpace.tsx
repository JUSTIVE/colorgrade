import { useAtom } from "jotai";
import { workspaceAtom } from "./atoms";
import convert from "color-convert";

export const WorkSpace = () => {
  const [workSpace, setWorkSpace] = useAtom(workspaceAtom);

  const luminanceFromRGB = ([red, green, blue]: [number, number, number]) =>
    0.2126729 * red + 0.7151522 * green + 0.072175 * blue;
  return (
    <div className="p-2 size-full bg-gray-100 rounded-xl">
      <div className="flex flex-1 rounded-sm overflow-hidden h-full">
        {workSpace.colors.map((color, index) => {
          return (
            <button
              type="button"
              key={`${color}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              className="flex-1 flex items-center justify-center transition-all text-sm text-center hover:text-xs active:text-[13px] flex-col"
              style={{
                backgroundColor: `#${color}`,
                color:
                  luminanceFromRGB(convert.hex.rgb(color)) > 127
                    ? "#000000"
                    : "#ffffff",
              }}
              onClick={() => {
                navigator.clipboard.writeText(`#${color}`);
              }}
            >
              {workSpace.gradientLevels === 9 && (
                <div>{`${1000 - (index + 1) * 100}`}</div>
              )}
              <div>{`#${color}`}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
