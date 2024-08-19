import { useEffect, useMemo } from "react";
import { useRatesStore } from "@/store/rates";
import { mapRatesToAutoRates } from "@/utils/mappers/mapRatesToAutoRates";

export const useRatesMarket = () => {
  const rawRates = useRatesStore((state) => state.rates);
  const loading = useRatesStore((state) => state.loading);
  const getRatesFromToday = useRatesStore((state) => state.getRatesFromToday);

  useEffect(() => {
    getRatesFromToday();
  }, [getRatesFromToday]);

  const rates = useMemo(() => mapRatesToAutoRates(rawRates), [rawRates]);

  return {
    rates,
    loading,
  };
};
