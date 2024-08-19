import { fetchBase } from "../utils/fetchBase";

const pathURL = "balances";

export const fetchGetBalance = () => {
  return fetchBase({
    path: pathURL,
  });
};

export const fetchGenerateBalance = () => {
  return fetchBase({
    path: "balances-calculate",
    options: { method: "GET" },
  });
};
