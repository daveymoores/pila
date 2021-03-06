import { AnimatePresence } from "framer-motion";
import { Box, Heading, ResponsiveContext } from "grommet";
import { Link, RichTextBlock } from "prismic-reactjs";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import KLClient from "../../know-learning-api/knowLearningApiClient";
import getAccountServerSideProps from "../../next/get-server-side-props/account";
import Button, { ButtonSizes } from "../../src/atoms/button/Button";
import DictionaryContext from "../../src/context/DictionaryContext";
import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import SessionCard from "../../src/molecules/session-card/SessionCard";
import AccountLayout from "../../src/organisms/account-layout/AccountLayout";
import { colorPalette } from "../../src/theme/pila";
import PageData from "../../types/PageData";

interface Session {
  id: string;
  name: string;
  participants: string[];
  date: string;
}

interface SessionsPageMainProps {
  name: string;
  greeting: string;
  noSessionsText: RichTextBlock[];
  startSessionLabel: string;
  startSessionLink: Link;
  exploreModulesLabel: string;
  exploreModulesLink: Link;
  viewSessionLink: Link;
}

export type SessionsPageProps = SessionsPageMainProps;

export type SessionPageProps = PageData<unknown, SessionsPageProps> &
  JSX.IntrinsicAttributes;

const parseDate = (dateTime: string) => {
  if (!dateTime) return;
  const date = new Date(dateTime);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const getSessionLink = (link: Link, session: Session): Link => ({
  link_type: "Web",
  target: "_blank",
  url: `${link.url?.replace(/^\/+/, "")}/${session.id}`,
});

const Page: React.FC<SessionPageProps> = (props) => {
  const {
    name,
    greeting,
    noSessionsText,
    startSessionLabel,
    startSessionLink,
    exploreModulesLabel,
    exploreModulesLink,
    viewSessionLink,
  } = props.data;
  const [maxSessions, setMaxSessions] = React.useState(5);
  const [sessions, setSessions] = React.useState<Session[]>();
  const [error, setError] = React.useState<string>();
  const size = React.useContext(ResponsiveContext);
  const { getDictionaryValue } = React.useContext(DictionaryContext);

  const handleLoad = React.useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    setMaxSessions((maxSessions: number) => maxSessions + 5);
  }, []);

  React.useEffect(() => {
    KLClient.watchSessions(
      "abcd34",
      (err: Record<string, unknown>, sessions: Session[]) => {
        if (error) {
          setError(error);
          return;
        }
        setSessions(
          sessions.sort((a, b) => parseInt(a.date) - parseInt(b.date)).reverse()
        );
      }
    );
  }, []);

  const fetching = sessions === undefined;

  const [mostRecentSession, ...restSessions] = sessions || [];

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
        <Box direction={size === "small" ? "column" : "row"}>
          {startSessionLabel && startSessionLink && (
            <Button
              margin={{
                right: size === "small" ? "none" : "small",
                bottom: size === "small" ? "small" : "none",
              }}
              primary
              color={colorPalette.green}
              size={ButtonSizes.large}
              type="button"
              label={startSessionLabel}
              link={startSessionLink}
            />
          )}
          {exploreModulesLabel && exploreModulesLink && (
            <Button
              primary
              color={colorPalette.blue}
              size={ButtonSizes.large}
              type="button"
              label={exploreModulesLabel}
              link={exploreModulesLink}
            />
          )}
        </Box>
        {sessions && (
          <Box margin={{ top: "large" }}>
            <Box>
              <Heading
                level={4}
                size={"small"}
                margin={{ bottom: "medium", top: "large" }}
              >
                {getDictionaryValue("Your current session")}
              </Heading>
              <StyledSessionCard
                title={mostRecentSession.name}
                participants={mostRecentSession.participants.length}
                date={parseDate(mostRecentSession.date)}
                sessionLink={getSessionLink(viewSessionLink, mostRecentSession)}
              />
            </Box>
            <Box>
              <Heading
                level={4}
                size={"small"}
                margin={{ bottom: "medium", top: "large" }}
              >
                {getDictionaryValue("Your most recent session")}
              </Heading>
              <StyledSessionCard
                title={mostRecentSession.name}
                participants={mostRecentSession.participants.length}
                date={parseDate(mostRecentSession.date)}
                sessionLink={getSessionLink(viewSessionLink, mostRecentSession)}
              />
            </Box>
            <Box>
              <Heading
                level={4}
                size={"small"}
                margin={{ bottom: "medium", top: "large" }}
              >
                {getDictionaryValue("Your past sessions")}
              </Heading>
              <AnimatePresence>
                {restSessions.map((session, index) => {
                  if (index <= maxSessions - 1) {
                    return (
                      <SessionCard
                        key={index}
                        title={session.name}
                        participants={session.participants.length}
                        date={parseDate(session.date)}
                        sessionLink={getSessionLink(
                          viewSessionLink,
                          mostRecentSession
                        )}
                      />
                    );
                  }
                })}
              </AnimatePresence>
            </Box>
            {restSessions.length > maxSessions && (
              <Button
                primary
                color={colorPalette.blue}
                size={ButtonSizes.large}
                type="button"
                label={"load more sessions"}
                onClick={handleLoad}
              />
            )}
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
