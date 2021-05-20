import React from "react";

import CustomType from "../../types/CustomType";
import DictionaryContext from "./DictionaryContext";

interface DictionaryValue {
  key: string;
  value: string;
}

export interface DictionaryProps {
  values: DictionaryValue[];
}

interface DictionaryContextProps {
  getDictionaryValue: (arg: string) => string | null;
}

const NavigationThemeContext = React.createContext<DictionaryContextProps>({
  getDictionaryValue: () => null,
});

const getPlaceholderValue = (key: string) =>
  key
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    .replace(/ /g, "_")
    .toUpperCase();

export const DictionaryProvider: React.FC<{
  dictionaryValues: CustomType<DictionaryProps>[];
}> = ({ children, dictionaryValues }) => {
  const values = dictionaryValues[0]?.data?.values || [];

  const getDictionaryValue = (key: string) =>
    (values.length &&
      values.filter(
        (dictionaryValue: DictionaryValue) =>
          dictionaryValue.key.toLowerCase() === key.toLowerCase()
      )[0]?.value) ||
    `[${getPlaceholderValue(key)}]`;

  return (
    <DictionaryContext.Provider value={{ getDictionaryValue }}>
      {children}
    </DictionaryContext.Provider>
  );
};

export default NavigationThemeContext;
