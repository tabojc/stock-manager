import { ModalBox } from "@/components/ModalBox";
import { ActionButtons } from "@/components/ActionButtons";
import { GroupBox } from "@/components/GroupBox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { printNumber } from "@/utils/format";
import { ReceiptsTable } from "./ReceiptsTable";
import { AccountLine } from "@/components/Accounts/AccountLine";
import { useReceiptsData } from "@/hooks/useReceiptsData";
import { useAccountsReceipt } from "@/hooks/useAccountsReceipt";
import { useState } from "react";
import { ActionType } from "@/utils/constants";
import { useOrdersStore } from "@/store/orders";

const StyledModalBox = styled(ModalBox)(({ theme }) => ({
  "& .receiptcard__container": {
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
export function AddReceiptsModal({ showModal, order, onClose }) {
  const getOrder = useOrdersStore((state) => state.getOrder);
  const [action, setAction] = useState(ActionType.LIST);
  const {
    createReceipt,
    receipts,
    loading: receiptsLoading,
  } = useReceiptsData({ action: action, params: order ?? {} });

  const [, setAccountTitle] = useState("");
  const [accountValue, setAccountValue] = useState("");

  function handleAccountInput(event, value) {
    event.preventDefault();
    setAccountTitle(value);
  }

  function handleAccountValue(event, value) {
    event.preventDefault();
    setAccountValue(value);
  }

  const { accountsByReceipt, loading: accountsByReceiptsLoading } =
    useAccountsReceipt({
      params: order ?? {},
    });

  const handleCreateReceipt = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const receiptData = {
      ...data,
      orderId: order?.id,
      accountId: accountValue?.id,
    };

    await createReceipt(receiptData);

    await getOrder({ id: order?.id });

    setAction(ActionType.ADD);

    setAccountValue({});
  };

  return (
    <>
      <StyledModalBox showModal={showModal} title={"Pagos recibidos"}>
        <GroupBox label={"Entradas"} className="receiptcard__container">
          <ReceiptsTable rows={receipts} loading={receiptsLoading} />
          {!receiptsLoading && (
            <AccountLine
              className={"order-update__payment-container"}
              accounts={accountsByReceipt}
              loading={accountsByReceiptsLoading}
              onSubmit={handleCreateReceipt}
              order={order}
              onAccountInput={handleAccountInput}
              onAccountValue={handleAccountValue}
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
              {printNumber(order?.amountReceivable, 2)}{" "}
              {order?.rateCustomerCurrency}
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
              {printNumber(order?.totalReceivable, 2)}{" "}
              {order?.rateCustomerCurrency}
            </Typography>
          </Grid>
        </Grid>
        <ActionButtons closeLabel={"cerrar"} onClose={onClose} />
      </StyledModalBox>
    </>
  );
}
