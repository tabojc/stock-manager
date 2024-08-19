import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Upload from "../Upload/Upload";
import AddIconButton from "../AddIconButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  ["&.receipt-header__account-name"]: {
    height: 0,
    minWidth: 240,
    display: "none",
  },
  ["&.receipt-header__amount"]: {
    height: 0,
    minWidth: 190,
    display: "none",
  },
  ["&.receipt-header__file-icon"]: {
    height: 0,
    minWidth: 90,
    display: "none",
  },
  [`&.receipt-header__status `]: {
    height: 0,
    padding: 0,
    margin: 0,
    display: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  ["&.receipt-column__account-name"]: {
    width: 228,
    maxWidth: 228,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
  },
  ["&.receipt-column__amount"]: {
    width: 100,
    maxWidth: 100,
  },
  ["&.receipt-column__currency-type"]: {
    width: 70,
    minWidth: 70,
  },
  ["&.receipt-column__file-icon"]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ["&.receipt-column__status"]: {
    width: 45,
    minWidth: 45,
    padding: 0,
    margin: 0,
  },
}));

const StyledTableRow = styled(TableRow)((/*{ theme }*/) => ({
  "&:nth-of-type(odd)": {},
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getTitle = ({
  accountDescription,
  accountCurrencyName,
  accountCurrencyType,
}) => {
  const sep = accountCurrencyName ? "/" : "";
  const wrap = accountCurrencyType ? ["(", ")"] : ["", ""];
  return `${accountDescription}${sep}${accountCurrencyName}${wrap[0]}${accountCurrencyType}${wrap[1]}`;
};

export function ReceiptsTable({ rows }) {
  return (
    <Box>
      <TableContainer component={Paper} sx={{ height: 165 }}>
        <Table size="small" aria-label="payment table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="receipt-header__account-name">
                Cuenta
              </StyledTableCell>
              <StyledTableCell className="receipt-header__amount">
                Cantidad
              </StyledTableCell>
              <StyledTableCell className="receipt-header__file-icon">
                Recibo
              </StyledTableCell>
              <StyledTableCell className="receipt-header__status">
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="receipt-column__account-name"
                  >
                    {getTitle(row)}
                  </StyledTableCell>
                  <StyledTableCell className={"receipt-column__amount"}>
                    {row?.amount}
                  </StyledTableCell>
                  <StyledTableCell className={"receipt-column__currency-type"}>
                    {row?.accountCurrencyType}
                  </StyledTableCell>
                  <StyledTableCell className={"receipt-column__file-icon"}>
                    <Upload
                      id={`receipt-receipt-${index}`}
                      name={`receipt-receipt-${index}`}
                      filename={row?.receipt}
                      disabled={row?.id}
                    />
                  </StyledTableCell>
                  <StyledTableCell className={"receipt-column__status"}>
                    <AddIconButton disabled />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
