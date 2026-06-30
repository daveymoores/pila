import { asText } from "@prismicio/client";
import { Box, Heading } from "grommet";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import React from "react";

import { mergeStaticProps } from "../../helpers/merge-static-props";
import { createGetStaticProps } from "../../helpers/prismic-static-props";
import LearningModulesContext from "../../src/context/LearningModulesContext";
import Section from "../../src/layout/section/Section";
import ProgrammeCard from "../../src/molecules/programme-card/ProgrammeCard";
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

type PageProps = PageData<unknown, LearningModuleHomePageProps>;

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
              {asText(title)}
            </Heading>
          }
          variant={Theme.LIGHT}
        />
      )}
      <Section>
        <Box margin={{ bottom: "xlarge" }}>
          <ResponsiveGrid columns={columns} rows={rows} align={"stretch"}>
            {learningModules.map((module: CustomType<LearningModuleProps>) => (
              <ProgrammeCard
                key={module.id}
                title={module.data?.title}
                body={module.data?.bodyShort}
                icon={module.data?.icon}
              />
            ))}
          </ResponsiveGrid>
        </Box>
      </Section>
    </Box>
  );
};

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<PageProps>> => {
  const pageResult = await createGetStaticProps({
    queryType: QueryType.SINGLE,
    type: PageType.LEARNING_MODULE_HOME,
  })(context);

  if ("notFound" in pageResult && pageResult.notFound) {
    return pageResult;
  }

  return mergeStaticProps(pageResult, {
    slices: null,
  } as unknown as Partial<PageProps>) as GetStaticPropsResult<PageProps>;
};

export default Page;
