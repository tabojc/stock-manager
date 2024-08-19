import { fetchBase } from "@/utils/fetchBase";

const pathURL = "transactions";

export const fetchGetTransactions = (params) => {
  const { page } = params;
  const param = page ? params : {};

  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: param,
  });
};

export const fetchCreateTransaction = (data) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchUpdateTransaction = ({ id, data }) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "PUT" },
    params: { id },
  });
};

export const fetchDeleteTransaction = (params) => {
  return fetchBase({
    path: pathURL,
    options: { method: "DELETE" },
    params,
  });
};

export const fetchGetTransaction = ({ id }) => {
  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: { id },
  });
};

export const fetchFilterTransactions = (params) => {
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
