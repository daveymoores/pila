import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import { useRouter } from "next/router";
import React from "react";

import CustomType from "../../types/CustomType";
import { NotificationProps } from "../molecules/notification/Notification";

interface NotificationContextProps {
  notificationProps: NotificationProps;
}

const NotificationContext = React.createContext<NotificationContextProps>({
  notificationProps: {},
});

export const NotificationProvider: React.FC<{
  notifications: CustomType<NotificationProps>[];
}> = ({ children, notifications }) => {
  const route = useRouter();

  const routeTypes: (string | string[] | undefined)[] = Object.values(
    route.query
  );

  const routeNotification = notifications.filter((notification) => {
    const url = notification.data?.document?.url;
    if (!url) return;

    const urlPaths = url.split("/").filter((path) => path);
    return route.asPath.includes(url) && isEqual(urlPaths, routeTypes);
  });

  const globalNotification =
    notifications.find(
      (notification: CustomType<NotificationProps>) =>
        notification.data?.showGlobal
    )?.data || {};

  return (
    <NotificationContext.Provider
      value={{
        notificationProps: isEmpty(globalNotification)
          ? routeNotification[0]?.data || {}
          : globalNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
