export const getVariants = (i: number, windowWidth: number | null) => {
  const desktop = {
    y:
      i === 1
        ? "-100%"
        : i === 2 || i === 7
          ? "-200%"
          : i === 11
            ? "100%"
            : i === 5 || i === 10
              ? "200%"
              : "0",
    x:
      i === 4
        ? "-100%"
        : i === 3
          ? "100%"
          : i === 6 || i === 9
            ? "300%"
            : "0",
  };
  const mobile = {
    y:
      i > 7
        ? `${(9 - i) * 100 + 50}%`
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
