import { Link, RichTextBlock } from "prismic-reactjs";
import React from "react";

import getAccountServerSideProps from "../../next/get-server-side-props/account";
import AccountLayout from "../../src/organisms/account-layout/AccountLayout";
import PageData from "../../types/PageData";

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

const Page: React.FC<SessionPageProps> = (props) => {
  const { name, greeting } = props.data;

  return (
    <AccountLayout
      loading={false}
      greeting={`${greeting} ${name}`}
      title={"Sessions"}
    >
      <iframe
        height="1000px"
        width="100%"
        src="https://pila-demo.knowlearning.systems/sessions"
      />
    </AccountLayout>
  );
};

export const getServerSideProps = getAccountServerSideProps;

export default Page;
