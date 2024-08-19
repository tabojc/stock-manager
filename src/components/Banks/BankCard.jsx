import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import SelectField from "../SelectField";
import { MAX_NUMBER_PART, MIN_NUMBER_PART } from "@/utils/constants";

export function BankCard({
  bank,
  title,
  disabledInputs,
  readOnlyInputs,
  omitFields = [],
  readOnlyFields = [],
  currencyCodes,
}) {
  const getDefaultCurrency = (codes, currencyName) => {
    return codes.find((data) => {
      return data.includes(currencyName);
    });
  };

  const defaultCurrency =
    getDefaultCurrency(currencyCodes, bank?.currencyName) ??
    getDefaultCurrency(currencyCodes, "ARS");

  const props = disabledInputs ? { disabled: true } : {};
  const inputProps = readOnlyInputs ? { readOnly: true } : {};

  return (
    <Card
      sx={{
        maxWidth: "400px",
        width: "400px",
        padding: 0,
        margin: 0,
        "& .MuiTextField-root": {},
        "& .MuiTypography-root": {},
        "& .MuiTextField-root input:invalid": {
          borderBottom: "2px solid red",
          color: "red",
        },
        /*  .account-id, .account-disable, .account-user_id */
        "& .MuiInputBase-root .account-id, .account-disable, .account-user_id":
          {
            display: "none",
          },
      }}
    >
      <Box
        component="header"
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </Box>
      <Divider />
      <CardContent
        sx={{
          padding: "0 12px 0 12px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <InputBase
          className="account-id"
          id="id"
          name="id"
          defaultValue={bank?.id}
          type="hidden"
        />
        <InputBase
          className="account-disable"
          id="disable"
          name="disable"
          defaultValue={bank?.disable}
          type="hidden"
        />
        <InputBase
          className="account-user_id"
          id="userId"
          name="userId"
          defaultValue={bank?.userId}
          type="hidden"
        />
        {!omitFields.includes("code") && (
          <TextField
            required
            fullWidth
            id="code"
            name="code"
            label="CBU/ALIAS"
            variant="outlined"
            size="small"
            defaultValue={bank?.code || ""}
            inputProps={{
              ...inputProps,
              maxLength: 36,
            }}
            {...props}
          />
        )}
        {!omitFields.includes("description") && (
          <TextField
            required
            fullWidth
            id="description"
            name="description"
            label="Nombre de Banco"
            placeholder="Nombre de Banco"
            variant="outlined"
            size="small"
            defaultValue={bank?.description || ""}
            inputProps={{
              ...inputProps,
              maxLength: 36,
            }}
            {...props}
          />
        )}
        {Array.isArray(currencyCodes) &&
          !omitFields.includes("currencyName") && (
            <SelectField
              required
              id="currencyName"
              name="currencyName"
              label="Moneda"
              defaultValue={defaultCurrency || "ARS - Cash Pesos (ARS)"}
              options={currencyCodes}
              size="small"
              {...{ readOnly: readOnlyFields.includes("currencyName") }}
              {...inputProps}
              {...props}
            />
          )}
        {!omitFields.includes("balance") && (
          <TextField
            fullWidth
            id="balance"
            name="balance"
            type="number"
            label="Saldo"
            variant="outlined"
            size="small"
            defaultValue={bank?.balance}
            inputProps={{
              ...inputProps,
              max: MAX_NUMBER_PART,
              step: MIN_NUMBER_PART,
              min: 0,
            }}
            {...props}
          />
        )}
        {!omitFields.includes("dailyLimit") && (
          <TextField
            required
            fullWidth
            id="dailyLimit"
            name="dailyLimit"
            label="Límite Diario"
            type="number"
            placeholder="Límite Diario"
            variant="outlined"
            size="small"
            defaultValue={bank?.dailyLimit}
            inputProps={{
              ...inputProps,
              max: MAX_NUMBER_PART,
              step: MIN_NUMBER_PART,
              min: 0,
            }}
            {...props}
          />
        )}
        {!omitFields.includes("monthlyLimit") && (
          <TextField
            required
            fullWidth
            id="monthlyLimit"
            name="monthlyLimit"
            label="Límite Mensual"
            type="number"
            placeholder="Límite Mensual"
            variant="outlined"
            size="small"
            defaultValue={bank?.monthlyLimit}
            inputProps={{
              ...inputProps,
              max: MAX_NUMBER_PART,
              step: MIN_NUMBER_PART,
              min: 0,
            }}
            {...props}
          />
        )}
        {!omitFields.includes("availableLimit") && (
          <TextField
            required
            fullWidth
            id="availableLimit"
            name="availableLimit"
            label="Límite Disponible"
            type="number"
            placeholder="Límite Disponible"
            variant="outlined"
            size="small"
            defaultValue={bank?.availableLimit}
            inputProps={{
              ...inputProps,
              max: MAX_NUMBER_PART,
              step: MIN_NUMBER_PART,
              min: 0,
            }}
            {...props}
          />
        )}
      </CardContent>
    </Card>
  );
}
