import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const StyledCard = styled(Card)(({ theme }) => ({
  ["& .indicatorcard__container"]: {
    paddingTop: 6,
    width: "100%",
    height: 80,
  },
  "& .indicatorcard__content": {
    position: "relative",
    "& .indicatorcard__icon-container": {
      //top: -6,
      position: "absolute",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      borderRadius: 6,
      minWidth: 40,
      textAlign: "center",
      width: 40,
      height: 40,
      display: "flex",
      direction: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .indicatorcard__amount": {
      margin: 0,
      paddingTop: 8,
      minWidth: "17ch",
      textAlign: "center",
    },
  },

  "& footer.indicatorcard__footer": {
    textAlign: "center",
    color: "grey",
    //minWidth: "25ch",
    //marginTop: 1,
  },
}));

export function IndicatorCard({ icon, title = "Indicator", amount = 0 }) {
  //const theme = useTheme();
  return (
    <StyledCard>
      <CardContent className="indicatorcard__container">
        <Box>
          <Box className="indicatorcard__content">
            <Box className="indicatorcard__icon-container">{icon}</Box>
            <Typography
              className="indicatorcard__amount"
              variant="h6"
              gutterBottom
            >
              {amount}
            </Typography>
          </Box>
          <Box component="footer" className="indicatorcard__footer">
            <Typography noWrap>{title}</Typography>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
}
