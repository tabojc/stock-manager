import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { AmountCard } from "@/components/Balance/AmountCard";

const StyledCard = styled(Card)(() => ({
  "& .balancecard__statics": {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
  },
  "& .balancecard__left-amount": {
    textAlign: "center",
    width: "50%",
  },
  "& .balancecard__right-amount": {
    textAlign: "center",
    width: "50%",
  },
  "& .balancecard__statement": {
    textAlign: "center",
  },
}));

export function BalanceCard({ balanceByCurrency, billingByCurrency }) {
  return (
    <>
      <StyledCard>
        <CardContent>
          <Box className="balancecard__statics">
            <AmountCard
              className="balancecard__left-amount"
              currency={`Total ${billingByCurrency?.currency}`}
              amount={balanceByCurrency?.total || 0}
            />
            <AmountCard
              className="balancecard__right-amount"
              currency={"Total USD"}
              amount={balanceByCurrency ? balanceByCurrency?.toDollar : 0}
            />
          </Box>
          <Divider />
          <Box className="balancecard__statics">
            <AmountCard
              className="balancecard__left-amount"
              currency={"Cuentas por Cobrar"}
              amount={balanceByCurrency ? billingByCurrency.receivable : 0}
            />
            <AmountCard
              className="balancecard__right-amount"
              currency={"Cuentas por Pagar"}
              amount={balanceByCurrency ? billingByCurrency.payable : 0}
            />
          </Box>
          <AmountCard
            className="balancecard__statement"
            currency={"Balance"}
            amount={balanceByCurrency ? billingByCurrency.balance : 0}
          />
        </CardContent>
      </StyledCard>
    </>
  );
}
