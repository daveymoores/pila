import { Box } from "grommet";
import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import { AssessmentApplicationProps } from "../../pages/learning-modules/[learning_module]/[assessment_application]";
import Section from "../../src/layout/section/Section";
import ProjectCard from "../../src/molecules/programme-card/ProgrammeCard";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import TextContent from "../../src/organisms/text-content/TextContent";
import CustomType from "../../types/CustomType";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";

interface Primary {
  eyebrowHeadline: RichTextBlock[];
  title: RichTextBlock[];
  description: RichTextBlock[];
}

export interface LearningModule {
  title: RichTextBlock[];
  body: RichTextBlock[];
  bodyShort: RichTextBlock[];
  applications: CustomType<AssessmentApplicationProps>[];
  icon: ImageProps;
}

export interface PoweredByResearchSectionProps extends Slice<Primary, never> {
  learningModules: CustomType<LearningModule>[];
}

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

const PoweredByResearchSection: FC<{
  slice: PoweredByResearchSectionProps;
}> = ({ slice }) => {
  const { primary, learningModules } = slice;
  return (
    <StyledBox
      background="light-1"
      justify={"center"}
      pad={{ top: "xlarge", bottom: "xlarge" }}
    >
      <Section>
        <ResponsiveGrid columns={columns} rows={rows} align={"stretch"}>
          <React.Fragment>
            <TextContent {...primary} asCard={false} padding="medium" />
            {learningModules.map((module) => (
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
          </React.Fragment>
        </ResponsiveGrid>
      </Section>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  min-height: 800px;
`;

export default PoweredByResearchSection;
