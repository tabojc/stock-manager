import { ModalBox } from "@/components/ModalBox";
import { ActionButtons } from "@/components/ActionButtons";
import { PaymentLine } from "@/components/Orders/PaymentLine";
import { OrderPaymentTable } from "@/components/Orders/OrderPaymentsTable";
import { GroupBox } from "@/components/GroupBox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { printNumber } from "@/utils/format";
import { useAccountsPayment } from "@/hooks/useAccountsPayment";
import { usePaymentsData } from "@/hooks/usePaymentsData";
import { ActionType } from "@/utils/constants";
import { useState } from "react";
import { useOrdersStore } from "@/store/orders";

const StyledModalBox = styled(ModalBox)(({ theme }) => ({
  "& .paymentcard__container": {
    [theme.breakpoints.up("sm")]: {
      minWidth: 540,
      minHeight: 254,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 540,
      minHeight: 254,
    },
  },
  "& .updatecard__footer": {},
}));
export function AddPaymentModal({ showModal, order, onClose }) {
  const getOrder = useOrdersStore((state) => state.getOrder);
  const [action, setAction] = useState(ActionType.LIST);
  const [, setPaymentTitle] = useState("");
  const [paymentValue, setPaymentValue] = useState("");

  function handlePaymentInput(event, value) {
    event.preventDefault();
    setPaymentTitle(value);
  }

  function handlePaymentValue(event, value) {
    event.preventDefault();
    setPaymentValue(value);
  }

  const { accountsByPayment, loading: accountsPaymentLoading } =
    useAccountsPayment({
      params: order ?? {},
    });

  const {
    createPayment,
    payments,
    loading: paymentsLoading,
  } = usePaymentsData({ action: action, params: order ?? {} });

  const handleCreatePayments = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const paymentData = {
      ...data,
      accountId: paymentValue.id,
    };

    await createPayment(paymentData);

    setAction(ActionType.ADD);

    await getOrder({ id: order?.id });

    setPaymentValue({});
  };

  return (
    <>
      <StyledModalBox showModal={showModal} title={"Pagos emitidos"}>
        <GroupBox label={"Salida"} className="paymentcard__container">
          <OrderPaymentTable rows={payments} loading={paymentsLoading} />
          {!paymentsLoading && (
            <PaymentLine
              className={"order-update__payment-container"}
              accounts={accountsByPayment}
              loading={accountsPaymentLoading}
              onSubmit={handleCreatePayments}
              order={order}
              onPaymentInput={handlePaymentInput}
              onPaymentValue={handlePaymentValue}
            />
          )}
        </GroupBox>
        <Grid className={"updatecard__footer"} container spacing={1}>
          <Grid item xs={8}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ textAlign: "right" }}
            >
              {"Restante"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ textAlign: "right" }}
            >
              {printNumber(order?.amountPayable, 2)}{" "}
              {order?.rateBusinessCurrency}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ textAlign: "right" }}
            >
              {"Total"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ textAlign: "right" }}
            >
              {printNumber(order?.totalPayment, 2)}{" "}
              {order?.rateBusinessCurrency}
            </Typography>
          </Grid>
        </Grid>
        <ActionButtons closeLabel={"cerrar"} onClose={onClose} />
      </StyledModalBox>
    </>
  );
}
