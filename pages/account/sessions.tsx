import { Box, Heading } from "grommet";
import { RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import KLClient from "../../know-learning-api/knowLearningApiClient";
import getAccountServerSideProps from "../../next/get-server-side-props/account";
import Button, { ButtonSizes } from "../../src/atoms/button/Button";
import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import SessionCard from "../../src/molecules/session-card/SessionCard";
import AccountLayout from "../../src/organisms/account-layout/AccountLayout";
import { colorPalette } from "../../src/theme/pila";
import PageData from "../../types/PageData";

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

export type SessionsPageProps = SessionsPageMainProps;

export type SessionPageProps = PageData<unknown, SessionsPageProps> &
  JSX.IntrinsicAttributes;

const parseDate = (dateTime: string) => {
  if (!dateTime) return;
  const date = new Date(dateTime);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const Page: React.FC<SessionPageProps> = (props) => {
  const { name, greeting, noSessionsText } = props.data;
  const [sessions, setSessions] = React.useState<Session[]>();
  const [error, setError] = React.useState<string>();

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
    <AccountLayout
      loading={fetching}
      greeting={`${greeting} ${name}`}
      title={"Sessions"}
      error={error}
    >
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
    </AccountLayout>
  );
};

export const getServerSideProps = getAccountServerSideProps;

const StyledSessionCard = styled(SessionCard)`
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
`;

export default Page;
