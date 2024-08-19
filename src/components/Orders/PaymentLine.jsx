import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import SearchBox from "@/components/SearchBox";
import Upload from "@/components/Upload/Upload";
import AddIconButton from "../AddIconButton";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  paddingTop: 10,
  ["& .order-payment__table"]: {},
  ["& .order-payment__column-account"]: {},
  ["& .order-payment__column-receipt"]: {
    margin: 0,
    padding: "0px 0px 0px 1px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ["& .order-payment__column-action"]: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  ["& .payment-update__order-id"]: {
    display: "none",
  },
  ["& .payment-update__account-id"]: {
    display: "none",
  },
}));

export function PaymentLine({
  loading,
  accounts,
  onSubmit,
  order,
  className,
  onPaymentInput,
  onPaymentValue,
  ...props
}) {
  return (
    <>
      <StyledBox
        id="order-payment"
        name="order-payment"
        className={className}
        component="form"
        onSubmit={onSubmit}
        noValidate
        {...props}
      >
        <Grid container spacing={1} className="order-payment__table">
          <Grid item xs={12} md={5}>
            <SearchBox
              className="order-payment__column-account"
              id={"account"}
              name={"account"}
              label={"Cuenta"}
              size={"small"}
              loading={loading}
              options={accounts}
              getOptionLabel={(option) =>
                `${option.description} ${option.currencyName} (${option.currencyType})`
              }
              isOptionEqualToValue={(option, value) =>
                option.description.includes(value.description) ||
                option.currencyName.includes(value.currencyName) ||
                option.currencyType.includes(value.currencyType)
              }
              onChange={onPaymentValue}
              onInputChange={onPaymentInput}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id={"amount"}
              name={"amount"}
              fullWidth
              readOnly
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {order?.rateBusinessCurrency}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2} className="order-payment__column-receipt">
            <Upload id="receipt" name="receipt" />
          </Grid>
          <Grid item xs={12} md={1} className={"order-payment__column-action"}>
            <AddIconButton type="submit" />
          </Grid>
        </Grid>
        {order && (
          <InputBase
            className={"payment-update__order-id"}
            id="orderId"
            name="orderId"
            defaultValue={order?.id || ""}
            type="hidden"
          />
        )}
      </StyledBox>
    </>
  );
}
