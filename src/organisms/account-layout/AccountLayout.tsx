import { Box, Heading } from "grommet";
import React from "react";

import { Theme } from "../../../types/Theme";
import Section from "../../layout/section/Section";
import HeroText from "../hero-text/HeroText";

const columns = {
  small: Array(4).fill("flex"),
  medium: Array(8).fill("flex"),
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const areas = {
  small: [
    { name: "menu", start: [0, 0], end: [3, 0] },
    { name: "content", start: [0, 1], end: [3, 1] },
  ],
  medium: [
    { name: "menu", start: [0, 0], end: [3, 0] },
    { name: "content", start: [0, 1], end: [7, 1] },
  ],
  large: [
    { name: "menu", start: [0, 0], end: [2, 0] },
    { name: "content", start: [3, 0], end: [11, 0] },
  ],
  xlarge: [
    { name: "menu", start: [0, 0], end: [2, 0] },
    { name: "content", start: [3, 0], end: [11, 0] },
  ],
};

interface AccountLayoutProps {
  greeting: string;
  title: string;
  error?: string;
  loading: boolean;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  greeting,
  children,
}) => {
  return (
    <React.Fragment>
      <HeroText
        title={
          <Heading
            textAlign={"start"}
            level={"1"}
            alignSelf={"stretch"}
            size="small"
            color={"dark"}
            margin={{ top: "medium" }}
          >
            {greeting}
          </Heading>
        }
        variant={Theme.DARK}
      />
      <Box width={"100%"} background={"light-1"}>
        <Section>
          <React.Fragment>{children}</React.Fragment>
        </Section>
      </Box>
    </React.Fragment>
  );
};

export default AccountLayout;
