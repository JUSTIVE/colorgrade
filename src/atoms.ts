import { atom } from "jotai";
import convert from "color-convert";

export type PaletteOptions = {
  id: string;
  startLuminance: number;
  endLuminance: number;
  gradientLevels: number;
  chroma: number;
  hue: number;
  gamma: number;
};

export type Palette = {
  luminances: number[];
} & PaletteOptions;

export const paletteSetAtom = atom<Palette[]>([]);

export const workspaceCore = atom<PaletteOptions>({
  id: crypto.randomUUID(),
  startLuminance: 0,
  endLuminance: 100,
  gradientLevels: 10,
  chroma: 0.18,
  hue: 0,
  gamma: 2.2,
});

const calculateColors = ({
  startLuminance,
  endLuminance,
  gradientLevels,
  gamma,
}: PaletteOptions): number[] => {
  const luminanceRange = endLuminance - startLuminance;
  const colors = [];
  for (let i = 0; i < gradientLevels; i++) {
    colors.push(
      startLuminance +
        luminanceRange * (i / (gradientLevels - 1)) ** (1 / gamma),
    );
  }
  return colors;
};

export const workspaceAtom = atom<Palette>((get) => {
  const workspace = get(workspaceCore);
  return {
    ...workspace,
    luminances: calculateColors(workspace),
  };
});

export const oklch = (luminance: number, chroma: number, hue: number) =>
  `oklch(${Math.round(luminance * 100) / 100}% ${chroma} ${hue})`;
