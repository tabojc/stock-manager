import { CompletedOrders } from "@/components/Indicators/CompletedOrders";
import { TotalOrders } from "@/components/Indicators/TotalOrders";
import { OpenOrders } from "@/components/Indicators/OpenOrders";
import { PendingOrders } from "@/components/Indicators/PendingOrders";
import { useBillingsStaticsData } from "@/hooks/useBillingsStaticsData";
import { CustomerCounter } from "./CustomersCounter";

export function OrdersSummaryCard() {
  const { weekly, customers } = useBillingsStaticsData();

  const {
    totalOperations,
    operationsOpened,
    pendingOperations,
    operationsClosed,
  } = weekly;

  return (
    <>
      <CustomerCounter amount={customers} />
      <TotalOrders amount={totalOperations} />
      <OpenOrders amount={operationsOpened} />
      <PendingOrders amount={pendingOperations} />
      <CompletedOrders amount={operationsClosed} />
    </>
  );
}
