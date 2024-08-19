import { fetchBase } from "../utils/fetchBase";

const pathURL = "rates";
const dailyRates = "daily-rates";

export const fetchRates = (params) => {
  const { page } = params;
  const param = page ? params : {};

  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: param,
  });
};

export const fetchCreateRate = (data) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchUpdateRate = ({ id, data }) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "PUT" },
    params: { id },
  });
};

export const fetchDeleteRates = (params) => {
  return fetchBase({
    path: pathURL,
    options: { method: "DELETE" },
    params,
  });
};

export const fetchFilterRates = (params) => {
  let filterdParams = {};
  Object.keys(params).forEach((key) => {
    if (params[key]) filterdParams = { ...filterdParams, [key]: params[key] };
  });
  const { search, ...rest } = filterdParams;

  return fetchBase({
    path: `${pathURL}/search/${search}`,
    options: { method: "GET" },
    params: rest,
  });
};

export const fetchGetRatesFromCurrentDay = () => {
  return fetchBase({
    path: dailyRates,
    options: { method: "GET" },
  });
};

export const fetchGetRateFromToday = () => {
  return fetchBase({
    path: `daily-rates`,
    options: { method: "GET" },
  });
};
