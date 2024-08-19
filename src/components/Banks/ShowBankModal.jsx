import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { BankCard } from "./BankCard";
import { ActionButtons } from "../ActionButtons";

export function ShowBankModal({
  bank,
  showModal,
  onSubmit,
  onClose,
  currencyCodes,
}) {
  return (
    <>
      <Dialog
        open={showModal}
        aria-labelledby="ver cliente"
        aria-describedby="ver campos del cliente"
      >
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
          <BankCard
            readOnlyInputs={true}
            bank={bank}
            title={"Ver Banco"}
            currencyCodes={currencyCodes}
            omitFields={["dailyLimit"]}
          />
          <ActionButtons closeLabel={"Cerrar"} onClose={onClose} />
        </Box>
      </Dialog>
    </>
  );
}
