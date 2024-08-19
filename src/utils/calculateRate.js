export const calculateRate = ({ rateNumber, autoRate }) => {
  if (autoRate && autoRate !== 0) return 1 / rateNumber;
  return rateNumber;
};
