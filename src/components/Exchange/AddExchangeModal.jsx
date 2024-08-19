import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { ActionButtons } from "../ActionButtons";
import { ExchangeCard } from "./ExchangeCard";

export function AddExchangeModal({
  currencies,
  showModal = true,
  onSubmit = function () {},
  onClose,
  showCheckbox,
}) {
  return (
    <>
      <Dialog
        open={showModal}
        aria-labelledby="nuevo cambio"
        aria-describedby="agregar valores del cambio"
      >
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
          <ExchangeCard
            title={"Agregar Cambios"}
            currencies={currencies}
            showCheckbox={showCheckbox}
          />
          <ActionButtons
            applyLabel={"Agregar"}
            closeLabel={"Cancelar"}
            onClose={onClose}
          />
        </Box>
      </Dialog>
    </>
  );
}
