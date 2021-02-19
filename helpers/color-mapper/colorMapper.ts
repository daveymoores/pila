import { colorPalette } from "../../src/theme/pila";

const colorMapper = (color: string): string => {
  const colorMapper: { [key: string]: string } = {
    white: "light",
    grey: "light-2",
    dark_blue: colorPalette.dark_blue,
  };

  return colorMapper[color];
};

export default colorMapper;
