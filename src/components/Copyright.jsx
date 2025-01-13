import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';


export function Copyright(props) {
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Typography variant="span">Desarrollado por</Typography>
      <Link
        href="https://www.linkedin.com/in/juantaborda/"
        underline="none"
        rel="noreferrer"
        target="_blank" > Ing. Juan Taborda</Link>
    </Typography>
  );
}
