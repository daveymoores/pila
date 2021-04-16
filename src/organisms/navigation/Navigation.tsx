import { motion } from "framer-motion";
import { Box, BoxProps, Header, Menu, Nav, ResponsiveContext } from "grommet";
import Hamburger from "hamburger-react";
import { useRouter } from "next/router";
import { RichText } from "prismic-reactjs";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import { LearningModuleProps } from "../../../pages/learning-modules/[learning_module]";
import { RoutedTextLink } from "../../../prismic";
import CustomType from "../../../types/CustomType";
import PageType from "../../../types/PageTypes";
import RepeatableLink from "../../../types/RepeatableLink";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import Logo from "../../atoms/logo/Logo";
import LearningModulesContext from "../../context/LearningModulesContext";
import NavigationThemeContext from "../../context/NavigationThemeContext";
import OffCanvasContext from "../../context/OffCanvasContext";
import Section from "../../layout/section/Section";
import { colorPalette, fontWeights } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export enum NavigationTheme {
  LIGHT,
  DARK,
}

export interface NavigationProps {
  links: RepeatableLink[];
  modules_dropdown_label: string;
}

const Navigation: React.FC<NavigationProps> = ({
  links,
  modules_dropdown_label,
}) => {
  const { isOpen, setIsOpen } = React.useContext(OffCanvasContext);
  const { theme } = React.useContext(NavigationThemeContext);
  const router = useRouter();

  React.useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [router.asPath]);

  const learningModules: CustomType<LearningModuleProps>[] = React.useContext(
    LearningModulesContext
  );

  const moduleNavigationItems =
    learningModules &&
    learningModules.map((module) => ({
      label: module.data?.title
        ? RichText.asText(module.data.title)
        : module.uid,
      href: `/learning-modules/${module.uid}`,
      onClick: (event: SyntheticEvent) => {
        event.preventDefault();
        router.push(`/learning-modules/${module.uid}`);
      },
    }));

  const mobileModuleLinks: RepeatableLink[] =
    learningModules &&
    learningModules.map((module) => ({
      label: module.data?.title
        ? RichText.asText(module.data.title)
        : module.uid,
      link: {
        type: PageType.LEARNING_MODULE,
        link_type: "Document",
        uid: module.uid,
      },
    }));

  const variants = {
    initial: {
      x: "-100%",
    },
    active: {
      x: "0",
    },
    inactive: {
      x: "-100%",
    },
  };

  const spring = {
    type: "spring",
    damping: 100,
    stiffness: 2000,
  };

  return (
    <StyledHeader
      height="xsmall"
      style={
        {
          "--nav-theme": `${
            theme === NavigationTheme.LIGHT ? colorPalette.dark_blue : "white"
          }`,
        } as React.CSSProperties
      }
    >
      <Section>
        <ResponsiveGrid rows="1" columns={"1"}>
          <ResponsiveContext.Consumer>
            {(size) =>
              size === "small" ? (
                <Box justify="start" direction={"row"}>
                  <StyledLogoBox onClick={() => router.push(`/`)}>
                    <StyledLogo />
                  </StyledLogoBox>
                  <Box
                    margin={{ left: "auto" }}
                    background={
                      isOpen ? colorPalette.blue : colorPalette.yellow
                    }
                    round={"50%"}
                    style={{
                      position: "relative",
                      zIndex: 3,
                    }}
                  >
                    <Hamburger
                      rounded={true}
                      size={24}
                      color={isOpen ? "white" : colorPalette.dark_blue}
                      label="Show menu"
                      toggled={isOpen}
                      toggle={setIsOpen}
                    />
                  </Box>
                  <MobileNavigation
                    initial={"initial"}
                    variants={variants}
                    transition={spring}
                    animate={isOpen ? "active" : "inactive"}
                  >
                    <Box direction={"row"} align={"center"} pad={"xlarge"}>
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
                        color={colorPalette.periwinkleCrayola}
                        label={"sign up"}
                        link={{
                          type: PageType.SESSION,
                        }}
                      />
                    </Box>
                    <Box as={"ul"} pad={"xlarge"}>
                      {links &&
                        links.map(({ label, link }, index) => (
                          <Box
                            key={index}
                            as={"li"}
                            margin={{ bottom: "medium" }}
                          >
                            <StyledRoutedMobileTextLink
                              key={index}
                              link={link}
                              label={label}
                            />
                          </Box>
                        ))}
                      <Divider as={"li"}>
                        <Box
                          as={"span"}
                          margin={{ top: "large", bottom: "medium" }}
                        >
                          Modules
                        </Box>
                      </Divider>
                      {mobileModuleLinks &&
                        mobileModuleLinks.map(({ label, link }, index) => (
                          <Box
                            key={index}
                            as={"li"}
                            margin={{ bottom: "medium" }}
                          >
                            <StyledRoutedMobileTextLink
                              key={index}
                              link={link}
                              label={label}
                            />
                          </Box>
                        ))}
                    </Box>
                  </MobileNavigation>
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
                        color={
                          theme === NavigationTheme.LIGHT
                            ? colorPalette.blue
                            : colorPalette.periwinkleCrayola
                        }
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

const Divider = styled(Box)<BoxProps>`
  color: ${colorPalette.grey};
  font-size: 16px;
  font-weight: ${fontWeights.bold};
`;

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
  font-weight: ${fontWeights.bold};
  color: var(--nav-theme);
  outline: none;

  * {
    font-size: inherit !important;
    stroke: var(--nav-theme);
    fill: var(--nav-theme);
  }
`;

const StyledRoutedTextLink = styled(RoutedTextLink)`
  font-size: 16px;
  font-weight: ${fontWeights.bold};
  color: var(--nav-theme);
`;

const StyledRoutedMobileTextLink = styled(RoutedTextLink)`
  font-size: 16px;
  font-weight: ${fontWeights.bold};
  color: white;
`;

const MobileNavigation = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - (4vw + 24px));
  transform: translate3d(-100%, 0, 0);
  height: 100%;
  background-color: ${colorPalette.dark_blue};
  z-index: 2;
`;

export default Navigation;
