import { Heading } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import Prismic from "prismic-javascript";
import React from "react";

import { Client } from "../../../prismic";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";

interface LinkedApplication {
  assessment_application: {
    id: string;
    type: "assessment_application";
    tags: [];
    slug: string;
    lang: "en-us";
    uid: string;
    link_type: "Document";
    isBroken: boolean;
  };
}

type PageProps = PageData<unknown, unknown> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props: JSX.IntrinsicAttributes) => {
  console.log(props);
  return <Heading>Assessment application</Heading>;
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.ASSESSMENT_APPLICATION,
  uid: ({ params }) => params.assessment_application,
});

export const getStaticPaths = async () => {
  const client = Client();
  const modules =
    (await client.query(
      Prismic.Predicates.at("document.type", "learning_module"),
      {}
    )) || {};

  interface ModuleApplications {
    module: string | undefined;
    applications: string[];
  }

  //TODO - move this into a helper
  const moduleApplications: ModuleApplications[] = modules.results.map(
    (result): ModuleApplications => {
      return {
        module: result.uid,
        applications: result.data.applications.map(
          (application: LinkedApplication) => {
            return application.assessment_application.uid;
          }
        ),
      };
    }
  );

  return useGetStaticPaths({
    client: Client(),
    type: PageType.ASSESSMENT_APPLICATION,
    fallback: true, // process.env.NODE_ENV === 'development',
    formatPath: (props) => {
      const app = moduleApplications.find((module) =>
        module.applications.find((app) => app === props.uid)
      );
      console.log(app?.module);
      return {
        params: {
          assessment_application: props.uid,
          learning_module: app?.module || "",
        },
      };
    },
  })();
};

export default Page;
