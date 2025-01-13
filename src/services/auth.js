import { fetchBase } from "../utils/fetchBase";

const signIn = "auth/login";
const signOut = "logout";

export const fetchLogout = () => {
  return fetchBase({
    path: signOut,
  });
};

export const fetchLogin = (data) => {
  return fetchBase({
    data,
    path: signIn,
    options: { method: "POST" },
  });
};

export const fetchProfile = () => {
  const profile = "auth/profile";
  return fetchBase({
    path: profile,
    options: { method: "GET" },
  });
}
