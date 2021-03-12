import { Box } from "grommet";
import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
import ProjectCard from "../../src/organisms/programme-card/ProgrammeCard";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import TextContent from "../../src/organisms/text-content/TextContent";
import CustomType from "../../types/CustomType";
import Slice from "../../types/Slice";

interface Primary {
  eyebrowHeadline: RichTextBlock[];
  title: RichTextBlock[];
  description: RichTextBlock[];
}

export interface LearningModule {
  title: RichTextBlock[];
  body: RichTextBlock[];
  body_short: RichTextBlock[];
  applications: any; //TODO - pick from learning modules
}

export interface PoweredByResearchSectionProps extends Slice<Primary, never> {
  learningModules: CustomType<LearningModule>[];
}

const PoweredByResearchSection: FC<{
  slice: PoweredByResearchSectionProps;
}> = ({ slice }) => {
  const { primary, learningModules } = slice;
  return (
    <StyledBox background="light-1" justify={"center"}>
      <Section>
        <ResponsiveGrid margin="medium" columns={"medium"} rows={"1"}>
          <React.Fragment>
            <TextContent {...primary} asCard={false} padding="medium" />
            {learningModules.map((module) => (
              <ProjectCard
                key={module.id}
                title={module.data?.title}
                body={module.data?.body_short}
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
