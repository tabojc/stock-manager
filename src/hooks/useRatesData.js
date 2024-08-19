import { useCallback, useEffect, useMemo } from "react";
import { useRatesStore } from "@/store/rates";
import {
  ActionType,
  RATE_CREATE_SUCCESSFULLY,
  RATE_DELETE_SUCCESSFULLY,
  RATE_UPDATE_SUCCESSFULLY,
} from "@/utils/constants";
import { showMessage } from "@/utils/showMessage";
import { useNotificationStore } from "@/store/notifications";
import { mapRatesToAutoRates } from "@/utils/mappers/mapRatesToAutoRates";

export const useRatesData = (action, params = {}) => {
  const rawRates = useRatesStore((state) => state.rates);
  const getRates = useRatesStore((state) => state.getRates);
  const loading = useRatesStore((state) => state.loading);
  const error = useRatesStore((state) => state.error);
  const createRate = useRatesStore((state) => state.createRate);
  const rate = useRatesStore((state) => state.rate);
  const updateRate = useRatesStore((state) => state.updateRate);
  const info = useRatesStore((state) => state.info);
  const getRatesByParam = useRatesStore((state) => state.getRatesByParam);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  const { search, page } = params;

  useEffect(() => {
    if (ActionType.LIST === action) {
      if (!search) getRates(page);
      else getRatesByParam({ search, page });
    }
  }, [getRates, getRatesByParam, action, page, search]);

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
    const customAction =
      ActionType.ADD_GROUP === action ? ActionType.ADD : action;
    refereshMessage({
      notificationShow: notificationShow,
      data: rate,
      action: customAction,
      error,
      messageTypes: {
        ADD: RATE_CREATE_SUCCESSFULLY,
        UPDATE: RATE_UPDATE_SUCCESSFULLY,
        DELETE: RATE_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, refereshMessage, action, rate, error]);

  const formatExchange = ({ type, customerCurrency, businessCurrency }) =>
    `${type} 1 ${customerCurrency} por ${businessCurrency}`;

  const mapExchangesToSelect = (exchanges) => {
    if (!Array.isArray(exchanges)) return;

    return exchanges.reduce((select, rate) => {
      return select.concat(formatExchange(rate));
    }, []);
  };

  const rates = useMemo(() => mapRatesToAutoRates(rawRates), [rawRates]);

  const rateOptions = mapExchangesToSelect(rates);

  return {
    rates,
    loading,
    error,
    rateOptions,
    createRate,
    rate,
    updateRate,
    info,
  };
};
