import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { BankCard } from "./BankCard";
import { ActionButtons } from "../ActionButtons";

export function DeleteBankModal({
  bank,
  showModal,
  onSubmit,
  onClose,
  currencies,
  currencyCodes,
}) {
  return (
    <>
      <Dialog
        open={showModal}
        aria-labelledby="modificar cliente"
        aria-describedby="modificar campos del cliente"
      >
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
          <BankCard
            bank={bank}
            title={"Desactivar Banco"}
            currencies={currencies}
            disabledInputs={true}
            currencyCodes={currencyCodes}
            omitFields={["dailyLimit"]}
          />
          <ActionButtons
            applyLabel={"Desactivar"}
            closeLabel={"Cancelar"}
            onClose={onClose}
          />
        </Box>
      </Dialog>
    </>
  );
}
