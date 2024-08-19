import { create } from "zustand";
import {
  fetchCreateOrder,
  fetchDeleteOrder,
  fetchFilterOrders,
  fetchGetOrder,
  fetchUpdateOrder,
} from "@/services/orders";
import { fetchOrders } from "@/services/orders";
import { getResponseError } from "@/utils/getResponseError";
import { mapResponseJsonToOrders } from "@/utils/mappers/mapResponseJsonToOrders";
import { mapOrdersToRequestJson } from "@/utils/mappers/mapOrdersToRequestJson";
import {
  CREATE_ORDER,
  FETCH_ORDER,
  FETCH_ORDERS,
  FILTER_ORDERS,
  UPDATE_ORDER,
} from "@/utils/constants";
import { getPageInfo } from "@/utils/getPageInfo";

export const useOrdersStore = create(
  (set, get) => {
    return {
      orders: [],
      order: null,
      loading: false,
      error: null,
      info: {},

      getOrders: async (page) => {
        set({ loading: true }, false, FETCH_ORDERS);

        const response = await fetchOrders({ page });

        const { message, data } = response;

        if (!message && data && data.length) {
          const orders = mapResponseJsonToOrders(data);

          const { info } = getPageInfo(response);

          set(
            { orders: orders, order: null, info: info, error: null },
            false,
            FETCH_ORDERS
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err, order: null }, false, FETCH_ORDERS);
        }
      },

      createOrder: async (data) => {
        set({ loading: true }, false, CREATE_ORDER);
        const [order] = mapOrdersToRequestJson([data]);

        const response = await fetchCreateOrder(order);

        const { message, operation } = response;

        if (message && operation) {
          const prevOrders = get().orders;
          const [order] = mapResponseJsonToOrders([operation]);
          const orders = [order, ...prevOrders];
          set(
            { orders: orders, order: order, loading: false, error: null },
            false,
            CREATE_ORDER
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err, order: null }, false, CREATE_ORDER);
        }
      },

      updateOrder: async ({ id, data }) => {
        set({ loading: true }, false, UPDATE_ORDER);

        const [order] = mapOrdersToRequestJson([data]);

        const response = await fetchUpdateOrder({ id, data: order });

        const { message, operation } = response;

        if (message && operation) {
          const orders = get().orders;
          const [order] = mapResponseJsonToOrders([operation]);

          const index = orders.findIndex((order) => order.id === id);

          orders[index] = order;

          set(
            {
              orders: orders,
              order: order,
              loading: false,
              error: null,
            },
            false,
            UPDATE_ORDER
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err, order: null }, false, UPDATE_ORDER);
        }
      },

      getOrder: async ({ id }) => {
        set({ loading: true }, false, FETCH_ORDER);

        const response = await fetchGetOrder({ id });
        const { message, ...operation } = response;

        if (!message && operation) {
          const [order] = mapResponseJsonToOrders([operation]);

          const orders = get().orders;

          const index = orders.findIndex((data) => data.id === id);

          orders[index] = order;

          set(
            { order: order, loading: false, error: null },
            false,
            FETCH_ORDER
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err, order: null }, false, FETCH_ORDER);
        }
      },

      getOrdersByParam: async (param) => {
        set({ loading: true }, false, FILTER_ORDERS);

        const response = await fetchFilterOrders(param);

        const { message, data } = response;

        if (!message && data) {
          const orders = mapResponseJsonToOrders(data);

          const { info } = getPageInfo(response);

          set({ orders: orders, loading: false, info }, false, FILTER_ORDERS);
        } else {
          const err = await getResponseError(response);
          set(
            { orders: [], loading: false, error: err, info: [] },
            false,
            FILTER_ORDERS
          );
        }
      },

      resetOrder: () => {
        set({ order: null, loading: false, error: null }, false, "RESET_ORDER");
      },

      deleteOrder: async ({ id, description }) => {
        set({ loading: true }, false, "DELETE_ORDER");
        try {
          const response = await fetchDeleteOrder({ id, description });

          const { message } = response;

          if (message && message.includes("satisfactoriamente")) {
            const orders = get().orders;

            const index = orders.findIndex((order) => order.id === Number(id));

            const order = orders[index];

            set({ loading: false, order, error: null }, false, "DELETE_ORDER");
          } else {
            const err = await getResponseError(response);
            set(
              { loading: false, error: err, order: null },
              false,
              "DELETE_ORDER"
            );
          }
        } catch (err) {
          set(
            {
              loading: false,
              error: {
                code: "500",
                err,
              },
              order: null,
            },
            false,
            "DELETE_ORDER"
          );
        }
      },
    };
  },
  {
    name: "orders",
  }
);
