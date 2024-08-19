import { create } from "zustand";
import { CREATE_TRANSACTION, FETCH_TRANSACTIONS } from "@/utils/constants";
import {
  fetchCreateTransaction,
  fetchFilterTransactions,
  fetchGetTransactions,
} from "@/services/transactions";
import { mapResponseToTransactions } from "@/utils/mappers/mapResponseToTransactions";
import { getResponseError } from "@/utils/getResponseError";
import { mapTransactionsToRequest } from "@/utils/mappers/mapTransactionsToRequest";
import { getPageInfo } from "@/utils/getPageInfo";

export const useTransactionsStore = create(
  (set, get) => {
    return {
      transactions: [],
      transaction: null,
      loading: false,
      error: null,
      info: {},

      getTransactions: async (page) => {
        set({ loading: true }, false, FETCH_TRANSACTIONS);

        const response = await fetchGetTransactions({ page });

        const { message, data } = response;

        if (!message && data) {
          const transactions = mapResponseToTransactions(data);
          const { info } = getPageInfo(response);
          set(
            {
              transactions: transactions,
              info,
              loading: false,
              transaction: null,
            },
            false,
            FETCH_TRANSACTIONS
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: err,
              transaction: null,
            },
            false,
            FETCH_TRANSACTIONS
          );
        }
      },

      createTransaction: async (data) => {
        set({ loading: true }, false, CREATE_TRANSACTION);

        const [request] = mapTransactionsToRequest([data]);
        const response = await fetchCreateTransaction(request);
        const { message, transaction } = response;

        if (message && transaction) {
          const [currentTransaction] = mapResponseToTransactions([transaction]);
          let transactions = get().transactions;
          transactions = [currentTransaction, ...transactions];

          set(
            {
              transactions: transactions,
              transaction: currentTransaction,
              loading: false,
              error: null,
            },
            false,
            CREATE_TRANSACTION
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: err,
              transaction: null,
            },
            false,
            CREATE_TRANSACTION
          );
        }
      },

      getTransactionsByParam: async (param) => {
        set({ loading: true }, false, "FILTER_TRANSACTIONS");

        const response = await fetchFilterTransactions(param);

        const { message, data } = response;

        if (!message && data) {
          const transactions = mapResponseToTransactions(data);
          const { info } = getPageInfo(response);
          set(
            {
              transactions: transactions,
              loading: false,
              transaction: null,
              info: info,
            },
            false,
            "FILTER_TRANSACTIONS"
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              transactions: [],
              loading: false,
              error: err,
              transaction: null,
              info: null,
            },
            false,
            "FILTER_TRANSACTIONS"
          );
        }
      },
    };
  },
  {
    name: "transactions",
  }
);
