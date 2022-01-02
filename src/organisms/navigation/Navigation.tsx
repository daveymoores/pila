import { LazyMotion, m as framerMotion } from "framer-motion";
import { Box, BoxProps, Header, Image, Menu, Nav } from "grommet";
import Hamburger from "hamburger-react";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import { AuthContext, useAuth } from "../../../lib/auth";
import PageType from "../../../types/PageTypes";
import RepeatableLink from "../../../types/RepeatableLink";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import Logo from "../../atoms/logo/Logo";
import {
  MobileOnly,
  TabletUp,
} from "../../atoms/responsive-helpers/ResponsiveHelpers";
import TextLink from "../../atoms/text-link/TextLink";
import OffCanvasContext from "../../context/OffCanvasContext";
import useLinkResolver from "../../hooks/useLinkResolver";
import Section from "../../layout/section/Section";
import { colorPalette, fontWeights } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export enum NavigationTheme {
  LIGHT,
  DARK,
}

interface NavigationSlice {
  items: RepeatableLink[];
  primary: {
    navigationItemLabel: string;
  };
}

export interface NavigationProps {
  signedOutMenuItems: NavigationSlice[];
  signedInMenuItems: NavigationSlice[];
}

const darkThemePages = (route: string) =>
  route === "/" || new RegExp("account|sessions").test(route);

const Navigation: React.FC<NavigationProps> = ({
  signedOutMenuItems,
  signedInMenuItems,
}) => {
  const { auth, loading, signOut, signInWithEmailAndPassword } = useAuth();
  const { isOpen, setIsOpen } = React.useContext(OffCanvasContext);
  const router = useRouter();

  const theme = darkThemePages(router.pathname)
    ? NavigationTheme.DARK
    : NavigationTheme.LIGHT;

  React.useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [router.asPath]);

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

  const signedOutRoutedMenuLinks = signedOutMenuItems.map((navigationItem) => ({
    ...navigationItem,
    items: navigationItem.items.map((item) => {
      const href = useLinkResolver(item.link);
      return {
        ...item,
        href: useLinkResolver(item.link),
        onClick: (event: SyntheticEvent) => {
          event.preventDefault();
          router.push(href);
        },
      };
    }),
  }));

  const signedInRoutedMenuLinks = signedInMenuItems.map((navigationItem) => ({
    ...navigationItem,
    items: navigationItem.items.map((item) => {
      const href = useLinkResolver(item.link);
      return {
        ...item,
        href: useLinkResolver(item.link),
        onClick: (event: SyntheticEvent) => {
          event.preventDefault();
          router.push(href);
        },
      };
    }),
  }));

  const routedMenuItems = !isEmpty(auth)
    ? signedOutRoutedMenuLinks
    : signedInRoutedMenuLinks;

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
                      loading={loading}
                      auth={auth}
                      signOut={signOut}
                      theme={NavigationTheme.DARK}
                      signInWithEmailAndPassword={signInWithEmailAndPassword}
                    />
                  </Box>

                  <Box
                    as={"ul"}
                    pad={{ horizontal: "xlarge", bottom: "xlarge" }}
                  >
                    {routedMenuItems.map(({ items, primary }, index) => (
                      <React.Fragment key={index}>
                        <Divider as={"li"}>
                          <Box
                            as={"span"}
                            margin={{ top: "large", bottom: "medium" }}
                          >
                            {primary.navigationItemLabel}
                          </Box>
                        </Divider>
                        {items &&
                          items.map(({ label, link }, index) => (
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
                      </React.Fragment>
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
                    {routedMenuItems.map(({ items, primary }, index) => (
                      <StyledMenu
                        key={index}
                        label={primary.navigationItemLabel}
                        items={items}
                      />
                    ))}
                  </Box>
                  <AuthButtons
                    auth={auth}
                    signOut={signOut}
                    theme={theme}
                    loading={loading}
                    signInWithEmailAndPassword={signInWithEmailAndPassword}
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
  extends Pick<
    AuthContext,
    "auth" | "signInWithEmailAndPassword" | "signOut" | "loading"
  > {
  theme: NavigationTheme;
}

const AuthButtons: React.FC<AuthButtonProps> = ({
  auth,
  signOut,
  theme,
  signInWithEmailAndPassword,
}) => {
  const router = useRouter();
  const authLinks = [
    {
      label: "Sessions",
      type: PageType.SESSIONS,
      href: `/account/sessions`,
      onClick: (event: SyntheticEvent) => {
        event.preventDefault();
        router.push(`/account/sessions`);
      },
    },
    {
      label: "Profile",
      type: PageType.ACCOUNT,
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
  ];

  const mobileAuthLinks: RepeatableLink[] = authLinks.map((link) => ({
    label: link.label,
    link: {
      type: link.type,
      link_type: "Document",
    },
    onClick: link.onClick,
  }));

  let accessCode = "";

  return (
    <Box direction={isEmpty(auth) ? "column" : "row"} align={"center"}>
      <TabletUp>
        {auth && <StyledMenu label={auth.name} items={authLinks} />}
      </TabletUp>
      {isEmpty(auth) ? (
        <span>
          <StyledInput
            placeholder="Enter Access Code"
            onChange={(event) => (accessCode = event.target.value)}
          />
          <Button
            primary
            size={ButtonSizes.small}
            color={
              theme === NavigationTheme.LIGHT
                ? colorPalette.blue
                : colorPalette.periwinkleCrayola
            }
            label={"Access Modules"}
            onClick={(event) => {
              event.preventDefault();

              signInWithEmailAndPassword(
                "demoaccount@pilaproject.org",
                accessCode
              );
            }}
            link={{
              type: PageType.SESSIONS,
            }}
          />
        </span>
      ) : (
        <Box>
          <Box
            width={{ min: "40px", max: "40px" }}
            height={{ min: "40px", max: "40px" }}
            round={"50%"}
            overflow={"hidden"}
          >
            <Image src={auth?.photoUrl || undefined} />
          </Box>
          <MobileOnly>
            <Box as={"ul"}>
              <Divider as={"li"}>
                <Box as={"span"} margin={{ top: "large", bottom: "medium" }}>
                  {auth?.name}
                </Box>
              </Divider>
              {mobileAuthLinks &&
                mobileAuthLinks.map(({ link, label }, index) => (
                  <Box key={index} as={"li"} margin={{ bottom: "medium" }}>
                    <StyledRoutedMobileTextLink
                      key={index}
                      link={link}
                      label={label}
                    />
                  </Box>
                ))}
            </Box>
          </MobileOnly>
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
  z-index: 2;
`;

const StyledLogoBox = styled(Box)`
  min-width: 120px;
  max-width: 120px;
  height: 50px;
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

const StyledRoutedMobileTextLink = styled(TextLink)`
  font-size: 16px;
  font-weight: ${fontWeights.bold};
  color: white;
`;

const StyledInput = styled("input")`
  font-size: 16px;
  padding: 1em;
  border-radius: 1em;
  border: none;
  margin-right: 0.5em;
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
  overflow-y: scroll;
`;

export default Navigation;
