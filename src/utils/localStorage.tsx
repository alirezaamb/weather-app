export const setLocalStorage = (key: string, value: string) => {
  value === ''
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, value);
};
export const getLocalStorage = (key: string) => {
  const rawData = localStorage.getItem(key);
  return rawData ? JSON.parse(rawData) : '';
};
