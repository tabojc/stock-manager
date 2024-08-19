import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import CustomerCard from "components/Customers/CustomerCard";
import { ActionButtons } from "components/ActionButtons";

export function ShowCustomerModal({
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
          readOnlyInputs
          title={"Ver Cliente"}
          customer={customer}
          countries={countries}
          jobs={jobs}
          role={role}
        />
        <ActionButtons closeLabel={"Cerrar"} onClose={onClose} />
      </Box>
    </Dialog>
  );
}
