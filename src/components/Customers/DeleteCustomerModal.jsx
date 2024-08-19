import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import CustomerCard from "./CustomerCard";
import { ActionButtons } from "../ActionButtons";

export function DeleteCustomerModal({
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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
        <CustomerCard
          customer={customer}
          title={"¿Eliminar el Cliente?"}
          onSubmit={onSubmit}
          disabledInputs={true}
          countries={countries}
          jobs={jobs}
          role={role}
        />
        <ActionButtons
          applyLabel={"Eliminar"}
          closeLabel={"Cancelar"}
          onClose={onClose}
        />
      </Box>
    </Dialog>
  );
}
