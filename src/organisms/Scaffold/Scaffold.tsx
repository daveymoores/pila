import { Main } from "grommet";
import React from "react";

import Doormat from "../Doormat/Doormat";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

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
