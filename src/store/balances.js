import { fetchGenerateBalance, fetchGetBalance } from "@/services/balances";
import { getResponseError } from "@/utils/getResponseError";
import { mapResponseToBalances } from "@/utils/mappers/mapResponseToBalances";
import { create } from "zustand";

export const useBalancesStore = create(
  (set) => {
    return {
      balances: [],
      balance: null,
      error: null,
      loading: false,
      info: {},

      getBalances: async () => {
        set({ loading: true }, false, "FETCH_BALANCES");

        const response = await fetchGetBalance();

        const { message, data } = response;

        if (!message && data) {
          const balances = mapResponseToBalances(data);

          set({ balances: balances, loading: false }, false, "FETCH_BALANCES");
        } else {
          const err = getResponseError(response);
          set({ error: err, loading: false }, false, "FETCH_BALANCES");
        }
      },

      generateBalance: async () => {
        set({ loading: true }, false, "GENERATE_BALANCE");

        const response = await fetchGenerateBalance();

        const { message, balance: currentBalance } = response;

        if (message && currentBalance) {
          const [balance] = mapResponseToBalances([currentBalance]);

          set({ balance: balance, loading: false }, false, "GENERATE_BALANCE");
        } else {
          const err = getResponseError(response);
          set({ error: err, loading: false }, false, "GENERATE_BALANCE");
        }
      },
    };
  },
  {
    name: "balances",
  }
);
