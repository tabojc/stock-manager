import { useBalancesStore } from "@/store/balances";
import { useEffect, useMemo } from "react";

export const useBalancesData = () => {
  const balances = useBalancesStore((state) => state.balances);
  const loading = useBalancesStore((state) => state.balances);
  const info = useBalancesStore((state) => state.balances);
  const getBalances = useBalancesStore((state) => state.getBalances);
  const generateBalance = useBalancesStore((state) => state.generateBalance);
  const balance = useBalancesStore((state) => state.balance);

  const balanceFromToday = useMemo(() => {
    if (balance) {
      const currentDate = new Date().setHours(0, 0, 0, 0);
      const lastDate = new Date(balance?.updatedAt).setHours(0, 0, 0, 0);

      if (currentDate === lastDate) {
        return balance;
      }
    }
    return null;
  }, [balance]);

  const keyToCurrency = {
    dollars: "USD",
    euros: "EUR",
    pesosArgentinos: "ARS",
    bolivares: "VES",
    reales: "BRL",
  };

  const balanceAccounts = balanceFromToday
    ? Object.keys(balanceFromToday)
        .filter((key) =>
          [
            "dollars",
            "euros",
            "pesosArgentinos",
            "bolivares",
            "reales",
          ].includes(key)
        )
        .map((key) => ({
          currency: keyToCurrency[key],
          total: balanceFromToday?.[key].total,
          forDollar: balanceFromToday?.[key].forDollar,
          toDollar: balanceFromToday?.[key].toDollar,
        }))
    : [];

  useEffect(() => {
    getBalances();
  }, [getBalances]);

  let amounts = [];
  let days = [];

  const sortedBalance = balances.sort(
    (a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt)
  );

  sortedBalance.forEach((balance) => {
    amounts.push(balance?.totalDollares);

    const dateFormat = new Intl.DateTimeFormat("es-CL", {
      day: "2-digit",
      month: "2-digit",
    });

    const fechaFormateada = dateFormat.format(new Date(balance?.updatedAt));
    days.push(fechaFormateada);
  });

  return {
    balances,
    loading,
    info,
    generateBalance,
    balancesInUsd: {
      amounts,
      days,
    },
    balance,
    balanceAccounts,
  };
};
