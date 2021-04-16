import React from "react";

import NotificationContext from "../context/NotificationContext";
import { NotificationLinkedProps } from "../molecules/notification/Notification";

const useNotification = (
  notification: NotificationLinkedProps["notification"] | undefined
) => {
  const { setNotificationProps } = React.useContext(NotificationContext);

  React.useEffect(() => {
    setNotificationProps(notification?.data || {});
  }, [notification?.data]);
};

export default useNotification;
