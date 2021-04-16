import React from "react";

import NavigationThemeContext from "../context/NavigationThemeContext";
import { NavigationTheme } from "../organisms/navigation/Navigation";

export const useNavigationDarkTheme = () => {
  const { setTheme } = React.useContext(NavigationThemeContext);
  setTheme(NavigationTheme.DARK);
};

export const useNavigationLightTheme = () => {
  const { setTheme } = React.useContext(NavigationThemeContext);
  setTheme(NavigationTheme.LIGHT);
};
