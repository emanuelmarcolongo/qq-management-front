const convertStringToInt = (value: string | null) => {
  if (value) return parseInt(value);

  return -1;
};

export default convertStringToInt;
