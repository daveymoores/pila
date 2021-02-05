import { Anchor, Box, Header, Menu, ResponsiveContext } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import React from "react";

const Navigation: React.FC = () => (
  <Header background="light-4" pad="medium" height="xsmall">
    <ResponsiveContext.Consumer>
      {(size) =>
        size === "small" ? (
          <Box justify="end">
            <Menu
              a11yTitle="Navigation Menu"
              dropProps={{ align: { top: "bottom", right: "right" } }}
              icon={<MenuIcon color="brand" />}
              items={[
                {
                  label: <Box pad="small">Grommet.io</Box>,
                  href: "https://v2.grommet.io/",
                },
                {
                  label: <Box pad="small">Feedback</Box>,
                  href: "https://github.com/grommet/grommet/issues",
                },
              ]}
            />
          </Box>
        ) : (
          <Box justify="end" direction="row" gap="medium">
            <Anchor href="https://v2.grommet.io/" label="Grommet.io" />
            <Anchor
              href="https://github.com/grommet/grommet/issues"
              label="Feedback"
            />
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  </Header>
);

export default Navigation;
