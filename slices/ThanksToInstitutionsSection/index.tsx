import styled from "@emotion/styled";
import { Box, Card, Image } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";

import ImageProps from "../../types/ImageProps";

interface ThanksToInstitutionsSectionProps {
  slice: {
    primary: {
      title: RichTextBlock[];
    };
    items: {
      logo: ImageProps;
    }[];
  };
}

const ThanksToInstitutionsSection: FC<ThanksToInstitutionsSectionProps> = ({
  slice,
}) => (
  <StyledSection>
    <Card>
      {slice.primary.title && <RichText render={slice.primary.title} />}
      {slice.items?.map(({ logo }, index) => (
        <Card key={index}>
          <Image src={logo.url} />
        </Card>
      ))}
    </Card>
  </StyledSection>
);

const StyledSection = styled(Box)`
  min-height: 800px;
`;

export default ThanksToInstitutionsSection;
