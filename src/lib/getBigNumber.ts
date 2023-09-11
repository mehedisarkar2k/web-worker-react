export const getBigNumber = () => {
  let number = 0;
  for (let i = 0; i < 10000000000; i += 1) {
    number += i;
  }
  return number;
};
