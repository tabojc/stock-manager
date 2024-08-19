import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

export const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(238, 238, 238)",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
