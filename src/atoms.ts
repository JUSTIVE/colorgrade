import { atom } from "jotai";
import convert from "color-convert";

export type PaletteOptions = {
  id: string;
  startLuminance: number;
  endLuminance: number;
  gradientLevels: number;
  saturation: number;
  hue: number;
  gamma: number;
};

export type Palette = { colors: string[] } & PaletteOptions;

export const paletteSetAtom = atom<Palette[]>([]);

export const workspaceCore = atom<PaletteOptions>({
  id: crypto.randomUUID(),
  startLuminance: 0,
  endLuminance: 100,
  gradientLevels: 10,
  saturation: 100,
  hue: 0,
  gamma: 2.2,
});

const calculateColors = ({
  startLuminance,
  endLuminance,
  gradientLevels,
  saturation,
  hue,
  gamma,
}: PaletteOptions): string[] => {
  const luminanceRange = endLuminance - startLuminance;
  const luminanceSteps = luminanceRange / (gradientLevels - 1);
  const colors = [];
  for (let i = 0; i < gradientLevels; i++) {
    const color = convert.hsl.hex([
      hue,
      saturation,
      startLuminance +
        (endLuminance - startLuminance) *
          (i / (gradientLevels - 1)) ** (1 / gamma),
    ]);
    colors.push(color);
  }
  return colors;
};

export const workspaceAtom = atom<Palette>((get) => {
  const workspace = get(workspaceCore);
  return {
    ...workspace,
    colors: calculateColors(workspace),
  };
});
