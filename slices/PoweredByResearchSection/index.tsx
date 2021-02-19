import { Box } from "grommet";
import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
import ProjectCard from "../../src/organisms/project-card/ProjectCard";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import TextContent from "../../src/organisms/text-content/TextContent";

interface PoweredByResearchSectionProps {
  slice: {
    primary: {
      eyebrowHeadline: RichTextBlock[];
      title: RichTextBlock[];
      description: RichTextBlock[];
    };
  };
}

const PoweredByResearchSection: FC<PoweredByResearchSectionProps> = ({
  slice,
}) => {
  const { primary } = slice;
  return (
    <StyledBox background="light-1" justify={"center"}>
      <Section>
        <ResponsiveGrid margin="medium" columns={"medium"} rows={"1"}>
          <TextContent {...primary} asCard={false} padding="medium" />
          <ProjectCard
            src={""}
            title={primary.eyebrowHeadline}
            body={primary.description}
          />
          <ProjectCard
            src={""}
            title={primary.eyebrowHeadline}
            body={primary.description}
          />
        </ResponsiveGrid>
      </Section>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  min-height: 800px;
`;

export default PoweredByResearchSection;
