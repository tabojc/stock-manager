import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";

const StyledFormControl = styled(FormControl)(() => ({
  "& .MuiInputLabel-formControl": {},
}));

export function SelectBox({
  id = "select-box",
  name,
  label,
  options,
  defaultValue,
  ...rest
}) {
  const { size, ...props } = rest;

  const menuOptions = options ? Object.keys(options) : [];

  return (
    <>
      {Array.isArray(menuOptions) && (
        <StyledFormControl fullWidth size={size}>
          <InputLabel htmlFor={id}>{label || ""}</InputLabel>
          <Select
            label={label}
            labelId={id}
            id={id}
            defaultValue={defaultValue || ""}
            name={name}
            {...props}
          >
            {menuOptions.map((key, index) => {
              return (
                <MenuItem key={index} value={key}>
                  {options?.[key]}
                </MenuItem>
              );
            })}
          </Select>
        </StyledFormControl>
      )}
    </>
  );
}
