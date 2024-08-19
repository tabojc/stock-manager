export const formatExchange = ({
  type,
  customerCurrency,
  businessCurrency,
}) => {
  return `${type} 1 ${customerCurrency} por ${businessCurrency}`;
};
