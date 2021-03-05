import { Anchor, Box, Header, Menu, Nav, ResponsiveContext } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import React from "react";
import styled from "styled-components";

import { CustomLink, RoutedTextLink } from "../../../prismic";
import RepeatableLink from "../../../types/RepeatableLink";
import Logo from "../../atoms/logo/Logo";
import Section from "../../layout/section/Section";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface NavigationProps {
  links: RepeatableLink[];
  modules_dropdown_label: string;
}

const Navigation: React.FC<NavigationProps> = ({
  links,
  modules_dropdown_label,
}) => (
  <StyledHeader
    background="transparent"
    pad="medium"
    height="xsmall"
    margin={{ top: "large" }}
  >
    <Section>
      <ResponsiveGrid rows="1" columns={"1"}>
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
              <Box justify="start" direction="row" gap="medium">
                <StyledLogoBox>
                  <StyledLogo />
                </StyledLogoBox>
                <Nav direction="row" pad="medium">
                  {links &&
                    links.map(({ link, label }, index) => (
                      <RoutedTextLink key={index} link={link} label={label} />
                    ))}
                </Nav>
              </Box>
            )
          }
        </ResponsiveContext.Consumer>
      </ResponsiveGrid>
    </Section>
  </StyledHeader>
);

const StyledHeader = styled(Header)`
  position: absolute;
  width: 100%;
`;

const StyledLogoBox = styled(Box)`
  width: 110px;
  height: 40px;
`;

const StyledLogo = styled(Logo)`
  width: 100%;
`;

export default Navigation;
