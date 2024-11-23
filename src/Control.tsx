import { paletteSetAtom, workspaceAtom, workspaceCore } from "./atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { RangedSlider } from "./components/ui/rangedSlider";
import { Label } from "./components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Slider } from "./components/ui/slider";
import { ColorSlider } from "./components/ui/colorslider";
import { Button } from "./components/ui/button";

export const Control = () => {
  const [options, setOptions] = useAtom(workspaceCore);
  const [paletteSet, setPaletteSet] = useAtom(paletteSetAtom);
  const workspace = useAtomValue(workspaceAtom);

  return (
    <Card className="w-[320px] flex flex-col gap-2 p-2">
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-2"}>
        <Label className="text-sm flex flex-row justify-between">
          <span>Luminance</span>
          <span>
            {options.startLuminance} ~ {options.endLuminance}
          </span>
        </Label>
        <RangedSlider
          defaultValue={[options.startLuminance, options.endLuminance]}
          onValueChange={(value) => {
            setOptions({
              ...options,
              startLuminance: Number(value[0]),
              endLuminance: Number(value[1]),
            });
          }}
          min={0}
          max={100}
          step={1}
        />
        <Label className="text-sm flex flex-row justify-between">
          <span>Steps</span>
          <span>{options.gradientLevels}</span>
        </Label>
        <Slider
          defaultValue={[options.gradientLevels]}
          onValueChange={(value) => {
            setOptions({
              ...options,
              gradientLevels: Number(value),
            });
          }}
          min={2}
          max={10}
          step={1}
        />

        <Label className="text-sm flex flex-row justify-between">
          <span>Hue</span>
          <span>{options.hue}</span>
        </Label>
        <ColorSlider
          defaultValue={[options.hue]}
          onValueChange={(value) => {
            setOptions({
              ...options,
              hue: Number(value),
            });
          }}
          min={0}
          max={360}
          step={1}
        />
        <Label className="text-sm flex flex-row justify-between">
          <span>Chroma</span>
          <span>{options.chroma}</span>
        </Label>
        <Slider
          defaultValue={[options.chroma]}
          onValueChange={(value) => {
            setOptions({
              ...options,
              chroma: Number(value),
            });
          }}
          min={0}
          max={0.4}
          step={0.01}
        />
        <Label className="text-sm flex flex-row justify-between">
          <span>Gamma</span>
          <span>{options.gamma}</span>
        </Label>
        <Slider
          defaultValue={[options.gamma]}
          onValueChange={(value) => {
            setOptions({
              ...options,
              gamma: Number(value),
            });
          }}
          min={1}
          max={2.5}
          step={0.01}
        />
      </CardContent>
      <Button
        onClick={() => {
          setPaletteSet([
            ...paletteSet,
            { ...workspace, id: crypto.randomUUID() },
          ]);
        }}
      >
        <span>Add Palette</span>
      </Button>
    </Card>
  );
};
