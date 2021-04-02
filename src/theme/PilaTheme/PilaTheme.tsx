import { Grommet, ThemeType } from "grommet";
import { deepMerge } from "grommet/utils";
import React from "react";

import pila from "../pila";

const customBreakpoints = (deepMerge(pila, {
  global: {
    breakpoints: {
      small: {
        value: 600,
      },
      medium: {
        value: 900,
      },
      large: {
        value: 1400,
      },
    },
  },
}) as unknown) as ThemeType;

interface PilaTheme {
  children: React.ReactElement;
}

const PilaTheme: React.FC<PilaTheme> = ({ children }) => {
  return <Grommet theme={customBreakpoints}>{children}</Grommet>;
};

export default PilaTheme;
