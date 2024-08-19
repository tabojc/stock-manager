import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  CART_STEPPER,
  CHECKOUT_STEPPER,
  DRAFT_STEPPER,
  PURCHASE_STEPPER,
  StepperType,
} from "@/utils/constants";
import { getSchemaError } from "@/utils/getSchemaError";
import { validateCart } from "@/utils/validateCart";
import { validateCheckout } from "@/utils/validateCheckout";
import { getPayableOrder } from "@/utils/getPayableOrder";
import { getReceivableOrder } from "@/utils/getReceivableOrder";

export const useSteppersStore = create(
  persist(
    (set, get) => {
      return {
        values: {
          id: "",
          customerId: "",
          dni: "",
          firstname: "",
          lastname: "",
          countryName: "",
          customerAccountCode: "",
          customerAccountName: "",
          description: "",
          rateId: "",
          specialRate: 0,
          rateType: "",
          customerCurrency: "",
          businessCurrency: "",
          customerAmount: "",
          rateAmount: "",
          totalPayment: 0,
          totalReceivable: 0,
          autoRate: 0,
          customerType: "",
        },
        status: StepperType.DRAFT,
        error: {},

        addCustomer: (data = {}) => {
          const values = get().values;

          const {
            customerId,
            dni,
            firstname,
            lastname,
            countryName,
            customerAccountCode,
            customerAccountName,
            description,
            customerType,
          } = data;

          const order = {
            ...values,
            countryName: countryName || values?.countryName,
            dni: dni || values?.dni,
            firstname: firstname || values?.firstname,
            lastname: lastname || values?.lastname,
            customerId: customerId || values?.customerId,
            customerAccountCode: !customerAccountCode
              ? ""
              : customerAccountCode,
            customerAccountName: !customerAccountName
              ? ""
              : customerAccountName,
            description: !description ? "" : description,
            customerType: customerType || values?.customerType,
          };

          set({ values: order }, false, CART_STEPPER);
        },

        addProduct: (data) => {
          const values = get().values;

          const {
            rateId,
            specialRate,
            rateType,
            customerCurrency,
            businessCurrency,
            rateAmount,
            customerAmount,
            autoRate,
          } = data;

          let order = {
            ...values,
            rateId: rateId || values?.rateId,
            specialRate: specialRate || values?.specialRate,
            rateType: rateType ?? values?.rateType,
            customerCurrency: customerCurrency || values?.customerCurrency,
            businessCurrency: businessCurrency || values?.businessCurrency,
            rateAmount: rateAmount ?? values?.rateAmount,
            customerAmount: customerAmount ?? values?.customerAmount,
          };

          const rateNumber =
            order?.rateAmount && !isNaN(order?.rateAmount)
              ? Number(order.rateAmount)
              : order?.rateAmount;
          const amountNumber =
            order.customerAmount && !isNaN(order.customerAmount)
              ? Number(order.customerAmount)
              : order.customerAmount;

          const prevAutoRate = get().values.autoRate;
          const autoRateNumber = autoRate ?? prevAutoRate;

          const calcultedRateNumber =
            autoRateNumber && autoRateNumber !== 0
              ? 1 / rateNumber
              : rateNumber;

          const totalPayment = getPayableOrder({
            ...order,
            rateAmount: calcultedRateNumber,
          });

          const totalReceivable = getReceivableOrder({
            ...order,
            rateAmount: calcultedRateNumber,
          });

          order = {
            ...order,
            customerAmount: amountNumber,
            totalPayment: totalPayment,
            totalReceivable,
            autoRate: autoRateNumber,
          };

          set({ values: order }, false, CHECKOUT_STEPPER);
        },

        addPurcharse: () => {
          set(
            { status: StepperType.PURCHASE, error: null },
            false,
            PURCHASE_STEPPER
          );
        },

        resetCustomer: () => {
          const values = get().values;
          set(
            {
              values: {
                ...values,
                customerId: "",
                dni: "",
                firstname: "",
                lastname: "",
                countryName: "",
                customerAccountCode: "",
                customerAccountName: "",
                description: "",
                customerType: "",
              },
              status: StepperType.DRAFT,
              error: null,
            },
            false,
            DRAFT_STEPPER
          );
        },

        resetCheckout: () => {
          const values = get().values;
          set(
            {
              values: {
                ...values,
                id: "",
                rateId: "",
                specialRate: 0,
                rateType: "",
                customerCurrency: "",
                businessCurrency: "",
                customerAmount: "",
                rateAmount: "",
                totalPayment: 0,
                totalReceivable: 0,
              },
              status: StepperType.CHECKOUT,
              error: {},
            },
            false,
            CHECKOUT_STEPPER
          );
        },

        checkValidity: (step) => {
          const values = get().values;
          const status = get().status;
          let currentStatus = status;
          if (
            (status === StepperType.DRAFT || status === StepperType.CART) &&
            step === 0
          ) {
            const { success, issues } = validateCart(values);

            const error = getSchemaError(issues);

            currentStatus = success ? StepperType.CART : StepperType.DRAFT;

            set(
              { values: values, status: currentStatus, error: error, step },
              false,
              CHECKOUT_STEPPER
            );
          } else {
            if (
              (status === StepperType.CART ||
                status === StepperType.CHECKOUT) &&
              step === 1
            ) {
              const { success, issues } = validateCheckout(values);

              const error = getSchemaError(issues);
              currentStatus = success ? StepperType.CHECKOUT : StepperType.CART;

              set(
                { values: values, status: currentStatus, error: error },
                false,
                CHECKOUT_STEPPER
              );
            }
          }
        },
      };
    },
    {
      name: "steppers",
      storage: createJSONStorage(() => sessionStorage),
      version: 4,
    }
  )
);
