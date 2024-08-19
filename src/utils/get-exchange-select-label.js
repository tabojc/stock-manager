import { ExchangeType } from "./constants";

export const getExchangeSelectLabel = ({
  id,
  type,
  customerCurrency,
  businessCurrency,
}) => {
  if (type === ExchangeType.SALE) {
    return {
      [id]: `${type} 1 ${businessCurrency} por ${customerCurrency}`,
    };
  }
  if (type === ExchangeType.EXCHANGE) {
    return {
      [id]: `${type} 1 ${businessCurrency} por ${customerCurrency}`,
    };
  } else {
    return {
      [id]: `${type} 1 ${customerCurrency} por ${businessCurrency}`,
    };
  }
};
