import { Box, Heading } from "grommet";
import { GetStaticPropsResult } from "next";
import { useGetStaticProps } from "next-slicezone/hooks";
import { RichText } from "prismic-reactjs";
import React from "react";

import { Client } from "../../prismic";
import LearningModulesContext from "../../src/context/LearningModulesContext";
import Section from "../../src/layout/section/Section";
import ProjectCard from "../../src/molecules/programme-card/ProgrammeCard";
import { HeroImageProps } from "../../src/organisms/hero-image/HeroImage";
import HeroText from "../../src/organisms/hero-text/HeroText";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import Seo from "../../src/organisms/seo/Seo";
import CustomType from "../../types/CustomType";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";
import QueryType from "../../types/QueryType";
import { Theme } from "../../types/Theme";
import { LearningModuleProps } from "./[learning_module]";

type LearningModuleHomePageProps = HeroImageProps;

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
    title,
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
  } = props.data || {};

  const learningModules = React.useContext(LearningModulesContext);

  return (
    <Box
      width={"100%"}
      background={"light-1"}
      pad={{
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
      {title && (
        <HeroText
          title={
            <Heading
              textAlign={"start"}
              level={"1"}
              alignSelf={"stretch"}
              size="small"
            >
              {RichText.asText(title)}
            </Heading>
          }
          variant={Theme.LIGHT}
        />
      )}
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
  })(context);

  return { props: { ...props, slices: null } };
};

export default Page;
