import { Main } from "grommet";
import isEmpty from "lodash/isEmpty";
import React from "react";

import NotificationContext from "../../context/NotificationContext";
import Notification from "../../molecules/notification/Notification";
import Doormat, { DoormatProps } from "../doormat/Doormat";
import Footer, { FooterProps } from "../footer/Footer";
import Navigation, { NavigationProps } from "../navigation/Navigation";

interface ScaffoldProps {
  children: React.ReactElement;
  navigation: NavigationProps;
  doormat: DoormatProps;
  footer: FooterProps;
}

const Scaffold: React.FC<ScaffoldProps> = ({
  children,
  navigation,
  doormat,
  footer,
}) => {
  const { notificationProps } = React.useContext(NotificationContext);

  return (
    <React.Fragment>
      {!isEmpty(notificationProps) && <Notification {...notificationProps} />}
      <Navigation {...navigation} />
      <Main>{children}</Main>
      <Doormat {...doormat} />
      <Footer {...footer} />
    </React.Fragment>
  );
};

export default Scaffold;
