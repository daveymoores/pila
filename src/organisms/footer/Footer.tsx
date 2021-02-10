import { Anchor, Box, Footer as GrommetFooter, Text } from "grommet";
import { FacebookOption, Instagram, Twitter } from "grommet-icons";
import React from "react";

const Social = () => (
  <Box direction="row" gap="xxsmall" justify="center">
    <Anchor
      a11yTitle="Share feedback on Github"
      href="https://www.instagram.com/"
      icon={<Instagram color="brand" />}
    />
    <Anchor
      a11yTitle="Chat with us on Slack"
      href="https://www.facebook.com/"
      icon={<FacebookOption color="brand" />}
    />
    <Anchor
      a11yTitle="Follow us on Twitter"
      href="https://twitter.com/"
      icon={<Twitter color="brand" />}
    />
  </Box>
);

const Footer = () => (
  <GrommetFooter background="light-4" pad="small">
    <Social />
    <Text textAlign="center" size="xsmall">
      ©Copyright
    </Text>
  </GrommetFooter>
);

export default Footer;
