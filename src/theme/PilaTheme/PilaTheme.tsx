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
  children: React.ReactNode;
  userAgent?: string;
}

const PilaTheme: React.FC<PilaTheme> = ({ children, userAgent }) => {
  return (
    <Grommet
      theme={customBreakpoints}
      userAgent={process.env.NODE_ENV !== "development" ? userAgent : undefined}
    >
      {children}
    </Grommet>
  );
};

export default PilaTheme;
