import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function DeleteIconButton({ id, onClick, ...rest }) {
  return (
    <IconButton
      id={id ?? "delete"}
      aria-label="delete"
      color="secondary"
      size="small"
      onClick={onClick}
      {...rest}
    >
      <DeleteIcon />
    </IconButton>
  );
}
