import { Box, Card, CardBody, Heading } from "grommet";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import useSWR from "swr";

import fetcher from "../../helpers/fetcher/fetcher";
import { useAuth } from "../../lib/auth";
import Button, { ButtonSizes } from "../../src/atoms/button/Button";
import TextLink from "../../src/atoms/text-link/TextLink";
import Section from "../../src/layout/section/Section";
import SessionCard from "../../src/molecules/session-card/SessionCard";
import HeroText from "../../src/organisms/hero-text/HeroText";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../src/theme/pila";
import PageType from "../../types/PageTypes";
import { Theme } from "../../types/Theme";

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

const Page: React.FC = () => {
  const { auth, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!auth && !loading) {
      router.push("/");
    }
  }, [auth, loading]);

  const { data } = useSWR(auth ? ["/api/user", auth.token] : null, fetcher);

  return (
    <React.Fragment>
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
            {`Hi, ${auth?.name}`}
          </Heading>
        }
        variant={Theme.DARK}
      />
      <Box
        width={"100%"}
        background={"light-1"}
        pad={{
          top: "xlarge",
          bottom: "xlarge",
        }}
      >
        <Section>
          <ResponsiveGrid rows={rows} columns={columns} areas={areas}>
            <Box gridArea={"menu"}>
              <StyledMenuCard
                width={{ max: "240px" }}
                pad={"medium"}
                background={"white"}
              >
                <CardBody>
                  <Box as={"ul"}>
                    <Box margin={{ bottom: "small" }} as={"li"}>
                      <StyledTextLink
                        label={"Sessions"}
                        link={{
                          type: PageType.SESSION,
                        }}
                      />
                    </Box>
                    <Box as={"li"}>
                      <StyledTextLink
                        label={"Profile"}
                        link={{
                          type: PageType.ACCOUNT,
                        }}
                      />
                    </Box>
                  </Box>
                </CardBody>
              </StyledMenuCard>
            </Box>
            <Box gridArea={"content"}>
              <Heading
                textAlign={"start"}
                level={"1"}
                alignSelf={"stretch"}
                size="small"
                responsive={false}
                color={"dark"}
                margin={{ bottom: "medium" }}
              >
                Sessions
              </Heading>
              <Box direction={"row"}>
                <Button
                  margin={{ right: "small" }}
                  primary
                  color={colorPalette.green}
                  size={ButtonSizes.large}
                  type="button"
                  label={"start a new session"}
                  link={{
                    link_type: "Web",
                    url: "http://knowlearning.org",
                  }}
                />
                <Button
                  margin={{ right: "small" }}
                  primary
                  color={colorPalette.blue}
                  size={ButtonSizes.large}
                  type="button"
                  label={"Explore modules"}
                  link={{
                    link_type: "Web",
                    url: "http://knowlearning.org",
                  }}
                />
              </Box>
              <Box margin={{ top: "large" }}>
                <Box>
                  <Heading
                    level={4}
                    size={"small"}
                    margin={{ bottom: "medium", top: "large" }}
                  >
                    Your most recent session
                  </Heading>
                  <StyledSessionCard
                    title={"Karel the dog"}
                    dashboardLink={{ url: "" }}
                    moduleLink={{ url: "" }}
                  />
                </Box>
                <Box>
                  <Heading
                    level={4}
                    size={"small"}
                    margin={{ bottom: "medium", top: "large" }}
                  >
                    Your past sessions
                  </Heading>
                  {Array(9)
                    .fill("Karel the dog")
                    .map((title, index) => (
                      <SessionCard
                        key={index}
                        title={title}
                        dashboardLink={{ url: "" }}
                        moduleLink={{ url: "" }}
                      />
                    ))}
                </Box>
              </Box>
            </Box>
          </ResponsiveGrid>
        </Section>
      </Box>
    </React.Fragment>
  );
};

const StyledMenuCard = styled(Card)`
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
`;

const StyledSessionCard = styled(SessionCard)`
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
`;

const StyledTextLink = styled(TextLink)`
  color: ${colorPalette.dark_blue};
`;

export default Page;
