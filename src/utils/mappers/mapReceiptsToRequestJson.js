import { removeEmpty } from "./removeEmpty";

export const mapReceiptsToRequestJson = (receipts = []) => {
  return receipts.map((data) => {
    const row = {
      id: isNaN(data?.id) ? undefined : parseInt(data?.id),
      account_id: data?.accountId,
      operation_id: data?.orderId,
      amount: data?.amount,
      receipt: data?.receipt,
    };
    return removeEmpty(row);
  });
};
