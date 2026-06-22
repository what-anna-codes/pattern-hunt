export const sampleCardIds = ['red-squiggle-blank-1', 'purple-diamond-gradient-3', 'red-stadium-blank-2', 'red-squiggle-full-1', 'purple-stadium-gradient-2', 'purple-squiggle-full-1', 'green-squiggle-blank-2', 'green-stadium-blank-1', 'green-diamond-gradient-3', 'purple-stadium-blank-2', 'purple-squiggle-full-3', 'red-diamond-gradient-3'];

export const getFeatures = (cardId: string) => {
  const features = cardId.split("-");
  return {
    color: features[0],
    shape: features[1],
    fill: features[2],
    count: parseInt(features[3], 10)
  };
}

