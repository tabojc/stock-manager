import { useEffect } from "react";
import { useOrdersStore } from "@/store/orders";
import { ActionType } from "@/utils/constants";

export const useOrdersData = ({ action, params = {} }) => {
  const orders = useOrdersStore((state) => state.orders);
  const loading = useOrdersStore((state) => state.loading);
  const getOrders = useOrdersStore((state) => state.getOrders);
  const getOrder = useOrdersStore((state) => state.getOrder);
  const error = useOrdersStore((state) => state.error);
  const updateOrder = useOrdersStore((state) => state.updateOrder);
  const order = useOrdersStore((state) => state.order);
  const info = useOrdersStore((state) => state.info);
  const getOrdersByParam = useOrdersStore((state) => state.getOrdersByParam);
  const resetOrder = useOrdersStore((state) => state.resetOrder);
  const deleteOrder = useOrdersStore((state) => state.deleteOrder);

  const { search, page } = params;

  useEffect(() => {
    if (action === ActionType.LIST) {
      if (!search) {
        getOrders(page);
      } else if (search) {
        getOrdersByParam({ search, page });
      }
    }
  }, [getOrders, getOrdersByParam, action, page, search]);

  return {
    orders,
    loading,
    error,
    updateOrder,
    order,
    getOrder,
    info,
    resetOrder,
    deleteOrder,
  };
};
