import { Heading } from "grommet";
import React from "react";

import { useNavigationDarkTheme } from "../../src/hooks/useNavigationTheme";
import HeroText from "../../src/organisms/hero-text/HeroText";
import { Theme } from "../../types/Theme";

const Page: React.FC = () => {
  useNavigationDarkTheme();

  return (
    <HeroText
      title={
        <Heading
          textAlign={"start"}
          level={"1"}
          alignSelf={"stretch"}
          size="small"
          responsive={false}
          color={"dark"}
          margin={{ top: "medium", bottom: "medium" }}
        >
          Hi, Emma Linsenmayer
        </Heading>
      }
      variant={Theme.DARK}
    />
  );
};

export default Page;
