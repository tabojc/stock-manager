import { useBillingsReceivableData } from "@/hooks/useBillingsReceivableData";
import { Paginator } from "@/components/common/Paginator";
import { useState } from "react";
import { ReceivableTable } from "./ReceivableTable";

export function BillingsReceivable({ action, params }) {
  const [options, setOptions] = useState({ action, params });

  const { ordersReceivable, info } = useBillingsReceivableData({
    action: options.action,
    params: options.params,
  });

  const hanglePageChange = (event, value) => {
    setOptions((prevState) => ({
      ...prevState,
      params: {
        page: value,
      },
    }));
  };

  return (
    <>
      <ReceivableTable
        omitFields={["amount"]}
        rows={ordersReceivable}
        disableAction
      />
      <Paginator
        id="paginator"
        pages={info?.pages}
        current={info?.current}
        onChange={hanglePageChange}
      />
    </>
  );
}
