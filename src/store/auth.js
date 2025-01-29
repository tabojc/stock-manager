import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchLogin, fetchLogout, fetchProfile } from "@/services/auth";
import { getResponseError } from "@/utils/getResponseError";
import { FETCH_LOGIN, FETCH_LOGOUT } from "@/utils/constants";

const mapAuthToRequestJson = (auth) => {
  return auth.map((data) => ({
    email: data?.username,
    password: data?.password,
  }));
};

export const useAuthStore = create(
  persist(
    (set, get) => {
      return {
        username: "",
        accessToken: "",
        role: "customer",
        isAuth: false,
        error: {
          message: "",
          code: "",
        },

        login: async ({ username, password }) => {
          const [data] = mapAuthToRequestJson([
            {
              username,
              password,
            },
          ]);

          try {
            const response = await fetchLogin(data);

            const { access_token: accessToken} = response;

            if (accessToken) {
              set(
                {
                  username: username,
                  accessToken: accessToken,
                  isAuth: true,
                  error: {
                    message: "",
                    code: "",
                  },
                },
                false,
                FETCH_LOGIN
              );
            } else {
              const err = await getResponseError(response);
              console({error});
              set(
                {
                  error: err,
                  accessToken: "",
                  username: "",
                  role: "",
                  isAuth: false,
                },
                false,
                FETCH_LOGIN
              );
            }
          } catch (err) {
            console.error(err);
            set(
              {
                error: {
                  message: err,
                  code: "500",
                },
                accessToken: "",
                username: "",
                role: "",
              },
              false,
              FETCH_LOGIN
            );
          }
        },

        logout: async () => {
          const { accessToken } = get();

          try {
            const response = await fetchLogout();

            const { message } = response;

            if (message && accessToken) {
              set(
                {
                  username: "",
                  accessToken: "",
                  role: "",
                  isAuth: false,
                  error: {
                    message: "",
                    code: "",
                  },
                },
                false,
                FETCH_LOGOUT
              );
            } else {
              const err = await getResponseError(response);
              set({ error: err }, false, FETCH_LOGOUT);
            }
          } catch (err) {
            console.error(err);
            set(
              {
                error: {
                  message: err,
                  code: "500",
                },
              },
              false,
              FETCH_LOGOUT
            );
          }
        },

        removeAuth: () => {
          const isAuth = get().isAuth;
          if (isAuth) {
            set({ isAuth: !isAuth, accessToken: "" }, false, "REMOVE_AUTH");
          } else {
            set({ error: "Error Auth" }, false, "REMOVE_AUTH");
          }
        },

        getProfile: async () => {
          const accessToken = get().accessToken;

          const response = await fetchProfile();

          const { role } = response;
          if (role) {
            set({ role }, false, "PROFILE_AUTH");
          } else {
            set({ error: "Error Auth", role: "" }, false, "PROFILE_AUTH");
          }
        },
      };
    },
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
