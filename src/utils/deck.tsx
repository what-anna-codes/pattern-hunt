import { Features, CardColors, CardShapes, CardFills } from "../ts/types";

export const sampleCardIds = [
  "red-squiggle-blank-1",
  "purple-diamond-gradient-3",
  "red-stadium-blank-2",
  "red-squiggle-full-1",
  "purple-stadium-gradient-2",
  "purple-squiggle-full-1",
  "green-squiggle-blank-2",
  "green-stadium-blank-1",
  "green-diamond-gradient-3",
  "purple-stadium-blank-2",
  "purple-squiggle-full-3",
  "red-diamond-gradient-3",
];

export const getFeatures = (cardId: string) => {
  const features = cardId.split("-");
  return {
    color: features[0],
    shape: features[1],
    fill: features[2],
    count: parseInt(features[3], 10),
  };
};

export function generateDeck() {
  let deck: Array<string> = [];
  let features: Features = {
    color: [CardColors.Red, CardColors.Green, CardColors.Purple],
    shape: [CardShapes.Diamond, CardShapes.Squiggle, CardShapes.Stadium],
    fill: [CardFills.Blank, CardFills.Full, CardFills.Gradient],
    count: [1, 2, 3],
  };

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          deck.push(
            `${features.color[i]}-${features.shape[j]}-${features.fill[k]}-${features.count[l]}`,
          );
        }
      }
    }
  }

  shuffleArray(deck);
  return deck;
}

function shuffleArray(arr: Array<string>) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    const tempArr = arr[i];
    arr[i] = arr[j];
    arr[j] = tempArr;
  }
}

export function check(cards: Array<string>): boolean {
  if (cards.length !== 3) return false;
  const sorted = cards
    .map((card) => card.split("-"))
    .flat()
    .sort();
  return !sorted.some(
    (el: string, i: number, arr) => arr.indexOf(el) === arr.lastIndexOf(el) - 1,
  );
}

export function checkAll(cards: Array<string>) {
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++)
      for (let k = j + 1; k < cards.length; k++) {
        if (check([cards[i], cards[j], cards[k]])) {
          return [cards[i], cards[j], cards[k]];
        }
      }
  }
  return null;
}
