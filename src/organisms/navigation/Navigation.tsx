import { Box, Header, Menu, Nav, ResponsiveContext } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import { useRouter } from "next/router";
import { RichText } from "prismic-reactjs";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import { RoutedTextLink } from "../../../prismic";
import { LearningModule } from "../../../slices/PoweredByResearchSection";
import CustomType from "../../../types/CustomType";
import PageType from "../../../types/PageTypes";
import RepeatableLink from "../../../types/RepeatableLink";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import Logo from "../../atoms/logo/Logo";
import LearningModulesContext from "../../context/LearningModulesContext";
import Section from "../../layout/section/Section";
import { colorPalette } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface NavigationProps {
  links: RepeatableLink[];
  modules_dropdown_label: string;
}

const Navigation: React.FC<NavigationProps> = ({
  links,
  modules_dropdown_label,
}) => {
  const router = useRouter();

  const learningModules: CustomType<LearningModule>[] = React.useContext(
    LearningModulesContext
  );

  const moduleNavigationItems =
    learningModules &&
    learningModules.map((module) => ({
      label: module.data ? RichText.asText(module.data.title) : module.uid,
      href: `/learning-modules/${module.uid}`,
      onClick: (event: SyntheticEvent) => {
        event.preventDefault();
        router.push(`/learning-modules/${module.uid}`);
      },
    }));

  return (
    <StyledHeader background="transparent" height="xsmall">
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
                    items={moduleNavigationItems || []}
                  />
                </Box>
              ) : (
                <Box
                  justify="start"
                  direction="row"
                  gap="medium"
                  align={"center"}
                >
                  <StyledLogoBox onClick={() => router.push(`/`)}>
                    <StyledLogo />
                  </StyledLogoBox>
                  <Nav
                    direction="row"
                    align={"center"}
                    justify={"between"}
                    flex={"grow"}
                  >
                    <Box direction={"row"} align={"center"}>
                      <StyledMenu
                        label={modules_dropdown_label}
                        items={moduleNavigationItems}
                      />
                      {links &&
                        links.map(({ link, label }, index) => (
                          <StyledRoutedTextLink
                            key={index}
                            link={link}
                            label={label}
                          />
                        ))}
                    </Box>
                    <Box direction={"row"} align={"center"}>
                      <StyledRoutedTextLink
                        link={{
                          type: PageType.ACCOUNT,
                        }}
                        label={"login"}
                      />
                      <Button
                        primary
                        margin={{ left: "medium" }}
                        size={ButtonSizes.small}
                        color={colorPalette.blue}
                        label={"sign up"}
                        link={{
                          type: PageType.SESSION,
                        }}
                      />
                    </Box>
                  </Nav>
                </Box>
              )
            }
          </ResponsiveContext.Consumer>
        </ResponsiveGrid>
      </Section>
    </StyledHeader>
  );
};

const StyledHeader = styled(Header)`
  position: absolute;
  width: 100%;
`;

const StyledLogoBox = styled(Box)`
  width: 110px;
  height: 40px;
  margin-right: 40px;
`;

const StyledLogo = styled(Logo)`
  width: 100%;
`;

const StyledMenu = styled(Menu)`
  font-size: 16px;
  font-weight: bold;
  color: ${colorPalette.dark_blue};

  * {
    font-size: inherit !important;
  }
`;

const StyledRoutedTextLink = styled(RoutedTextLink)`
  font-size: 16px;
  font-weight: bold;
  color: ${colorPalette.dark_blue};
`;

export default Navigation;
