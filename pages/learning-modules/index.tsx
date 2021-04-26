import { Box, Heading } from "grommet";
import { GetStaticPropsResult } from "next";
import { useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../prismic";
import LearningModulesContext from "../../src/context/LearningModulesContext";
import useNotification from "../../src/hooks/useNotification";
import Section from "../../src/layout/section/Section";
import { NotificationLinkedProps } from "../../src/molecules/notification/Notification";
import ProjectCard from "../../src/molecules/programme-card/ProgrammeCard";
import { HeroImageProps } from "../../src/organisms/hero-image/HeroImage";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import Seo from "../../src/organisms/seo/Seo";
import CustomType from "../../types/CustomType";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";
import QueryType from "../../types/QueryType";
import { LearningModuleProps } from "./[learning_module]";

type LearningModuleHomePageProps = HeroImageProps & NotificationLinkedProps;

type PageProps = PageData<unknown, LearningModuleHomePageProps> &
  JSX.IntrinsicAttributes;

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: Array(3).fill("flex"),
  xlarge: Array(3).fill("flex"),
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const Page: React.FC<PageProps> = (props) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    notification,
  } = props.data || {};

  useNotification(notification);

  const learningModules = React.useContext(LearningModulesContext);

  return (
    <Box
      width={"100%"}
      background={"light-1"}
      pad={{
        top: "medium",
        bottom: "xlarge",
      }}
    >
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <Section>
        <Box
          gridArea="title"
          pad={{ top: "xlarge", bottom: "xlarge" }}
          align={"center"}
        >
          <Heading
            textAlign={"start"}
            level={"1"}
            alignSelf={"stretch"}
            size="small"
            margin={{ top: "xlarge", bottom: "medium" }}
          >
            Learning Modules
          </Heading>
        </Box>
      </Section>
      <Section>
        <Box margin={{ bottom: "xlarge" }}>
          <ResponsiveGrid columns={columns} rows={rows} align={"stretch"}>
            {learningModules.map((module: CustomType<LearningModuleProps>) => (
              <ProjectCard
                key={module.id}
                title={module.data?.title}
                body={module.data?.bodyShort}
                icon={module.data?.icon}
                link={{
                  uid: module.uid,
                  type: module.type,
                  id: module.id,
                }}
              />
            ))}
          </ResponsiveGrid>
        </Box>
      </Section>
    </Box>
  );
};
interface StaticContextProps {
  params: Record<string, unknown>;
}

export const getStaticProps = async (
  context: StaticContextProps
): Promise<GetStaticPropsResult<PageProps>> => {
  const { props } = await useGetStaticProps({
    client: Client(),
    queryType: QueryType.SINGLE,
    type: PageType.LEARNING_MODULE_HOME,
    params: { fetchLinks: ["notification.body, notification.showGlobal"] },
  })(context);

  return { props: { ...props, slices: null } };
};

export default Page;
