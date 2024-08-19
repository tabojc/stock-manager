//import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";

export default function PaymentIconButton({ onClick, ...rest }) {
  return (
    <IconButton
      id="add-payment"
      aria-label="add payment"
      color="secondary"
      onClick={onClick}
      {...rest}
    >
      <RemoveCircleIcon />
    </IconButton>
  );
}
