import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";

export default function PaymentIconButton({ id, onClick, ...rest }) {
  return (
    <IconButton
      id={id ?? "add-receipt"}
      aria-label="add receipt"
      color="secondary"
      onClick={onClick}
      {...rest}
    >
      <AddCircleIcon />
    </IconButton>
  );
}
