export const isNumericString = (data) => {
  data = Number(data);
  return !isNaN(data);
};
