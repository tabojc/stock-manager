import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIconButton from "@/components/DeleteIconButton";
import ViewIconButton from "@/components/ViewIconButton";
import Box from "@mui/material/Box";
import { OrderStatus } from "./OrderStatus";
import { printDate, printNumber } from "@/utils/format";
import { ActionType, ModuleType, UserType } from "@/utils/constants";
import { StyledTableRow } from "../common/StyledTableRow";
import { TableCellTemplate } from "@/components/common/TableCellTemplate";
import PaymentIconButton from "@/components/common/PaymentIconButton";
import ReceiptIconButton from "@/components/common/ReceiptIconButton";

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.order-header__row"]: {
    width: 10,
    minWidth: 10,
  },
  ["&.order-header__date"]: {
    width: 15,
    minWidth: 15,
    paddingLeft: 0,
  },
  ["&.order-header__customer"]: {
    paddingLeft: 0,
  },
  ["&.order-header__username"]: {
    paddingLeft: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  ["&.order-header__exchange"]: {
    width: 50,
    textAlign: "center",
  },
  ["&.order-header__rate"]: {
    padding: 0,
    minWidth: 70,
    width: 70,
    textAlign: "center",
    display: "none",
  },
  ["&.order-header__amount"]: {
    paddingRight: 0,
    width: 200,
    minWidth: 200,
    textAlign: "right",
  },
  ["&.order-header__pending"]: {
    paddingRight: 0,
    width: 150,
    minWidth: 150,
    textAlign: "right",
  },
  ["&.order-header__total"]: {
    width: 200,
    minWidth: 200,
    textAlign: "right",
  },
  ["&.order-header__status"]: {
    paddingRight: 0,
    width: 80,
    minWidth: 80,
    textAlign: "center",
  },
  ["&.order-header__action"]: {
    minWidth: 144,
    maxWidth: 144,
    width: 144,
    textAlign: "center",
  },
  ["&.order-header__action--disabled"]: {
    display: "none",
  },
  ["&.order-column__date"]: {
    paddingLeft: 0,
  },
  ["&.order-column__customer"]: {
    paddingLeft: 0,
  },
  ["&.order-column__username"]: {
    width: 100,
    maxWidth: 100,
    paddingLeft: 0,
    marginLeft: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ["&.order-column__exchange"]: {
    padding: 0,
    textAlign: "center",
    textTransform: "capitalize",
  },
  ["&.order-column__rate"]: {
    paddingRight: 0,
    textAlign: "right",
    display: "none",
  },
  ["&.order-column__amount"]: {
    textAlign: "right",
    paddingRight: 0,
  },
  ["&.order-column__pending"]: {
    textAlign: "right",
    paddingRight: 0,
  },
  ["&.order-column__total"]: {
    textAlign: "right",
  },
  ["&.order-column__status"]: {
    textAlign: "center",
  },
  ["&.order-column__action"]: {
    padding: 0,
    margin: 0,
    ["& button"]: {
      padding: "6px",
    },
  },
  ["&.order-column__action--disabled"]: {
    display: "none",
  },
  ["& .order-column__status.order-pending"]: {
    color: "orange",
    backgroundColor: "orange",
  },

  ["& .order-column__status.order-open"]: {
    color: "yellow",
  },
}));

export function OrderTable({
  rows,
  onAction = function () {},
  disableAction = false,
  omitFields = [],
  role,
}) {
  const counter = rows.length;

  return (
    <Box
      sx={{
        padding: "0 8px 0 8px",
      }}
    >
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customer table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="order-header__row">#</StyledTableCell>
              <StyledTableCell className="order-header__date">
                Fecha
              </StyledTableCell>
              <StyledTableCell className="order-header__customer">
                Cliente
              </StyledTableCell>
              <StyledTableCell className="order-header__username">
                Creado por
              </StyledTableCell>
              <StyledTableCell className="order-header__exchange">
                Tipo
              </StyledTableCell>
              <StyledTableCell className="order-header__rate">
                Tasa
              </StyledTableCell>
              {!omitFields.includes("amount") && (
                <StyledTableCell className="order-header__amount">
                  Cantidad
                </StyledTableCell>
              )}
              {!omitFields.includes("pending") && (
                <StyledTableCell className="order-header__pending">
                  Restante
                </StyledTableCell>
              )}
              {!omitFields.includes("total") && (
                <StyledTableCell className="order-header__total">
                  Total
                </StyledTableCell>
              )}
              <StyledTableCell className="order-header__status">
                Estado
              </StyledTableCell>
              {!disableAction && (
                <StyledTableCell className={"order-header__action"}>
                  Acción
                </StyledTableCell>
              )}
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
                    className="order-column__date"
                  >
                    {printDate(row.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__customer">
                    {`${row.customerFirstName} ${row.customerLastName}`}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__username">
                    {row.userName}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__exchange">
                    {row.rateType}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__rate">
                    {printNumber(row.rateAmount, 2)}
                  </StyledTableCell>
                  {!omitFields.includes("amount") && (
                    <StyledTableCell className="order-column__amount">
                      {`${printNumber(row.totalReceivable, 2)} ${
                        row.rateCustomerCurrency
                      }`}
                    </StyledTableCell>
                  )}
                  {!omitFields.includes("pending") && (
                    <StyledTableCell className="order-column__pending">
                      {`${printNumber(row.amountPayable, 2)} ${
                        row.rateBusinessCurrency
                      }`}
                    </StyledTableCell>
                  )}
                  {!omitFields.includes("total") && (
                    <StyledTableCell className="order-column__total">
                      {`${printNumber(row.totalPayment, 2)} ${
                        row.rateBusinessCurrency
                      }`}
                    </StyledTableCell>
                  )}
                  <StyledTableCell className={"order-column__status"}>
                    <OrderStatus status={row?.status} disable={row?.disable} />
                  </StyledTableCell>
                  {!disableAction && (
                    <StyledTableCell className={"order-column__action"}>
                      <ViewIconButton
                        id={`view-${index}`}
                        onClick={onAction({
                          action: ActionType.SHOW,
                          params: { ...row },
                        })}
                      />
                      <ReceiptIconButton
                        id={`receipt-${index}`}
                        onClick={onAction({
                          action: ModuleType.RECEIPT,
                          params: { ...row },
                        })}
                      />
                      <PaymentIconButton
                        id={`payment-${index}`}
                        onClick={onAction({
                          action: ModuleType.PAYMENT,
                          params: { ...row },
                        })}
                      />
                      <DeleteIconButton
                        id={`delete-${index}`}
                        className={"order-column__action--show"}
                        onClick={onAction({
                          action:
                            role === UserType.ADMIN
                              ? ActionType.DELETE
                              : ActionType.LIST,
                          params: role === UserType.ADMIN ? { ...row } : {},
                        })}
                      />
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
