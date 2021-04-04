import React, { Dispatch, SetStateAction } from "react";

import { NotificationProps } from "../molecules/notification/Notification";

interface NotificationContextProps {
  notificationProps: NotificationProps;
  setNotificationProps: Dispatch<SetStateAction<NotificationProps>>;
}

const NotificationContext = React.createContext<NotificationContextProps>({
  notificationProps: {},
  setNotificationProps: () => null,
});

export default NotificationContext;
