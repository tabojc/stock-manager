import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

export default function ViewIconButton({ id, onClick, ...rest }) {
  return (
    <IconButton
      id={id ?? "view"}
      aria-label="view"
      color="secondary"
      onClick={onClick}
      {...rest}
    >
      <VisibilityIcon />
    </IconButton>
  );
}
