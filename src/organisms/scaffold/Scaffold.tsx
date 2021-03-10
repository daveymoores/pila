import { Main } from "grommet";
import React from "react";

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
}) => (
  <React.Fragment>
    <Navigation {...navigation} />
    <Main>{children}</Main>
    <Doormat {...doormat} />
    <Footer {...footer} />
  </React.Fragment>
);

export default Scaffold;
