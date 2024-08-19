import { useEffect } from "react";
import { useUsersStore } from "@/store/users";
import {
  ActionType,
  USER_CREATE_SUCCESSFULLY,
  USER_UPDATE_SUCCESSFULLY,
  USER_DELETE_SUCCESSFULLY,
} from "@/utils/constants";
import { showMessage } from "@/utils/showMessage";
import { useNotificationStore } from "@/store/notifications";

export const useUsersData = (action, params) => {
  const users = useUsersStore((state) => state.users);
  const loading = useUsersStore((state) => state.loading);
  const getUsers = useUsersStore((state) => state.getUsers);
  const getUsersByParam = useUsersStore((state) => state.getUsersByParam);
  const info = useUsersStore((state) => state.info);
  const user = useUsersStore((state) => state.user);
  const createUser = useUsersStore((state) => state.createUser);
  const error = useUsersStore((state) => state.error);
  const deleteUser = useUsersStore((state) => state.deleteUser);
  const updateUser = useUsersStore((state) => state.updateUser);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  useEffect(() => {
    const { search, page } = params;

    if (ActionType.LIST === action)
      if (!search) {
        getUsers(page);
      } else if (search) {
        getUsersByParam(search);
      }
  }, [getUsers, getUsersByParam, action, params]);

  useEffect(() => {
    const refereshMessage = ({
      notificationShow,
      data,
      action,
      error,
      messageTypes,
    }) => {
      return showMessage({
        notificationShow,
        data,
        action,
        error,
        messageTypes,
      });
    };

    refereshMessage({
      notificationShow: notificationShow,
      data: user,
      action,
      error,
      messageTypes: {
        ADD: USER_CREATE_SUCCESSFULLY,
        UPDATE: USER_UPDATE_SUCCESSFULLY,
        DELETE: USER_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, action, user, error]);

  return {
    users,
    loading,
    getUsersByParam,
    info,
    user,
    createUser,
    deleteUser,
    updateUser,
    error,
  };
};
