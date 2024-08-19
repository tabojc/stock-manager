import { useEffect } from "react";
import { useAccountsStore } from "@/store/accounts";

export const useAccountList = ({ term, minLength = 3 }) => {
  const accounts = useAccountsStore((state) => state.accounts);
  const loading = useAccountsStore((state) => state.loading);
  const getAccountList = useAccountsStore((state) => state.getAccountList);

  useEffect(() => {
    getAccountList();
  }, [getAccountList, term, minLength]);

  return {
    term,
    accounts,
    loading,
  };
};
