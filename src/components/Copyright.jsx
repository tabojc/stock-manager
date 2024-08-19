import Typography from "@mui/material/Typography";

export function Copyright(props) {
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {" Powered by "}
      <Typography variant="span">AW technology 2024.</Typography>
    </Typography>
  );
}
