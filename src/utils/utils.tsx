export const getNextId = (arr: { id: string }[], currentId: string) => {
  const currentIndex = arr.findIndex((item) => item.id === currentId);
  if (currentIndex < 0 || currentIndex >= arr.length - 1) return arr[0].id;
  return arr[currentIndex + 1].id;
};
 
export const getPreviousId = (arr: { id: string }[], currentId: string) => {
  const currentIndex = arr.findIndex((item) => item.id === currentId);
  if (currentIndex < 0) return arr[0].id;
  if (currentIndex === 0) return arr[arr.length - 1].id;
  return arr[currentIndex - 1].id;
};
