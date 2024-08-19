import { useEffect } from "react";
import { useCustomersStore } from "../store/customers";
import {
  ActionType,
  CUSTOMER_CREATE_SUCCESSFULLY,
  CUSTOMER_DELETE_SUCCESSFULLY,
  CUSTOMER_UPDATE_SUCCESSFULLY,
} from "@/utils/constants";
import { useNotificationStore } from "@/store/notifications";
import { showMessage } from "@/utils/showMessage";

export const useCustomersData = ({ action = ActionType.LIST, params = {} }) => {
  const customers = useCustomersStore((state) => state.customers);
  const getCustomers = useCustomersStore((state) => state.getCustomers);
  const loading = useCustomersStore((state) => state.loading);
  const getCustomersByFilters = useCustomersStore(
    (state) => state.getCustomersByFilters
  );
  const createCustomer = useCustomersStore((state) => state.createCustomer);
  const updateCustomer = useCustomersStore((state) => state.updateCustomer);
  const error = useCustomersStore((state) => state.error);
  const customer = useCustomersStore((state) => state.customer);
  const getCustomersByParam = useCustomersStore(
    (state) => state.getCustomersByParam
  );
  const info = useCustomersStore((state) => state.info);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  useEffect(() => {
    const { search, page } = params;

    if (ActionType.LIST === action)
      if (!search) {
        getCustomers(page);
      } else if (search) {
        getCustomersByParam(search);
      }
  }, [getCustomers, getCustomersByParam, action, params]);

  useEffect(() => {
    const refereshMessage = ({
      notificationShow,
      data,
      action,
      error,
      messageTypes,
    }) => {
      return showMessage({
        notificationShow,
        data,
        action,
        error,
        messageTypes,
      });
    };
    refereshMessage({
      notificationShow: notificationShow,
      data: customer,
      action: action,
      error,
      messageTypes: {
        ADD: CUSTOMER_CREATE_SUCCESSFULLY,
        UPDATE: CUSTOMER_UPDATE_SUCCESSFULLY,
        DELETE: CUSTOMER_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, action, customer, error]);

  return {
    getCustomers,
    customers,
    loading,
    getCustomersByFilters,
    createCustomer,
    updateCustomer,
    error,
    customer,
    info,
  };
};
