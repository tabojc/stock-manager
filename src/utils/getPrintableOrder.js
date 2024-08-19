import { formatNumber } from "@/utils/format";
import { ExchangeType } from "./constants";
import { roundToN } from "./roundton";

export const getPrintableOrder = (order, sep = "\n", padChar = "0") => {
  const print = [];

  const rateType = order?.rateType?.toUpperCase() ?? "";

  const customerCurrency =
    order?.rateType === ExchangeType.SALE ||
    order?.rateType === ExchangeType.EXCHANGE
      ? order?.rateBusinessCurrency
      : order?.rateCustomerCurrency;

  const businessCurrency =
    order?.rateType === ExchangeType.SALE ||
    order?.rateType === ExchangeType.EXCHANGE
      ? order?.rateCustomerCurrency
      : order?.rateBusinessCurrency;

  const asset = `${rateType} ${customerCurrency}`;
  print.push(asset);

  const customerAmount =
    order?.rateType === ExchangeType.SALE ||
    order?.rateType === ExchangeType.EXCHANGE
      ? formatNumber(roundToN(order?.totalReceivable, 2))
      : formatNumber(roundToN(order?.customerAmount, 2));

  const rateAmount = formatNumber(order?.rateAmount, 10);
  const totalPayment = formatNumber(roundToN(order?.totalPayment, 2));

  const calculations =
    order?.rateType === ExchangeType.SALE ||
    order?.rateType === ExchangeType.EXCHANGE
      ? `${totalPayment} ${customerCurrency} * ${rateAmount} ${businessCurrency} = ${customerAmount} ${businessCurrency}`
      : `${customerAmount} ${customerCurrency} * ${rateAmount} ${businessCurrency} = ${totalPayment} ${businessCurrency}`;

  print.push(calculations);

  const firstname = order?.customerFirstName;
  const lastname = order?.customerLastName;

  print.push("");

  const fullname = `${firstname} ${lastname}`;
  print.push(fullname);

  const accountName = order?.customerAccountName ?? "";
  print.push(accountName);

  const accountCode = order?.customerAccountCode ?? "";
  print.push(accountCode);

  if (!order?.id) return print.join(sep);

  const minSpaceLength = 5;
  const sequence = order?.id?.toString() ?? "0";
  const spaceLength =
    sequence.length < minSpaceLength ? minSpaceLength : sequence.length;
  const orderCode = `#${sequence.padStart(spaceLength, padChar)}`;
  print.push(orderCode);

  return print.join(sep);
};
