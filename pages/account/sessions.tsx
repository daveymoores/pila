import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Layer,
  Paragraph,
  Spinner,
} from "grommet";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import Prismic from "prismic-javascript";
import { RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import KLClient from "../../know-learning-api/knowLearningApiClient";
import firebaseAdmin from "../../lib/firebase-admin";
import { Client } from "../../prismic";
import Button, { ButtonSizes } from "../../src/atoms/button/Button";
import TextLink from "../../src/atoms/text-link/TextLink";
import useNotification from "../../src/hooks/useNotification";
import Section from "../../src/layout/section/Section";
import { NotificationLinkedProps } from "../../src/molecules/notification/Notification";
import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import SessionCard from "../../src/molecules/session-card/SessionCard";
import HeroText from "../../src/organisms/hero-text/HeroText";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../src/theme/pila";
import CustomType from "../../types/CustomType";
import PageData from "../../types/PageData";
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

interface Session {
  name: string;
  participants: string[];
  date: string;
}

interface SessionsPageMainProps {
  name: string;
  greeting: string;
  noSessionsText: RichTextBlock[];
}

type SessionsPageProps = SessionsPageMainProps & NotificationLinkedProps;

type PageProps = PageData<unknown, SessionsPageProps> & JSX.IntrinsicAttributes;

const parseDate = (dateTime: string) => {
  if (!dateTime) return;
  const date = new Date(dateTime);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const Page: React.FC<PageProps> = (props) => {
  const { name, greeting, noSessionsText, notification } = props.data;
  const [sessions, setSessions] = React.useState<Session[]>();
  const [error, setError] = React.useState<Session[]>();

  useNotification(notification);

  const onClose = () => location.reload();

  React.useEffect(() => {
    KLClient.watchSessions(
      "abcd34",
      (err: Record<string, unknown>, sessions: Session[]) => {
        if (error) {
          setError(error);
          return;
        }
        setSessions(sessions);
      }
    );
  }, []);

  const fetching = sessions === undefined;

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
            {`${greeting} ${name}`}
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
            <React.Fragment>
              {error && (
                <Layer
                  onClickOutside={onClose}
                  onEsc={onClose}
                  background={"transparent"}
                >
                  <Card
                    background={"brand"}
                    align="center"
                    justify="center"
                    gap="small"
                    alignSelf="center"
                    pad="large"
                    width={{ min: "400px" }}
                  >
                    <Paragraph>error</Paragraph>
                    <Button
                      label="Close"
                      margin={{ top: "medium" }}
                      color={colorPalette.green}
                      onClick={onClose}
                    />
                  </Card>
                </Layer>
              )}
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
                          weight={500}
                          label={"Sessions"}
                          link={{
                            type: PageType.SESSIONS,
                          }}
                        />
                      </Box>
                      <Box as={"li"}>
                        <StyledTextLink
                          weight={500}
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
                {fetching ? (
                  <Box
                    height={{ min: "300px" }}
                    align={"center"}
                    justify={"center"}
                  >
                    <Spinner />
                  </Box>
                ) : (
                  <React.Fragment>
                    {!sessions && noSessionsText && (
                      <Box margin={{ vertical: "large" }}>
                        <RichTextParser body={noSessionsText} />
                      </Box>
                    )}
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
                    {sessions && (
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
                          {sessions.map((session, index) => (
                            <SessionCard
                              key={index}
                              title={session.name}
                              participants={session.participants.length}
                              date={parseDate(session.date)}
                              dashboardLink={{ url: "" }}
                              moduleLink={{ url: "" }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </React.Fragment>
                )}
              </Box>
            </React.Fragment>
          </ResponsiveGrid>
        </Section>
      </Box>
    </React.Fragment>
  );
};

interface Response extends Omit<ApiSearchResponse, "results"> {
  results: CustomType<SessionsPageProps>[];
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const client = Client();
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    let data;

    const { name } = token;

    try {
      data =
        (((await client.query(
          Prismic.Predicates.at("document.type", "sessions"),
          { fetchLinks: ["notification.body, notification.showGlobal"] }
        )) as unknown) as Response) || {};
    } catch (err) {
      throw new Error(err);
    }

    return {
      props: {
        data: {
          name,
          ...data.results[0].data,
        },
      },
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();

    return { props: {} as never };
  }
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
