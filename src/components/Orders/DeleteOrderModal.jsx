import Box from "@mui/material/Box";
import { OrderPrintCard } from "@/components/Orders/OrderPrintCard";
import { CopyIconButton } from "@/components/CopyIconButton";
import { ActionButtons } from "@/components/ActionButtons";
import { ModalBox } from "../ModalBox";
import { getPrintableOrder } from "@/utils/getPrintableOrder";
import TextField from "@mui/material/TextField";
import { OrderReceiptsTable } from "./OrderReceiptsTable";
import { useOrdersReceiptFile } from "@/hooks/useOrdersReceiptFile";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ActionType } from "@/utils/constants";
import { useReceiptsData } from "@/hooks/useReceiptsData";
import { usePaymentsData } from "@/hooks/usePaymentsData";
import { useState } from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  width: 600,
  margin: "8px 8px 0 8px",
  ["& .order-view__details"]: {
    width: "auto",
  },
  ["& .order-view__image-container"]: {
    position: "absolute",
    top: "calc(100vh/2 - 200px)",
    zIndex: 2,
    backgroundColor: theme.palette.secondary.main,
    height: 200,
    width: 320,
    borderRadius: 4,
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.7)",
    overflowY: "scroll",
    overflowX: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  ["& button.order-view__close-button"]: {
    width: 1,
  },

  ["& img.order-view__image"]: {
    padding: 4,
  },
  ["& .order-card__description"]: {
    marginBottom: 4,
  },
}));

export function DeleteOrderModal({
  action,
  showModal,
  order,
  onSubmit,
  onClose,
}) {
  const [filename, setFilename] = useState("");
  const { payments } = usePaymentsData({
    action: ActionType.LIST,
    params: order ?? {},
  });

  const { receipts: orderReceipts } = useReceiptsData({
    action: ActionType.LIST,
    params: order ?? {},
  });

  const mapOrderReceptsToReceipts = (receipts = []) => {
    return receipts.map((data) => {
      if (data?.receipt)
        return {
          receiptType: "Entrada",
          filename: data?.receipt,
        };
      return;
    });
  };

  const mapPaymentsToReceipts = (payments) => {
    return payments.map((data) => {
      if (data?.receipt)
        return {
          receiptType: "Salida",
          filename: data?.receipt,
        };
      return;
    });
  };

  const documents = [
    ...mapOrderReceptsToReceipts(orderReceipts),
    ...mapPaymentsToReceipts(payments),
  ];

  const {
    getPaymentReceiptFile,
    getReceiptByFilename,
    removePaymentReceipt,
    removeReceiptDocument,
  } = useOrdersReceiptFile({
    action,
    filename,
  });

  const handleCopyClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(getPrintableOrder(order));
  };

  const handleShowReceipt = (target) => async () => {
    if (!target) return;

    setFilename(target?.filename);

    if (target.receiptType === "Entrada") {
      removePaymentReceipt();
      await getReceiptByFilename(target?.filename);
    } else if (target.receiptType === "Salida") {
      removeReceiptDocument();
      await getPaymentReceiptFile(target?.filename);
    }
  };

  return (
    <>
      <ModalBox showModal={showModal} title={"Eliminar Operacion"}>
        <StyledBox component="section" className="order-view__container">
          <Box component="section" className="order-view__details">
            <Box
              component="form"
              onSubmit={onSubmit}
              noValidate
              autoComplete="off"
            >
              {order && (
                <OrderPrintCard draft={false} text={getPrintableOrder(order)} />
              )}
              <Box
                sx={{
                  ["& .order-card__copy-clipboard:hover"]: {},
                }}
              >
                <CopyIconButton
                  className={"order-card__copy-clipboard"}
                  onClick={handleCopyClipboard}
                />
              </Box>
              {order && (
                <InputBase
                  className={"accountline__order-id"}
                  id="orderId"
                  name="orderId"
                  defaultValue={order?.id || ""}
                  type="hidden"
                />
              )}
              <TextField
                id="description"
                name="description"
                fullWidth
                multiline
                className="order-card__description"
                size="small"
                maxRows={3}
                minRows={3}
                defaultValue={order.description}
              />
              {documents && (
                <OrderReceiptsTable
                  rows={documents}
                  onAction={handleShowReceipt}
                />
              )}
              <ActionButtons
                applyLabel={"Eliminar"}
                closeLabel={"Cancelar"}
                onClose={onClose}
              />
            </Box>
          </Box>
        </StyledBox>
      </ModalBox>
    </>
  );
}
