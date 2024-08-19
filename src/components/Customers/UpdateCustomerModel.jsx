import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import CustomerCard from "../Customers/CustomerCard";
import { ActionButtons } from "../ActionButtons";

export function UpdateCustomerModal({
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
          title={"¿Modificar Cliente?"}
          countries={countries}
          jobs={jobs}
          role={role}
        />
        <ActionButtons
          applyLabel={"Modificar"}
          closeLabel={"Cancelar"}
          onClose={onClose}
        />
      </Box>
    </Dialog>
  );
}
