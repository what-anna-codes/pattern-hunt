export const getMockResults = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
          {id: `mock-result-${i}`, username: '', seconds: 0, hintCount: 0}))
  }