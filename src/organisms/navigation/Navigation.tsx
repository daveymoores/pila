import { LazyMotion, m as framerMotion } from "framer-motion";
import { Box, BoxProps, Header, Image, Menu, Nav } from "grommet";
import Hamburger from "hamburger-react";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { RichText } from "prismic-reactjs";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import { AuthContext, useAuth } from "../../../lib/auth";
import { LearningModuleProps } from "../../../pages/learning-modules/[learning_module]";
import CustomType from "../../../types/CustomType";
import PageType from "../../../types/PageTypes";
import RepeatableLink from "../../../types/RepeatableLink";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import Logo from "../../atoms/logo/Logo";
import {
  MobileOnly,
  TabletUp,
} from "../../atoms/responsive-helpers/ResponsiveHelpers";
import TextLink from "../../atoms/text-link/TextLink";
import LearningModulesContext from "../../context/LearningModulesContext";
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

// TODO - fix this as other paths can match
const darkThemePages = (route: string) =>
  route === "/" || new RegExp("account|sessions").test(route);

const Navigation: React.FC<NavigationProps> = ({
  links,
  modules_dropdown_label,
}) => {
  const { auth, signOut, signInWithGoogle } = useAuth();
  const { isOpen, setIsOpen } = React.useContext(OffCanvasContext);
  const router = useRouter();

  const theme = darkThemePages(router.pathname)
    ? NavigationTheme.DARK
    : NavigationTheme.LIGHT;

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

  const loadFeatures = () =>
    import("./framer-motion-features").then((res) => res.default);

  return (
    <LazyMotion features={loadFeatures}>
      <StyledHeader
        height="115px"
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
            <MobileOnly>
              <Box justify="start" direction={"row"}>
                <StyledLogoBox onClick={() => router.push(`/`)}>
                  <StyledLogo />
                </StyledLogoBox>
                <Box
                  margin={{ left: "auto" }}
                  background={isOpen ? colorPalette.blue : colorPalette.yellow}
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
                    <AuthButtons
                      auth={auth}
                      signOut={signOut}
                      theme={NavigationTheme.DARK}
                      signInWithGoogle={signInWithGoogle}
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
            </MobileOnly>
            <TabletUp>
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
                        <StyledTextLink key={index} link={link} label={label} />
                      ))}
                  </Box>
                  <AuthButtons
                    auth={auth}
                    signOut={signOut}
                    theme={theme}
                    signInWithGoogle={signInWithGoogle}
                  />
                </Nav>
              </Box>
            </TabletUp>
          </ResponsiveGrid>
        </Section>
      </StyledHeader>
    </LazyMotion>
  );
};

interface AuthButtonProps
  extends Pick<AuthContext, "auth" | "signInWithGoogle" | "signOut"> {
  theme: NavigationTheme;
}

const AuthButtons: React.FC<AuthButtonProps> = ({
  auth,
  signOut,
  theme,
  signInWithGoogle,
}) => {
  const router = useRouter();
  return (
    <Box direction={"row"} align={"center"}>
      {auth && (
        <StyledMenu
          label={`Hi, ${auth.name}`}
          items={[
            {
              label: "Sessions",
              href: `/account/sessions`,
              onClick: (event: SyntheticEvent) => {
                event.preventDefault();
                router.push(`/account/sessions`);
              },
            },
            {
              label: "Account",
              href: `/account`,
              onClick: (event: SyntheticEvent) => {
                event.preventDefault();
                router.push(`/account`);
              },
            },
            {
              label: "sign out",
              href: `/`,
              onClick: (event: SyntheticEvent) => {
                event.preventDefault();
                router.push(`/`);
                signOut();
              },
            },
          ]}
        />
      )}
      {isEmpty(auth) ? (
        <Button
          primary
          size={ButtonSizes.small}
          color={
            theme === NavigationTheme.LIGHT
              ? colorPalette.blue
              : colorPalette.periwinkleCrayola
          }
          label={"sign up"}
          onClick={(event) => {
            event.preventDefault();
            signInWithGoogle();
          }}
          link={{
            type: PageType.SESSIONS,
          }}
        />
      ) : (
        <Box width={"40px"} height={"40px"} round={"50%"} overflow={"hidden"}>
          <Image src={auth?.photoUrl || undefined} />
        </Box>
      )}
    </Box>
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

const StyledTextLink = styled(TextLink)`
  font-size: 16px;
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.color || `var(--nav-theme)`};
`;

const StyledRoutedMobileTextLink = styled(TextLink)`
  font-size: 16px;
  font-weight: ${fontWeights.bold};
  color: white;
`;

const MobileNavigation = styled(framerMotion.div)`
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
