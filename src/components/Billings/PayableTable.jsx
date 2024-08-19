import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { OrderStatus } from "@/components/Orders/OrderStatus";
import { printDate, printNumber } from "@/utils/format";
import { StyledTableRow } from "../common/StyledTableRow";
import { TableCellTemplate } from "@/components/common/TableCellTemplate";

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.payable-header__row"]: {
    width: 5,
    minWidth: 5,
  },
  ["&.payable-header__date"]: {
    width: 10,
    minWidth: 10,
  },
  ["&.payable-header__customer"]: {
    with: "auto",
  },
  ["&.payable-header__exchange"]: {
    width: 50,
    textAlign: "center",
  },
  ["&.payable-header__rate"]: {
    padding: 0,
    minWidth: 70,
    width: 70,
    textAlign: "center",
    display: "none",
  },
  ["&.payable-header__amount"]: {
    paddingRight: 0,
    width: 150,
    minWidth: 150,
    textAlign: "right",
  },
  ["&.payable-header__pending"]: {
    paddingRight: 0,
    width: 200,
    minWidth: 200,
    textAlign: "right",
  },
  ["&.payable-header__total"]: {
    width: 200,
    minWidth: 200,
    textAlign: "right",
  },
  ["&.payable-header__status"]: {
    paddingRight: 0,
    width: 80,
    minWidth: 80,
    textAlign: "center",
  },
  ["&.payable-header__action"]: {
    minWidth: 114,
    width: 114,
    textAlign: "center",
    margin: 0,
    padding: 0,
  },
  ["&.payable-header__action--disabled"]: {
    display: "none",
  },
  ["&.payable-column__row"]: {
    margin: 0,
    padding: 0,
  },
  ["&.payable-column__date"]: {
    paddingLeft: 0,
  },
  ["&.payable-column__customer"]: {
    paddingLeft: 0,
  },
  ["&.payable-column__exchange"]: {
    padding: 0,
    textAlign: "center",
    textTransform: "capitalize",
  },
  ["&.payable-column__rate"]: {
    paddingRight: 0,
    textAlign: "right",
    display: "none",
  },
  ["&.payable-column__amount"]: {
    textAlign: "right",
    paddingRight: 0,
    backgroundColor: "blue",
  },
  ["&.payable-column__pending"]: {
    textAlign: "right",
    paddingRight: 0,
  },
  ["&.payable-column__total"]: {
    textAlign: "right",
  },
  ["&.payable-column__status"]: {
    textAlign: "center",
  },
  ["&.payable-column__action"]: {
    padding: 0,
    margin: 0,
    ["& button"]: {
      padding: "6px",
    },
  },
  ["&.payable-column__action--disabled"]: {
    display: "none",
  },
  ["& .payable-column__status.payable-pending"]: {
    color: "orange",
    backgroundColor: "orange",
  },

  ["& .payable-column__status.payable-open"]: {
    color: "yellow",
  },
}));

export function PayableTable({ rows }) {
  const counter = rows.length;

  return (
    <Box
      sx={{
        padding: "0 8px 0 8px",
      }}
    >
      <TableContainer component={Paper}>
        <Table size="small" aria-label="payable table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="payable-header__row">
                #
              </StyledTableCell>
              <StyledTableCell className="payable-header__date">
                Fecha
              </StyledTableCell>
              <StyledTableCell className="payable-header__customer">
                Cliente
              </StyledTableCell>
              <StyledTableCell className="payable-header__exchange">
                Tipo
              </StyledTableCell>
              <StyledTableCell className="payable-header__rate">
                Tasa
              </StyledTableCell>
              <StyledTableCell className="payable-header__pending">
                Restante
              </StyledTableCell>
              <StyledTableCell className="payable-header__total">
                Total
              </StyledTableCell>
              <StyledTableCell className="payable-header__status">
                Estado
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              Array.isArray(rows) &&
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{counter - index}</StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="payable-column__date"
                  >
                    {printDate(row.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell className="payable-column__customer">
                    {row.customerFirstName} {row.customerLastName}
                  </StyledTableCell>
                  <StyledTableCell className="payable-column__exchange">
                    {row.rateType}
                  </StyledTableCell>
                  <StyledTableCell className="payable-column__pending">
                    {`${printNumber(row.amountPayable, 2)} ${
                      row.rateBusinessCurrency
                    }`}
                  </StyledTableCell>

                  <StyledTableCell className="payable-column__total">
                    {`${printNumber(row.totalPayment, 2)} ${
                      row.rateBusinessCurrency
                    }`}
                  </StyledTableCell>
                  <StyledTableCell className={"payable-column__status"}>
                    <OrderStatus status={row?.status} disable={row?.disable} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
