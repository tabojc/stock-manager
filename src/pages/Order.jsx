import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useLocation from "wouter/use-location";
import { OrderTable } from "@/components/Orders/OrderTable";
import { SearchInput } from "@/components/SearchInput";
import { NewButton } from "@/components/NewButton";
import { useOrdersData } from "@/hooks/useOrdersData";
import { ShowOrderModal } from "@/components/Orders/ShowOrderModal";
import { AddPaymentModal } from "@/components/Orders/AddPaymentModal";
import { ActionType, ModuleType } from "@/utils/constants";
import { getFormData } from "@/utils/getformdata";
import { Paginator } from "@/components/common/Paginator";
import { AddReceiptsModal } from "@/components/Receipts/AddReceiptsModal";
import { DeleteOrderModal } from "@/components/Orders/DeleteOrderModal";
import { useAuthStore } from "@/store/auth";

export default function Order({ action, params }) {
  const [options, setOptions] = useState({
    action,
    params,
  });

  const { orders, loading, order, getOrder, info, deleteOrder } = useOrdersData(
    {
      action: options.action,
      params: options.params,
    }
  );
  const role = useAuthStore((state) => state.role);

  const [, setLocation] = useLocation();

  const handleCreateDialog = () => {
    setLocation("/#/orders/add");
  };

  const handleSelect = (target) => async (event) => {
    event.preventDefault();

    setOptions((prevState) => ({
      action: target?.action,
      params: {
        ...prevState.params,
        ...target?.params,
      },
    }));

    await getOrder({ id: target.params.id });
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const formData = getFormData(form);

    const { search } = formData;

    setOptions((state) => ({
      action: state.action,
      params: { ...state.params, search, page: undefined },
    }));
  };

  const handleClose = (event) => {
    event.preventDefault();

    setOptions((prevState) => ({
      ...prevState,
      action: ActionType.LIST,
    }));
  };

  const hanglePageChange = (event, value) => {
    setOptions((prevState) => ({
      ...prevState,
      params: {
        ...prevState.params,
        page: value,
      },
    }));
  };

  const handleDeleteOrder = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const { orderId, description } = data;

    deleteOrder({ id: orderId, description });

    setOptions((prevState) => ({
      ...prevState,
      action: ActionType.LIST,
    }));
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="end"
        alignItems="center"
      >
        <Box component="form" onSubmit={handleSearchSubmit}>
          <SearchInput name="search" placeholder={"Buscar"} />
        </Box>
        <Box component="form">
          <NewButton
            label={"Agregar"}
            id="newBtn"
            onClick={handleCreateDialog}
          />
        </Box>
      </Stack>
      <OrderTable
        rows={orders}
        onAction={handleSelect}
        omitFields={["pending"]}
        role={role}
      />
      {orders && (
        <Paginator
          id="paginator"
          pages={info?.pages}
          current={info?.current}
          onChange={hanglePageChange}
        />
      )}
      {options?.action === ActionType.SHOW &&
        order &&
        order.id === options?.params?.id && (
          <ShowOrderModal
            showModal={options.action === ActionType.SHOW}
            order={order}
            onClose={handleClose}
            loading={loading}
          />
        )}

      {options.action === ModuleType.PAYMENT && (
        <AddPaymentModal
          showModal={options.action === ModuleType.PAYMENT}
          order={order}
          onClose={handleClose}
        />
      )}
      {options.action === ModuleType.RECEIPT && (
        <AddReceiptsModal
          showModal={options.action === ModuleType.RECEIPT}
          order={order}
          onClose={handleClose}
        />
      )}
      {options?.action === ActionType.DELETE && order && (
        <DeleteOrderModal
          showModal={options.action === ActionType.DELETE}
          order={order}
          onClose={handleClose}
          loading={loading}
          onSubmit={handleDeleteOrder}
        />
      )}
    </>
  );
}
