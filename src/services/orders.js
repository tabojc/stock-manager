import { fetchForm } from "@/utils/fetchForm";
import { fetchBase } from "../utils/fetchBase";
import { mapItemsToFormData } from "@/utils/mappers/mapItemsToFormData";

const pathURL = "operations";

export const fetchOrders = (params) => {
  const { page } = params;
  const param = page ? params : {};

  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: param,
  });
};

export const fetchCreateOrder = (data) => {
  const form = mapItemsToFormData(data);

  return fetchForm({
    data: form,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchUpdateOrder = ({ id, data }) => {
  const form = mapItemsToFormData(data);

  return fetchForm({
    data: form,
    path: pathURL,
    options: { method: "POST" },
    params: { id },
  });
};

export const fetchDeleteOrder = ({ id, description }) => {
  return fetchBase({
    data: { description },
    path: pathURL,
    options: { method: "DELETE" },
    params: { id },
  });
};

export const fetchGetOrder = ({ id }) => {
  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: { id },
  });
};

export const fetchGetOrderReceiptFile = (filename) => {
  return fetchForm({
    path: `${pathURL}/receipt`,
    options: { method: "GET" },
    params: { filename: filename },
  });
};

export const fetchGetOrdersPayable = (params) => {
  const { page } = params;
  const param = page ? params : {};

  return fetchBase({
    path: "dashboard/payable",
    options: { method: "GET" },
    params: param,
  });
};

export const fetchGetOrdersReceivable = (params) => {
  const { page } = params;
  const param = page ? params : {};

  return fetchBase({
    path: "dashboard/receivable",
    options: { method: "GET" },
    params: param,
  });
};

export const fetchGetOrdersStatics = () => {
  return fetchBase({
    path: "dashboard",
  });
};

export const fetchFilterOrders = (params) => {
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
