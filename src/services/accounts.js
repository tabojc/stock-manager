import { fetchBase } from "../utils/fetchBase";

const pathURL = "accounts";

export const fetchAccounts = (params = {}) => {
  const { page } = params;
  const param = page ? params : {};

  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: param,
  });
};

export const fetchGetAccountList = () => {
  const currentPathURL = "accounts-list";
  return fetchBase({
    path: currentPathURL,
    options: { method: "GET" },
  });
};

export const fetchCreateAccount = (data) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchUpdateAccount = ({ id, data }) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "PUT" },
    params: { id },
  });
};

export const fetchDeleteAccount = (params) => {
  return fetchBase({
    path: pathURL,
    options: { method: "DELETE" },
    params,
  });
};

export const fetchAccount = ({ id }) => {
  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: { id },
  });
};

export const fetchFilterAccounts = (params) => {
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

export const fetchGetAccountsFromPaymentByOrder = (id) => {
  return fetchBase({
    path: `${pathURL}/disbursement`,
    options: { method: "GET" },
    params: { id },
  });
};

export const fetchGetAccountsFromReceiptByOrder = (id) => {
  return fetchBase({
    path: `${pathURL}/income`,
    options: { method: "GET" },
    params: { id },
  });
};
