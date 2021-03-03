import { Main } from "grommet";
import React from "react";

import Doormat, { DoormatProps } from "../doormat/Doormat";
import Footer from "../footer/Footer";
import Navigation, { NavigationProps } from "../navigation/Navigation";

interface ScaffoldProps {
  children: React.ReactElement;
  navigation: NavigationProps;
  doormat: DoormatProps;
}

const Scaffold: React.FC<ScaffoldProps> = ({
  children,
  navigation,
  doormat,
}) => (
  <React.Fragment>
    <Navigation {...navigation} />
    <Main>{children}</Main>
    <Doormat {...doormat} />
    <Footer />
  </React.Fragment>
);

export default Scaffold;
