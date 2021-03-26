import { Box, Heading } from "grommet";
import { useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../prismic";
import LearningModulesContext from "../../src/context/LearningModulesContext";
import { useNavigationLightTheme } from "../../src/hooks/useNavigationTheme";
import Section from "../../src/layout/section/Section";
import ProjectCard from "../../src/molecules/programme-card/ProgrammeCard";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import Seo from "../../src/organisms/seo/Seo";
import CustomType from "../../types/CustomType";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";
import { LearningModuleProps } from "./[learning_module]";

type PageProps = PageData<unknown, unknown> & JSX.IntrinsicAttributes;

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
  } = props.data || {};

  useNavigationLightTheme();
  const learningModules = React.useContext(LearningModulesContext);

  return (
    <Box
      width={"100%"}
      background={"light-1"}
      pad={{
        top: "xlarge",
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
        <Box gridArea="title" margin={{ bottom: "large" }} align={"center"}>
          <Heading
            textAlign={"start"}
            level={"1"}
            alignSelf={"stretch"}
            size="small"
            responsive={false}
            margin={{ top: "xlarge", bottom: "large" }}
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

export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: "single",
  type: PageType.LEARNING_MODULE_HOME,
});

export default Page;
