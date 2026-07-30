export const cardFlipVariants = {
  isExiting: {
    rotateY: 450,
    opacity: 0.4,
    translateZ: 24,
    scale: 0.97,
    filter: "blur(0px)",
  },
  isEntering: {
    rotateY: 360,
    opacity: 1,
    translateZ: 0,
    filter: "blur(0px)",
  },
  isSilentlyEntering: {
    opacity: 1,

    translateZ: 0,
    filter: "blur(0px)",
  },
  isUpdating: {
    rotateY: 360,

    opacity: 1,
    translateZ: 0,
    filter: "blur(0px)",
  },
  initial: {
    rotateY: 270,
    opacity: 0.8,
    translateZ: -24,
    filter: "blur(0.8px)",
  },
};
