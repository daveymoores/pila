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

export interface PoweredByResearchSectionProps
  extends Slice<
    Primary,
    { module: Pick<CustomType<AssessmentApplicationProps>, "id"> }
  > {
  learningModules: CustomType<LearningModule>[];
}

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
        <TextContent {...primary} asCard={false} padding="medium" />
        <ResponsiveGrid
          columns={{
            small: ["auto"],
            medium: ["flex", "flex"],
            large: ["flex", "flex", "flex"],
          }}
          rows={rows}
          gap="medium"
          align={"stretch"}
        >
          {learningModules
            .filter((module, index) => index <= 2)
            .map((module) => (
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
      </Section>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  min-height: 800px;
`;

export default PoweredByResearchSection;
