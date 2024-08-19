import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import clsx from "clsx";
import DeleteIconButton from "../DeleteIconButton";
import EditIconButton from "../EditIconButton";
import ViewIconButton from "../ViewIconButton";
import Box from "@mui/material/Box";
import { ActionType } from "@/utils/constants";
import { StyledTableRow } from "../common/StyledTableRow";
import { TableCellTemplate } from "../common/TableCellTemplate";
import { formatNumber } from "@/utils/format";

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.bank-header__row"]: {
    width: "10px",
  },
  ["&.bank-header__description"]: {
    width: "auto",
  },
  ["&.bank-header__code"]: {
    width: 180,
  },
  ["&.bank-header__currency"]: {
    width: "160px",
    textAlign: "center",
  },
  ["&.bank-header__balance"]: {
    width: 180,
    minWidth: 180,
    textAlign: "right",
  },
  ["&.bank-header__daily-limit"]: {
    width: 180,
    minWidth: 180,
    textAlign: "right",
  },
  ["&.bank-header__monthly-limit"]: {
    width: 180,
    minWidth: 180,
    textAlign: "right",
  },
  ["&.bank-header__available-limit"]: {
    width: 180,
    minWidth: 180,
    textAlign: "right",
  },
  ["&.bank-header__action"]: {
    minWidth: 114,
    width: 114,
    textAlign: "center",
  },
  ["&.bank-column__description"]: {
    textAlign: "left",
    maxWidth: "20ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ["&.bank-column__code"]: {
    textAlign: "left",
    maxWidth: "20ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ["&.bank-column__currency"]: {
    textAlign: "center",
  },
  ["&.bank-column__balance"]: {
    textAlign: "right",
  },
  ["&.bank-column__daily-limit"]: {
    textAlign: "right",
  },
  ["&.bank-column__monthly-limit"]: {
    textAlign: "right",
  },
  ["&.bank-column__available-limit"]: {
    textAlign: "right",
  },
  ["&.bank-column__action"]: {
    padding: 0,
    margin: 0,
  },
  ["&.bank-cell__disabled"]: {
    color: "gray",
    textDecoration: "line-through",
  },
}));

export function BankTable({
  rows = [],
  onRowClick = { function() {} },
  omitFields = [],
}) {
  const counter = rows?.length || 0;

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
              <StyledTableCell className="bank-header__row">#</StyledTableCell>
              <StyledTableCell className="bank-header__description">
                Nombre de Banco
              </StyledTableCell>
              <StyledTableCell className="bank-header__code">
                CBU/ALIAS
              </StyledTableCell>
              <StyledTableCell className="bank-header__available-limit">
                Límite Disponible
              </StyledTableCell>
              {!omitFields.includes("dailyLimit") && (
                <StyledTableCell className="bank-header__daily-limit">
                  Límite Diario
                </StyledTableCell>
              )}
              <StyledTableCell className="bank-header__monthly-limit">
                Límite Mensual
              </StyledTableCell>
              <StyledTableCell className="bank-header__balance">
                Saldo
              </StyledTableCell>
              <StyledTableCell className="bank-header__action">
                Acción
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{counter - index}</StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={clsx("bank-column__description", {
                      ["bank-cell__disabled"]: row?.disable,
                    })}
                  >
                    {row?.description}
                  </StyledTableCell>
                  <StyledTableCell
                    className={clsx("bank-column__code", {
                      ["bank-cell__disabled"]: row?.disable,
                    })}
                  >
                    {row?.code}
                  </StyledTableCell>
                  <StyledTableCell
                    className={clsx("bank-column__available-limit", {
                      ["bank-cell__disabled"]: row?.disable,
                    })}
                  >
                    {`${formatNumber(row?.availableLimit)} ${
                      row?.currencyCode
                    }`}
                  </StyledTableCell>
                  {!omitFields.includes("dailyLimit") && (
                    <StyledTableCell
                      className={clsx("bank-column__daily-limit", {
                        ["bank-cell__disabled"]: row?.disable,
                      })}
                    >
                      {`${formatNumber(row?.dailyLimit)} ${row?.currencyCode}`}
                    </StyledTableCell>
                  )}
                  <StyledTableCell
                    className={clsx("bank-column__monthly-limit", {
                      ["bank-cell__disabled"]: row?.disable,
                    })}
                  >
                    {`${formatNumber(row?.monthlyLimit)} ${row?.currencyCode}`}
                  </StyledTableCell>
                  <StyledTableCell
                    className={clsx("bank-column__balance", {
                      ["bank-cell__disabled"]: row?.disable,
                    })}
                  >
                    {`${formatNumber(row?.balance)} ${row?.currencyCode}`}
                  </StyledTableCell>
                  <StyledTableCell className="bank-column__action">
                    <ViewIconButton
                      onClick={onRowClick({
                        action: ActionType.SHOW,
                        params: { ...row },
                      })}
                    />
                    <EditIconButton
                      onClick={onRowClick({
                        action: ActionType.UPDATE,
                        params: { ...row },
                      })}
                    />
                    <DeleteIconButton
                      onClick={onRowClick({
                        action: ActionType.DELETE,
                        params: { ...row },
                      })}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
