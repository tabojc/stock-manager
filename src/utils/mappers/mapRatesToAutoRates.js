import { ExchangeType } from "../constants";

export const mapRatesToAutoRates = (rawRates) => {
  return rawRates.map((rate) => {
    //customerCurrency | businessCurrency | amounts
    //Si es autogerado y venta (a)        -> amount customerCurrency  | 1 businessCurrency
    //Si es autogenerado y no venta (b)   -> amount customerCurrency  | 1 businessCurrency
    //Si no es autogerado y venta (c)     -> 1 businessCurrency  | amount customerCurrency //revisada
    //Si no es autogerado y no venta (d)  -> 1 customerCurrency  | amount businessCurrency

    const isNotAutoSale =
      rate.autoRate === 0 &&
      [ExchangeType.SALE, ExchangeType.EXCHANGE].includes(rate.type);
    const isNotAutoAndNotSale =
      rate.autoRate === 0 &&
      ![ExchangeType.SALE, ExchangeType.EXCHANGE].includes(rate.type);

    const isAutoSale =
      rate.autoRate === 1 &&
      [ExchangeType.SALE, ExchangeType.EXCHANGE].includes(rate.type);
    const isAutoAndNotSale =
      rate.autoRate === 1 &&
      ![ExchangeType.SALE, ExchangeType.EXCHANGE].includes(rate.type);

    let customerAmount = 0;
    let customerCurrency = "NADA";
    let businessAmount = 0;
    let businessCurrency = "NADA";

    //customer
    if (isNotAutoSale) {
      customerAmount = 1;
      customerCurrency = rate?.businessCurrency;

      businessAmount = rate?.amount;
      businessCurrency = rate?.customerCurrency;
    } else if (isNotAutoAndNotSale) {
      customerAmount = 1;
      customerCurrency = rate?.customerCurrency;

      businessAmount = rate?.amount;
      businessCurrency = rate?.businessCurrency;
    } else if (isAutoSale) {
      customerAmount = rate?.amount;
      customerCurrency = rate?.businessCurrency;

      businessAmount = 1;
      businessCurrency = rate?.customerCurrency;
    } else if (isAutoAndNotSale) {
      customerAmount = rate?.amount;
      customerCurrency = rate?.customerCurrency;

      businessAmount = 1;
      businessCurrency = rate?.businessCurrency;
    }

    const type = rate.autoRate ? `[${rate?.type}]` : rate?.type;

    return {
      ...rate,
      businessAmount,
      businessCurrency,
      customerAmount,
      customerCurrency,
      type,
    };
  });
};
