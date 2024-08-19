import { ModalBox } from "@/components/ModalBox";
import { ActionButtons } from "../ActionButtons";
import Box from "@mui/material/Box";
import { TransactionCard } from "./TransactionCard";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  padding: "8px 8px 0px 8px ",
}));

export function AddTransactionModal({
  showModal,
  accountLoading,
  transaction,
  accounts,
  account,
  onAccountTermChange,
  onAccountChange,
  onSubmit,
  onClose,
  buttonRef,
}) {
  return (
    <>
      <ModalBox showModal={showModal} title={"Agregar Transacción"}>
        <StyledBox
          component="form"
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
        >
          <TransactionCard
            transaction={transaction}
            accountLoading={accountLoading}
            accounts={accounts}
            onAccountChange={onAccountChange}
            onAccountTermChange={onAccountTermChange}
            account={account}
          />
          <ActionButtons
            applyLabel={"Agregar"}
            closeLabel={"Cancelar"}
            onClose={onClose}
            applyRef={buttonRef}
          />
        </StyledBox>
      </ModalBox>
    </>
  );
}
