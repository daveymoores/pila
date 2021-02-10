import { Main } from "grommet";
import React from "react";

import Doormat from "../doormat/Doormat";
import Footer from "../footer/Footer";
import Navigation from "../navigation/Navigation";

interface ScaffoldProps {
  children: React.ReactElement;
}

const Scaffold: React.FC<ScaffoldProps> = ({ children }) => (
  <React.Fragment>
    <Navigation />
    <Main>{children}</Main>
    <Doormat />
    <Footer />
  </React.Fragment>
);

export default Scaffold;
