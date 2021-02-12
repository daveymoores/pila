import { Grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import React from "react";

import pila from "../pila";

const customBreakpoints = deepMerge(pila, {
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
});

interface PilaTheme {
  children: React.ReactElement;
}

const PilaTheme: React.FC<PilaTheme> = ({ children }) => {
  return (
    // TODO - find out why typescript doesn't like some of these theme values
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Grommet theme={customBreakpoints}>{children}</Grommet>
  );
};

export default PilaTheme;