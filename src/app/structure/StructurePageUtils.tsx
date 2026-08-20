export const getLayoutType = (width: number | null, height: number | null) => {
  const hasWindowSize = height && width;
  const portrait = hasWindowSize && width < height;
  const desktop = hasWindowSize && !portrait && height >= 500;
  const mobileLandscape = hasWindowSize && !portrait && !desktop;
  return { portrait, desktop, mobileLandscape };
};
