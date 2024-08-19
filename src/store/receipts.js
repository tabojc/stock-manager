import { create } from "zustand";
import {
  fetchCreateReceipt,
  fetchGetFilterReceipt,
  fetchGetReceipt,
  fetchGetReceiptByFilename,
  fetchReceipts,
} from "@/services/receipts";
import { getResponseError } from "@/utils/getResponseError";
import { mapResponseJsonToReceipts } from "@/utils/mappers/mapResponseJsonToReceipts";
import { mapReceiptsToRequestJson } from "@/utils/mappers/mapReceiptsToRequestJson";
import {
  CREATE_RECEIPT,
  FETCH_FILTER_RECEIPT,
  FETCH_RECEIPT,
  FETCH_RECEIPTS,
  FETCH_RECEIPT_DOCUMENT,
  REMOVE_RECEIPT_DOCUMENT,
  RESET_RECEIPTS,
} from "@/utils/constants";

export const useReceiptsStore = create(
  (set, get) => {
    return {
      receipts: [],
      loading: false,
      error: null,
      receipt: null,
      receiptFile: null,

      getReceipts: async () => {
        set({ loading: true }, false, FETCH_RECEIPTS);
        try {
          const response = await fetchReceipts();
          const { message, data } = response;

          if (!message && data) {
            const receipts = mapResponseJsonToReceipts(data);

            set(
              {
                receipts: receipts,
                receipt: null,
                error: null,
                loading: false,
              },
              false,
              FETCH_RECEIPTS
            );
          } else {
            const err = await getResponseError(response);
            set(
              { receipts: [], error: err, receipt: null, loading: false },
              false,
              FETCH_RECEIPTS
            );
          }
        } catch (err) {
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
              },
              receipt: null,
            },
            false,
            FETCH_RECEIPTS
          );
        }
      },

      getReceipt: async ({ id }) => {
        set({ loading: true }, false, FETCH_RECEIPT);
        try {
          const response = await fetchGetReceipt({ id });

          const { message, receipt } = response;

          if (message && receipt) {
            const [currentReceipt] = mapResponseJsonToReceipts([receipt]);
            set(
              { receipt: currentReceipt, loading: false },
              false,
              FETCH_RECEIPT
            );
          } else {
            const err = await getResponseError(response);
            set(
              { error: err, receipt: null, loading: false },
              false,
              FETCH_RECEIPT
            );
          }
        } catch (err) {
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
              },
              receipt: null,
            },
            false,
            FETCH_RECEIPT
          );
        }
      },

      createReceipt: async (data) => {
        set({ loading: true }, false, CREATE_RECEIPT);
        try {
          const [payload] = mapReceiptsToRequestJson([data]);

          const response = await fetchCreateReceipt(payload);

          const { message, receipt } = response;

          if (message && receipt) {
            const prevReceipts = get().receipts;
            const [addedReceipt] = mapResponseJsonToReceipts([receipt]);

            const receipts = [addedReceipt, ...prevReceipts];

            set(
              {
                receipts: receipts,
                receipt: addedReceipt,
                loading: false,
                error: null,
              },
              false,
              CREATE_RECEIPT
            );
          } else {
            const err = await getResponseError(response);
            set(
              { loading: false, error: err, receipt: null },
              false,
              CREATE_RECEIPT
            );
          }
        } catch (err) {
          console.error(err);
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
              },
              receipt: null,
            },
            false,
            CREATE_RECEIPT
          );
        }
      },

      getReceiptsByOrderId: async (id) => {
        try {
          set({ loading: true }, false, FETCH_FILTER_RECEIPT);
          const response = await fetchGetFilterReceipt({ id });

          const { message, data } = response;

          if (!message && data) {
            const receipts = mapResponseJsonToReceipts(data);

            set(
              { receipts: receipts, loading: false, receipt: null },
              false,
              FETCH_FILTER_RECEIPT
            );
          } else {
            const err = await getResponseError(response);
            set(
              {
                receipts: [],
                error: err,
                receipt: null,
                loading: false,
              },
              false,
              FETCH_FILTER_RECEIPT
            );
          }
        } catch (err) {
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
              },
              payment: null,
              payments: [],
            },
            false,
            FETCH_FILTER_RECEIPT
          );
        }
      },

      getReceiptByFilename: async (filename) => {
        set({ loading: true }, false, FETCH_RECEIPT_DOCUMENT);

        const response = await fetchGetReceiptByFilename(filename);

        const { message } = response;

        if (!message) {
          set(
            { receiptFile: response, error: {}, loading: false },
            false,
            FETCH_RECEIPT_DOCUMENT
          );
        } else {
          set(
            { receiptFile: null, loading: false },
            false,
            FETCH_RECEIPT_DOCUMENT
          );
        }
      },

      removeReceiptDocument: () => {
        set({ receiptFile: null }, false, REMOVE_RECEIPT_DOCUMENT);
      },

      resetReceipts: () => {
        set({ receipts: [] }, false, RESET_RECEIPTS);
      },
    };
  },
  {
    name: "receipts",
  }
);
