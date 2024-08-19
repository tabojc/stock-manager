import { useNotificationStore } from "@/store/notifications";
import { useReceiptsStore } from "@/store/receipts";

import {
  ActionType,
  PAYMENT_CREATE_SUCCESSFULLY,
  PAYMENT_DELETE_SUCCESSFULLY,
  PAYMENT_UPDATE_SUCCESSFULLY,
} from "@/utils/constants";
import { mapModulesToActions } from "@/utils/mappers/mapModulesToActions";
import { showMessage } from "@/utils/showMessage";
import { useCallback, useEffect } from "react";

export const useReceiptsData = ({ action = ActionType.LIST, params = {} }) => {
  const receipts = useReceiptsStore((state) => state.receipts);
  const receipt = useReceiptsStore((state) => state.receipt);
  const loading = useReceiptsStore((state) => state.loading);
  const getReceiptsByOrderId = useReceiptsStore(
    (state) => state.getReceiptsByOrderId
  );
  const createReceipt = useReceiptsStore((state) => state.createReceipt);
  const error = useReceiptsStore((state) => state.error);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );
  const resetReceipts = useReceiptsStore((state) => state.resetReceipts);

  useEffect(() => {
    const { id } = params;
    if (id) {
      getReceiptsByOrderId(id);
    }
  }, [getReceiptsByOrderId, params]);

  const refereshMessage = useCallback(
    ({ notificationShow, data, action, error, messageTypes }) => {
      return showMessage({
        notificationShow,
        data,
        action,
        error,
        messageTypes,
      });
    },
    []
  );

  useEffect(() => {
    const newAction = mapModulesToActions({ action });

    refereshMessage({
      notificationShow: notificationShow,
      data: receipt,
      action: newAction,
      error,
      messageTypes: {
        ADD: PAYMENT_CREATE_SUCCESSFULLY,
        UPDATE: PAYMENT_UPDATE_SUCCESSFULLY,
        DELETE: PAYMENT_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, refereshMessage, action, receipt, error]);

  return {
    createReceipt,
    receipts,
    getReceiptsByOrderId,
    loading,
    resetReceipts,
  };
};
