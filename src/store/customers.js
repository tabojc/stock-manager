import { create } from "zustand";
import {
  fetchCreateCustomer,
  fetchCustomers,
  fetchDeleteCustomer,
  fetchFilterCustomers,
  fetchUpdateCustomer,
} from "@/services/customer";
import { mapResponseJsonToCustomer } from "@/utils/mappers/mapResponseJsonToCustomer.js";
import { getResponseError } from "@/utils/getResponseError";
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS,
  FILTER_CUSTOMERS,
  UPDATE_CUSTOMER,
} from "@/utils/constants";
import { mapCustomerToRequestJson } from "@/utils/mappers/mapCustomerToRequestJson";
import { getPageInfo } from "@/utils/getPageInfo";

export const useCustomersStore = create(
  (set, get) => {
    return {
      customers: [],
      loading: false,
      error: null,
      customer: null,
      info: {},

      getCustomers: async (page) => {
        set({ loading: true }, false, FETCH_CUSTOMERS);

        const response = await fetchCustomers({ page });

        const { data, message } = response;

        if (!message && data) {
          const customers = mapResponseJsonToCustomer(data);

          const { info } = getPageInfo(response);

          set(
            {
              customers: customers,
              loading: false,
              info: info,
              customer: null,
              error: null,
            },
            false,
            FETCH_CUSTOMERS
          );
        } else {
          const err = await getResponseError(response);
          set(
            { loading: false, customer: null, error: err },
            false,
            FETCH_CUSTOMERS
          );
        }
      },

      getCustomersByParam: async (param) => {
        set({ loading: true }, false, FILTER_CUSTOMERS);

        let response;
        if (param) response = await fetchFilterCustomers(param);
        else response = await fetchCustomers();

        const { data } = response;

        if (data) {
          const customers = mapResponseJsonToCustomer(data);
          set(
            {
              customers: customers,
              loading: false,
              error: null,
              customer: null,
            },
            false,
            FILTER_CUSTOMERS
          );
        } else {
          const err = await getResponseError(response);
          set(
            { customers: [], loading: false, error: err, customer: null },
            false,
            FILTER_CUSTOMERS
          );
        }
      },

      createCustomer: async (data) => {
        set({ loading: true }, false, CREATE_CUSTOMER);

        const [payload] = mapCustomerToRequestJson([data]);

        const response = await fetchCreateCustomer(payload);

        const { message, customer } = response;

        if (message && customer) {
          const prevCustomers = get().customers;
          const [currentCustomer] = mapResponseJsonToCustomer([customer]);
          const customers = [currentCustomer, ...prevCustomers];

          set(
            {
              customers: customers,
              customer: currentCustomer,
              loading: false,
              error: null,
            },
            false,
            CREATE_CUSTOMER
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: err,
              customer: null,
            },
            false,
            CREATE_CUSTOMER
          );
        }
      },

      updateCustomer: async ({ id, data }) => {
        set({ loading: true }, false, UPDATE_CUSTOMER);

        const [payload] = mapCustomerToRequestJson([data]);

        const response = await fetchUpdateCustomer({ id, data: payload });

        const { message, customer } = response;

        if (message && customer) {
          const [currentCustomer] = mapResponseJsonToCustomer([customer]);

          let customers = get().customers;

          const index = customers.findIndex(
            (customer) => customer.id === parseInt(id)
          );

          customers[index] = currentCustomer;

          set(
            {
              customers: customers,
              customer: currentCustomer,
              loading: false,
              error: null,
            },
            false,
            UPDATE_CUSTOMER
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: err,
              customer: null,
            },
            false,
            UPDATE_CUSTOMER
          );
        }
      },

      deleteCustomer: async ({ id }) => {
        set({ loading: true }, false, DELETE_CUSTOMER);

        const response = await fetchDeleteCustomer({ id });

        const { message } = response;

        if (message && !message.includes("No")) {
          const prevCustomers = get().customers;

          const index = prevCustomers.findIndex(
            (customer) => customer.id === parseInt(id)
          );

          const customer = prevCustomers[index];

          delete prevCustomers[index];

          set(
            {
              customers: prevCustomers,
              loading: false,
              customer: customer,
              error: null,
            },
            false,
            DELETE_CUSTOMER
          );
        } else {
          const err = await getResponseError(response);
          set(
            { loading: false, error: err, customer: null },
            false,
            DELETE_CUSTOMER
          );
        }
      },
    };
  },
  {
    name: "customers",
  }
);
