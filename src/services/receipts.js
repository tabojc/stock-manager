import { fetchForm } from "@/utils/fetchForm";
import { fetchBase } from "../utils/fetchBase";
import { mapItemsToFormData } from "@/utils/mappers/mapItemsToFormData";

const pathURL = "receipts";

export const fetchReceipts = () => {
  return fetchBase({
    path: pathURL,
  });
};

export const fetchCreateReceipt = (data) => {
  const form = mapItemsToFormData(data);
  return fetchForm({
    data: form,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchGetReceipt = ({ id }) => {
  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: { id },
  });
};

export const fetchGetFilterReceipt = ({ id }) => {
  const pathContext = "operation";
  return fetchBase({
    path: `${pathURL}/${pathContext}`,
    options: { method: "GET" },
    params: { id },
  });
};

export const fetchGetReceiptByFilename = (filename) => {
  return fetchForm({
    path: `${pathURL}/receipt`,
    options: { method: "GET" },
    params: { filename: filename },
  });
};
