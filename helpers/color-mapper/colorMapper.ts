const colorMapper = (color: string): string => {
  const colorMapper: { [key: string]: string } = {
    white: "light",
    grey: "light-2",
    dark_blue: "dark",
  };

  return colorMapper[color];
};

export default colorMapper;
