import { useTransactionsStore } from "@/store/transactions";
import {
  ActionType,
  TRANSACTION_CREATE_SUCCESSFULLY,
  TRANSACTION_DELETE_SUCCESSFULLY,
  TRANSACTION_UPDATE_SUCCESSFULLY,
} from "@/utils/constants";
import { showMessage } from "@/utils/showMessage";
import { useCallback, useEffect } from "react";
import { useNotificationStore } from "@/store/notifications";

export const useTransactionsData = ({ action, params = {} }) => {
  const transactions = useTransactionsStore((state) => state.transactions);
  const transaction = useTransactionsStore((state) => state.transaction);
  const error = useTransactionsStore((state) => state.error);
  const getTransactions = useTransactionsStore(
    (state) => state.getTransactions
  );
  const createTransaction = useTransactionsStore(
    (state) => state.createTransaction
  );
  const info = useTransactionsStore((state) => state.info);
  const loading = useTransactionsStore((state) => state.loading);
  const getTransactionsByParam = useTransactionsStore(
    (state) => state.getTransactionsByParam
  );
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

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
    const { search, page } = params;
    if (ActionType.LIST === action) {
      if (!search) {
        getTransactions(page);
      } else if (search) {
        getTransactionsByParam({ search, page });
      }
    }
  }, [getTransactions, getTransactionsByParam, action, params]);

  useEffect(() => {
    refereshMessage({
      notificationShow: notificationShow,
      data: transaction,
      action,
      error,
      messageTypes: {
        ADD: TRANSACTION_CREATE_SUCCESSFULLY,
        UPDATE: TRANSACTION_UPDATE_SUCCESSFULLY,
        DELETE: TRANSACTION_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, refereshMessage, action, transaction, error]);

  return {
    transactions,
    error,
    createTransaction,
    transaction,
    info,
    loading,
  };
};
