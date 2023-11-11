import React from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";

import useSWR from "swr";

const prepareCountryData = (data) =>
  data
    ?.map((c) => ({
      label: c.name.common,
      value: c.name.common,
    }))
    .sort((a, b) => {
      const labelA = a.label.toUpperCase();
      const labelB = b.label.toUpperCase();
      if (labelA < labelB) {
        return -1;
      }
      if (labelA > labelB) {
        return 1;
      }
      return 0;
    }) || [];

const fetcher = (url) => axios.get(url).then((res) => res.data);

const CountrySelect = ({ error, helperText, ...otherProps }) => {
  const response = useSWR(process.env.COUNTRY_API, fetcher);
  const { data, error: errorMessage, isLoading } = response || {};

  if (!isLoading && errorMessage) {
    return <div>Failed to load the countries...</div>;
  }
  const countryOptions = prepareCountryData(data);

  return (
    <Autocomplete
      disablePortal
      id="country"
      aria-required
      loading={isLoading}
      options={countryOptions}
      sx={{ width: "100%" }}
      {...otherProps}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label="Country"
        />
      )}
    />
  );
};

export default CountrySelect;
