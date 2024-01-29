import { useViewport } from "./useViewport";

export enum LayoutWidths {
  sm,
  md,
  lg,
  xl,
  "2xl",
}

const widthOrder: {
  key: keyof typeof LayoutWidths;
  value: number;
}[] = [
  {
    key: "sm",
    value: 640,
  },
  {
    key: "md",
    value: 768,
  },
  {
    key: "lg",
    value: 1024,
  },
  {
    key: "xl",
    value: 1280,
  },
  {
    key: "2xl",
    value: 1536,
  },
];

export const useResponsiveLayout = () => {
  const { width } = useViewport();
  const widthFlags = {} as {
    [key in LayoutWidths]: boolean;
  };
  for (let i = 0; i < widthOrder.length; i++) {
    const entry = widthOrder[i];
    widthFlags[LayoutWidths[entry.key]] = entry.value <= width;
  }
  return { widthFlags };
};
