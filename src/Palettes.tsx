import { useAtom } from "jotai";
import { oklch, paletteSetAtom, workspaceAtom, workspaceCore } from "./atoms";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export const Palettes = () => {
  const [paletteSets, setPaletteSets] = useAtom(paletteSetAtom);
  const [workspace, setWorkspace] = useAtom(workspaceCore);
  return (
    <Card className="flex flex-col gap-2 w-[320px] p-2">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div>{`Your Palettes(${paletteSets.length})`}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {paletteSets?.map((paletteSet) => {
          return (
            <div
              key={paletteSet.id}
              className="flex flex-row justify-between gap-2"
            >
              <button
                type="button"
                className="w-10 rounded-2xl flex items-center justify-center transition-all text-sm text-center hover:text-xs active:text-[13px]"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `[${paletteSet.luminances
                      .map((luminance) =>
                        oklch(luminance, paletteSet.chroma, paletteSet.hue),
                      )
                      .join(",")}]`,
                  );
                }}
              >
                Copy
              </button>
              <button
                type="button"
                className="inline-flex flex-row flex-1 h-6 rounded-full overflow-hidden border border-gray-200"
                onClick={() => {
                  setWorkspace({
                    ...(paletteSets.find((set) => set.id === paletteSet.id) ?? {
                      ...workspace,
                    }),
                  });
                }}
              >
                {paletteSet.luminances.map((luminance) => (
                  <div
                    key={luminance}
                    style={{
                      backgroundColor: oklch(
                        luminance,
                        paletteSet.chroma,
                        paletteSet.hue,
                      ),
                    }}
                    className=" flex-1 h-full flex items-center justify-center"
                  />
                ))}
              </button>
              <button
                type="button"
                className="w-6 rounded-2xl flex items-center justify-center transition-all text-sm text-center hover:text-xs active:text-[13px] bg-red-500 text-white"
                onClick={() => {
                  setPaletteSets(
                    paletteSets.filter((set) => set.id !== paletteSet.id),
                  );
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
