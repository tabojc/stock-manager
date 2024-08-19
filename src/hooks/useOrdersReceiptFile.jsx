import { useOrdersStore } from "@/store/orders";
import { usePaymentsStore } from "@/store/payments";
import { useReceiptsStore } from "@/store/receipts";
import { ActionType } from "@/utils/constants";
import { downloadFile } from "@/utils/downloadFile";
import { useEffect } from "react";

export const useOrdersReceiptFile = ({
  action = ActionType.LIST,
  filename,
}) => {
  const receiptByOrder = useOrdersStore((state) => state.receiptFile);
  const removeReceiptDocument = useReceiptsStore(
    (state) => state.removeReceiptDocument
  );
  const getPaymentReceiptFile = usePaymentsStore(
    (state) => state.getPaymentReceiptFile
  );
  const receiptByPayment = usePaymentsStore((state) => state.receiptFile);
  const removePaymentReceipt = usePaymentsStore(
    (state) => state.removePaymentReceipt
  );
  const getReceiptByFilename = useReceiptsStore(
    (state) => state.getReceiptByFilename
  );
  const receiptByReceipts = useReceiptsStore((state) => state.receiptFile);

  useEffect(() => {
    removePaymentReceipt();
    removeReceiptDocument();
  }, [removePaymentReceipt, removeReceiptDocument, action]);

  useEffect(() => {
    const document = receiptByPayment ?? receiptByReceipts;
    downloadFile({ file: document, filename: filename });
  }, [receiptByPayment, receiptByReceipts, filename]);

  return {
    receiptByOrder,
    getPaymentReceiptFile,
    receiptByPayment,
    removePaymentReceipt,
    removeReceiptDocument,
    getReceiptByFilename,
    receiptByReceipts,
  };
};
