export const convertToNull = (item) => (item === "null" ? null : item);

export const filteredToken = (token) => {
  if (!token) return;

  return token
    .split("")
    .filter((e) => e !== '"')
    .join("");
};

export const sumParser = (sum) =>
  Number(sum)
    .toFixed(2)
    .split(".")
    .map((el, i) => (i === 0 ? Number(el).toLocaleString() : el))
    .join(".");
