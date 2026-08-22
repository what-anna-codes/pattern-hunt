export enum Layouts {
  Portrait = "PORTRAIT",
  Desktop = "DESKTOP",
  MobileLandscape = "MOBILE_LANDSCAPE",
}

export const getLayoutType = (width: number | null, height: number | null) => {
  if (!height || !width) return null;
  if (width < height) return Layouts.Portrait;
  if (height <= 500) return Layouts.MobileLandscape;
  return Layouts.Desktop;
};
