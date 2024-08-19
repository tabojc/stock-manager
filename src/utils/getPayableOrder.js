import { CustomerType, ExchangeType } from "./constants";

export const getPayableOrder = ({
  rateType = "",
  customerAmount = 0,
  rateAmount = 0,
  customerType,
}) => {
  if ([ExchangeType.SALE, ExchangeType.EXCHANGE].includes(rateType)) {
    if (customerType === CustomerType.VENDOR) {
      return customerAmount;
    }
    return customerAmount;
  }
  return Number(rateAmount) * customerAmount;
};
