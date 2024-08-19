import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const StyledStack = styled(Stack)(({ theme }) => ({
  padding: "8px 8px 8px 0",
  "& 	.MuiButton-root:invalid": {
    backgroundColor: "green",
  },
  "& button#applyBtn:disabled": {
    backgroundColor: theme.palette.error.light,
  },
}));

export function ActionButtons({
  applyLabel,
  closeLabel,
  onClose,
  className,
  applyRef,
  ...props
}) {
  return (
    <StyledStack
      className={className}
      direction="row"
      justifyContent="right"
      alignItems="center"
      spacing={1}
      {...props}
    >
      {closeLabel && (
        <Button
          sx={{
            width: 110,
          }}
          id="cancelBtn"
          color="secondary"
          variant="contained"
          type="reset"
          onClick={onClose}
        >
          {closeLabel}
        </Button>
      )}
      {applyLabel && (
        <Button
          sx={{
            width: 110,
          }}
          id="applyBtn"
          variant="contained"
          type="submit"
          ref={applyRef}
        >
          {applyLabel}
        </Button>
      )}
    </StyledStack>
  );
}
