import { useState } from "react";
import { useBillingsPayableData } from "@/hooks/useBillingsPayableData";
import { Paginator } from "@/components/common/Paginator";
import { PayableTable } from "@/components/Billings/PayableTable";

export function BillingsPayable(action = "LIST", params = {}) {
  const [options, setOptions] = useState({ action, params });
  const { ordersPayable, info } = useBillingsPayableData({
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
      <PayableTable
        omitFields={["amount"]}
        rows={ordersPayable}
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
