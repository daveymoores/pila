import React from "react";

import { NavigationTheme } from "../organisms/navigation/Navigation";

interface NavigationThemeContextProps {
  theme: NavigationTheme;
  setTheme: (arg: NavigationTheme) => void;
}

const NavigationThemeContext = React.createContext<NavigationThemeContextProps>(
  {
    theme: NavigationTheme.LIGHT,
    setTheme: () => null,
  }
);

export default NavigationThemeContext;
