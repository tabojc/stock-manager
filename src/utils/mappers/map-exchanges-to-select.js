import { formatExchange } from "@/utils/format-exchange";

export const mapExchangesToSelect = (exchanges) => {
  if (!Array.isArray(exchanges)) return;

  return exchanges.reduce((select, exchange) => {
    return { ...select, [exchange.id]: formatExchange(exchange) };
  }, {});
};
