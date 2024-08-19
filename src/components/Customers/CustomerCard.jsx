import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SelectField from "../SelectField";
import { SelectBox } from "../SelectBox";
import { CustomerType, UserType } from "@/utils/constants";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "400px",
  "& .customercard__header": {
    paddingTop: 1,
    marginBottom: 10,
  },
  "& .customercard__container": {
    padding: "0 14px 0px 12px",
  },
  "& .MuiTextField-root, & .customercard__type": {
    marginBottom: 10,
  },
  "& .MuiTextField-root input:invalid": {
    borderBottom: `2px solid ${theme.palette.error.dark}`,
    color: theme.palette.error.dark,
  },
}));

export default function CustomerCard({
  customer,
  title,
  disabledInputs,
  readOnlyInputs,
  countries = [],
  jobs = [],
  role,
}) {
  const initialState = {
    id: "",
    dni: "",
    countryId: "1",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    jobId: "1",
    description: "",
    userId: "",
    creationAt: "",
    updatedAt: "",
  };
  const [values, setValues] = useState({ ...initialState, ...customer });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  let countriesOpitons;
  let defaultCountry;

  if (countries && countries.length) {
    countriesOpitons = countries.map((country) => country?.name);
    const defaultCountryId = values?.countryId || 11;
    defaultCountry = countries.find(
      (country) => country.id == defaultCountryId
    )?.name;
  }

  let jobsOpitons;
  let defaultJob;

  if (jobs && jobs.length) {
    jobsOpitons = jobs.map((job) => job?.name);
    const defaultJobId = values?.jobId || 91;
    defaultJob = jobs.find((job) => job.id == defaultJobId)?.name;
  }

  const props = disabledInputs ? { disabled: true } : {};
  const inputProps = readOnlyInputs ? { readOnly: true } : {};

  return (
    <StyledPaper>
      <Box className="customercard__header" component="header">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Stack>
        <Divider />
      </Box>
      <Box className="customercard__container">
        <InputBase
          id="id"
          name="id"
          defaultValue={values?.id || ""}
          type="hidden"
          sx={{ display: "none" }}
        />
        <TextField
          required
          fullWidth
          id="dni"
          name="dni"
          placeholder="DNI"
          type="number"
          variant="outlined"
          size="small"
          label={"DNI"}
          value={values?.dni || ""}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            max: 999999999,
          }}
          {...props}
        />
        <TextField
          fullWidth
          required
          id="firstname"
          name="firstname"
          label="Nombre"
          variant="outlined"
          size="small"
          value={values?.firstname}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 20,
            minLength: 1,
          }}
          {...props}
        />
        <TextField
          fullWidth
          required
          id="lastname"
          name="lastname"
          label="Apellido"
          variant="outlined"
          size="small"
          value={values?.lastname}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 15,
          }}
          {...props}
        />
        {countriesOpitons && defaultCountry && (
          <SelectField
            required
            id={"countryName"}
            name={"countryName"}
            label={"Pais"}
            size="small"
            defaultValue={defaultCountry}
            options={countriesOpitons}
            {...inputProps}
            {...props}
          />
        )}

        <TextField
          fullWidth
          required
          id="phone"
          name="phone"
          type="tel"
          label="Telefono"
          variant="outlined"
          size="small"
          value={values?.phone}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            regex: /^(\+?[0-9]{3}) [0-9]{3} [0-9]{4}$/,
            maxLength: 15,
            minLength: 1,
          }}
          {...props}
        />
        <TextField
          fullWidth
          required
          id="email"
          name="email"
          label="E-Mail"
          type="email"
          variant="outlined"
          size="small"
          value={values?.email}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 255,
            minLength: 3,
          }}
          {...props}
        />
        <TextField
          fullWidth
          required
          id="address"
          name="address"
          label="Dirección"
          variant="outlined"
          size="small"
          multiline
          value={values?.address}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 255,
          }}
          {...props}
        />

        <TextField
          fullWidth
          id="description"
          name="description"
          label="Descripción"
          variant="outlined"
          size="small"
          multiline
          maxRows={3}
          value={values?.description}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 255,
          }}
          {...props}
        />
        {jobsOpitons && jobsOpitons.length && (
          <>
            <SelectField
              required
              id={"jobName"}
              name={"jobName"}
              label={"Trabajo"}
              size="small"
              defaultValue={defaultJob}
              options={jobsOpitons}
              {...inputProps}
              {...props}
            />
          </>
        )}
        {role === UserType.ADMIN && (
          <SelectBox
            className="customercard__type"
            name={"type"}
            options={{
              [CustomerType.CUSTOMER]: "Normal",
              [CustomerType.VENDOR]: "Proveedor",
            }}
            label={"Tipo"}
            size="small"
            defaultValue={values?.type ?? CustomerType.CUSTOMER}
            {...inputProps}
            {...props}
          />
        )}
      </Box>
    </StyledPaper>
  );
}
