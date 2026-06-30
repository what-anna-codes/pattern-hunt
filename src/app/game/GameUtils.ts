export const getVariants = (i: number, windowWidth: number | null) => {
  const desktop = {
    scale: 1.02,
    y: i === 3 || i === 6
      ? "-100%" : i === 5 || i === 8
        ? "100%" : i === 4
          ? "300%" : "0",
    x:
      i === 0 || i === 2 || i === 3 || i === 5
        ? "-100%" : i === 1
          ? "-200%" : i === 7
            ? "300%" : i === 4
              ? "50%" : i === 10
                ? "200%" : i >= 8 || i === 6
                  ? "100%" : "0",
  };
  const mobile = {
    y:
      i > 7
        ? `${(9 - i) * 100 + 150}%`
        : i < 8
          ? `-${(i + 1) * 100 + 50}%`
          : "0",
    x: "0",
  }
  return ({
    isOver: (windowWidth ?? 0) < 900 ? mobile : desktop,
    isOn: {
      y: 0,
      x: 0,
    },
    isReady: {
      y: 0,
      x: 0,
    },
  })
}
