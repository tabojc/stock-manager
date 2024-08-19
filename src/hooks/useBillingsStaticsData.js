import { useBillingsStore } from "@/store/billings";
import { useEffect } from "react";

export const useBillingsStaticsData = () => {
  const weekly = useBillingsStore((state) => state.weekly);
  const getOrdersStatics = useBillingsStore((state) => state.getOrdersStatics);
  const loading = useBillingsStore((state) => state.loading);
  const dollars = useBillingsStore((state) => state.dollars);
  const euros = useBillingsStore((state) => state.euros);
  const pesosArgentinos = useBillingsStore((state) => state.pesosArgentinos);
  const bolivares = useBillingsStore((state) => state.bolivares);
  const reales = useBillingsStore((state) => state.reales);
  const customers = useBillingsStore((state) => state.customers);

  useEffect(() => {
    getOrdersStatics();
  }, [getOrdersStatics]);

  const keyToCurrency = {
    dollars: "USD",
    euros: "EUR",
    pesosArgentinos: "ARS",
    bolivares: "VES",
    reales: "BRL",
  };

  const billingsByCurrency = {
    dollars,
    euros,
    pesosArgentinos,
    bolivares,
    reales,
  };

  const billingsAccounts = Object.keys(billingsByCurrency).map((key) => {
    return {
      currency: keyToCurrency[key],
      payable: billingsByCurrency[key].payable,
      receivable: billingsByCurrency[key].receivable,
      balance: billingsByCurrency[key].balance,
    };
  });

  return {
    getOrdersStatics,
    loading,
    weekly,
    billingsAccounts,
    customers,
  };
};
