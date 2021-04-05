import React from "react";

import NotificationContext from "../context/NotificationContext";
import { NotificationLinkedProps } from "../molecules/notification/Notification";

const useNotification = (
  notification: NotificationLinkedProps["notification"] | undefined
) => {
  console.log("props", notification);
  const { setNotificationProps } = React.useContext(NotificationContext);

  React.useEffect(() => {
    if (notification?.data && "body" in notification?.data) {
      setNotificationProps(notification?.data);
    }
  }, [notification?.data]);
};

export default useNotification;
