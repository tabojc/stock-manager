import Typography from "@mui/material/Typography";
//import Dialog from "@mui/material/Dialog";
//import DialogTitle from "@mui/material/DialogTitle";
//import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PasswordInput from "./PasswordInput";
import { Copyright } from "./Copyright";
import logo from "@/assets/logo.svg";

const styles = {
  dialog: {
    backgroundColor: "primary.dark",
    "& .MuiDialog-paper": {
      borderRadius: 4,
      maxWidth: "400px",
    },
    "& .MuiModal-backdrop": {
      backgroundColor: "transparent",
    },
  },
};
//{ theme }
import styled from "@emotion/styled";

const LoginBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.primary.main,
    padding: 8,
    "& div.login__content": {
      maxWidth: 400,
      padding: 8,
      backgroundColor: "white",
      borderRadius: 10,
      /*marginTop: "-24%",*/
    },
    "& .login__header": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 8,
    },
    "& .login__header img": {
      padding: 14,
    }
}));

function Welcome(props) {
  return (
  <>
    <Typography
        variant="subtitle2"
        color="text.secondary"
        align="center"
        {...props}
      >
      <Typography variant="span" color="text.primary" align="center">
        {"Sistema "}
      </Typography>
       {"para seguimiento y control de inventarios"}
    </Typography>

  </>
  );
}

export default function LoginPage({ message, onSubmit }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <LoginBox>
        <Box className="login__content">
          <Box className="login__header">
            <img src={logo} width="150px" alt="ArCambio App" />
            <Welcome />
          </Box>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              id="username"
              label="Correo"
              name="username"
              autoComplete="username"
              defaultValue={""}
              autoFocus
            />
            <PasswordInput defaultValue={""} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Inicio de Sesión
            </Button>
            <Typography variant="subtitle2" color="text.secondary" align="center">
              {message && <>{message}</>}
            </Typography>
          </Box>
          <Copyright sx={{ mt: 1, mb: 4 }} />
        </Box>
      </LoginBox>
    </>
  );
}
