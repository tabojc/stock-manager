import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import CustomerCard from "./CustomerCard";
import { ActionButtons } from "../ActionButtons";

export function AddCustomerModal({
  customer,
  showModal,
  onSubmit,
  onClose,
  countries,
  jobs,
  role,
}) {
  return (
    <Dialog
      open={showModal}
      aria-labelledby="nuevo cliente"
      aria-describedby="agregar campos del cliente"
    >
      <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
        <CustomerCard
          customer={customer}
          title={"Agreagar Cliente"}
          countries={countries}
          jobs={jobs}
          role={role}
        />
        <ActionButtons
          applyLabel={"Agregar"}
          closeLabel={"Cancelar"}
          onClose={onClose}
        />
      </Box>
    </Dialog>
  );
}
