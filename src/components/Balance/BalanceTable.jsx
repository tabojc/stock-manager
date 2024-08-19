import Grid from "@mui/material/Grid";
import { BalanceCard } from "./BalanceCard";

export function BalanceTable({ balances, billings }) {
  return (
    <>
      <Grid container spacing={2}>
        {billings.map((billing, index) => (
          <Grid key={`balance-${billing.currency}`} item xs={12} md={4}>
            <BalanceCard
              balanceByCurrency={balances?.[index]}
              billingByCurrency={billing}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
