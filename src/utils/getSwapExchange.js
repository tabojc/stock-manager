import { ExchangeType } from "./constants";

export const getSwapExchange = (exchange) => {
  const { businessCurrency, customerCurrency, type } = exchange;
  return ExchangeType.SALE === type || ExchangeType.EXCHANGE === type
    ? {
        ...exchange,
        businessCurrency: customerCurrency,
        customerCurrency: businessCurrency,
      }
    : exchange;
};
