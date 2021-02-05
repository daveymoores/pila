import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Paragraph,
} from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";

import ResponsiveGrid from "../../src/organisms/ResponsiveGrid/ResponsiveGrid";
import ImageProps from "../../types/ImageProps";

enum TextPosition {
  textLeft = "text_left",
  textRight = "text_right",
}

interface FullWidthImageSectionProps {
  slice: {
    primary: {
      title: RichTextBlock[];
      description: RichTextBlock[];
      link: Link;
      image: ImageProps;
      textPosition: TextPosition;
    };
  };
}

const FullWidthImageSection: FC<FullWidthImageSectionProps> = ({ slice }) => (
  <StyledSection bgUrl={slice.primary.image.url}>
    <ResponsiveGrid gap="small" margin="medium" columns="medium" rows="1">
      <Card background="light-1">
        {/*{slice.primary.title && (*/}
        <CardHeader pad="medium">
          <Box>
            <Heading
              level={"3"}
              margin="none"
              alignSelf={"stretch"}
              size="small"
            >
              This is a hard coded hairline
              {/*<RichText render={slice.primary.title} />*/}
            </Heading>
            <Heading
              level={"1"}
              margin="none"
              alignSelf={"stretch"}
              size="medium"
            >
              This is a hard coded title
              {/*<RichText render={slice.primary.title} />*/}
            </Heading>
          </Box>
        </CardHeader>
        {/*)}*/}
        {slice.primary.description && (
          <CardBody pad="medium">
            <Paragraph margin="none">
              <RichText render={slice.primary.description} />
            </Paragraph>
          </CardBody>
        )}
        {slice.primary.link && (
          <CardFooter pad="medium">
            <Button primary size="large" type="button" label="label" />
          </CardFooter>
        )}
      </Card>
    </ResponsiveGrid>
  </StyledSection>
);

type StyledSectionProps = {
  bgUrl?: string;
};

const StyledSection = styled(Box)<StyledSectionProps>`
  background-image: ${(props) => `url("${props.bgUrl}")`};
  min-height: 800px;
`;

export default FullWidthImageSection;
