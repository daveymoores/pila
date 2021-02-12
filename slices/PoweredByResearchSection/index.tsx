import { Box, Card } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

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
}) => (
  <StyledSection>
    <Card>
      {slice.primary.title && <RichText render={slice.primary.title} />}
      {slice.primary.description && (
        <RichText render={slice.primary.description} />
      )}
    </Card>
  </StyledSection>
);

const StyledSection = styled(Box)`
  min-height: 800px;
`;

export default PoweredByResearchSection;
