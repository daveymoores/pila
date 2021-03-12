import { Main } from "grommet";
import React from "react";

import PilaTheme from "../../src/theme/PilaTheme/PilaTheme";

interface PilaThemeScaffoldProps {
  children: React.ReactElement;
}

const WithPilaTheme: React.FC<PilaThemeScaffoldProps> = ({ children }) => (
  <PilaTheme>
    <Main overflow={"visible"}>{children}</Main>
  </PilaTheme>
);

export default WithPilaTheme;
