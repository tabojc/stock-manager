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
import { StyledTableRow } from "@/components/common/StyledTableRow";
import { TableCellTemplate } from "@/components/common/TableCellTemplate";

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.receivable-header__row"]: {
    width: 5,
    minWidth: 5,
  },
  ["&.receivable-header__date"]: {
    width: 10,
    minWidth: 10,
  },
  ["&.receivable-header__customer"]: {
    with: "auto",
  },
  ["&.receivable-header__exchange"]: {
    width: 50,
    textAlign: "center",
  },
  ["&.receivable-header__rate"]: {
    padding: 0,
    minWidth: 70,
    width: 70,
    textAlign: "center",
    display: "none",
  },
  ["&.receivable-header__amount"]: {
    paddingRight: 0,
    width: 150,
    minWidth: 150,
    textAlign: "right",
  },
  ["&.receivable-header__pending"]: {
    paddingRight: 0,
    width: 200,
    minWidth: 200,
    textAlign: "right",
  },
  ["&.receivable-header__total"]: {
    width: 200,
    minWidth: 200,
    textAlign: "right",
  },
  ["&.receivable-header__status"]: {
    paddingRight: 0,
    width: 80,
    minWidth: 80,
    textAlign: "center",
  },
  ["&.receivable-header__action"]: {
    minWidth: 114,
    width: 114,
    textAlign: "center",
    margin: 0,
    padding: 0,
  },
  ["&.receivable-header__action--disabled"]: {
    display: "none",
  },
  ["&.receivable-column__date"]: {
    paddingLeft: 0,
  },
  ["&.receivable-column__customer"]: {
    paddingLeft: 0,
  },
  ["&.receivable-column__exchange"]: {
    padding: 0,
    textAlign: "center",
    textTransform: "capitalize",
  },
  ["&.receivable-column__rate"]: {
    paddingRight: 0,
    textAlign: "right",
    display: "none",
  },
  ["&.receivable-column__amount"]: {
    textAlign: "right",
    paddingRight: 0,
  },
  ["&.receivable-column__pending"]: {
    textAlign: "right",
    paddingRight: 0,
  },
  ["&.receivable-column__total"]: {
    textAlign: "right",
  },
  ["&.receivable-column__status"]: {
    textAlign: "center",
  },
  ["&.receivable-column__action"]: {
    padding: 0,
    margin: 0,
    ["& button"]: {
      padding: "6px",
    },
  },
  ["&.receivable-column__action--disabled"]: {
    display: "none",
  },
  ["& .receivable-column__status.receivable-pending"]: {
    color: "orange",
    backgroundColor: "orange",
  },

  ["& .receivable-column__status.receivable-open"]: {
    color: "yellow",
  },
}));

export function ReceivableTable({ rows }) {
  const counter = rows.length;

  return (
    <Box
      sx={{
        padding: "0 8px 0 8px",
      }}
    >
      <TableContainer component={Paper}>
        <Table size="small" aria-label="receivable table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="receivable-header__row">
                #
              </StyledTableCell>
              <StyledTableCell className="receivable-header__date">
                Fecha
              </StyledTableCell>
              <StyledTableCell className="receivable-header__customer">
                Cliente
              </StyledTableCell>
              <StyledTableCell className="receivable-header__exchange">
                Tipo
              </StyledTableCell>
              <StyledTableCell className="receivable-header__pending">
                Restante
              </StyledTableCell>
              <StyledTableCell className="receivable-header__total">
                Total
              </StyledTableCell>
              <StyledTableCell className="receivable-header__status">
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
                    className="receivable-column__date"
                  >
                    {printDate(row.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell className="receivable-column__customer">
                    {row.customerFirstName} {row.customerLastName}
                  </StyledTableCell>
                  <StyledTableCell className="receivable-column__exchange">
                    {row.rateType}
                  </StyledTableCell>
                  <StyledTableCell className="receivable-column__pending">
                    {`${printNumber(row.amountReceivable, 2)} ${
                      row.rateCustomerCurrency
                    }`}
                  </StyledTableCell>
                  <StyledTableCell className="receivable-column__total">
                    {`${printNumber(row.totalReceivable, 2)} ${
                      row.rateCustomerCurrency
                    }`}
                  </StyledTableCell>
                  <StyledTableCell className={"receivable-column__status"}>
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
