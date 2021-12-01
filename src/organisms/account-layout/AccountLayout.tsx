import { Box, Heading } from "grommet";
import React from "react";

import { Theme } from "../../../types/Theme";
import Section from "../../layout/section/Section";
import HeroText from "../hero-text/HeroText";

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
