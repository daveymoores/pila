import isEmpty from "lodash/isEmpty";
import React, { Dispatch, SetStateAction } from "react";

import CustomType from "../../types/CustomType";
import { NotificationProps } from "../molecules/notification/Notification";

interface NotificationContextProps {
  notificationProps: NotificationProps;
  setNotificationProps: Dispatch<SetStateAction<NotificationProps>>;
}

const NotificationContext = React.createContext<NotificationContextProps>({
  notificationProps: {},
  setNotificationProps: () => null,
});

export const NotificationProvider: React.FC<{
  notifications: CustomType<NotificationProps>[];
}> = ({ children, notifications }) => {
  const [
    notificationProps,
    setNotificationProps,
  ] = React.useState<NotificationProps>({});

  const globalNotification =
    notifications.find(
      (notification: CustomType<NotificationProps>) =>
        notification.data?.showGlobal
    )?.data || {};

  return (
    <NotificationContext.Provider
      value={{
        notificationProps: isEmpty(globalNotification)
          ? notificationProps
          : globalNotification,
        setNotificationProps: setNotificationProps,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
