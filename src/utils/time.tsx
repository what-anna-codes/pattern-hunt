export const getMinutes = (duration: number) => Math.floor(duration / 60);
export const getSeconds = (duration: number) => duration % 60;
export const padStart = (num: number) => num.toString().padStart(2, '0');
