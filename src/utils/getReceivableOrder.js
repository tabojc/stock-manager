import {
  CustomerType,
  DECIMAL_DIGITS,
  ExchangeType,
  MAX_PERCENT,
} from "./constants";

import { roundToN } from "@/utils/roundton";

export const getReceivableOrder = ({
  rateType = "",
  customerAmount = 0,
  rateAmount = 0,
  customerType = CustomerType.CUSTOMER,
}) => {
  if ([ExchangeType.EXCHANGE].includes(rateType)) {
    if (customerType === CustomerType.VENDOR) {
      const percent = roundToN(
        rateAmount * MAX_PERCENT - MAX_PERCENT,
        DECIMAL_DIGITS
      );
      const amountPercent = roundToN(percent / MAX_PERCENT, DECIMAL_DIGITS);
      const result =
        Number(customerAmount) - Number(customerAmount) * amountPercent;

      return result;
    }
    return Number(customerAmount || 0) * rateAmount;
  } else if (rateType === ExchangeType.SALE) {
    return rateAmount * customerAmount;
  } else if (
    [ExchangeType.PURCHASE, ExchangeType.REMITTANCE].includes(rateType)
  ) {
    return customerAmount;
  }
  return rateAmount * customerAmount;
};
