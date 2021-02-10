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
import React from "react";

import TextPosition from "../../../types/TextPosition";

export interface TextContentProps {
  eyebrowHeadline: RichTextBlock[];
  title: RichTextBlock[];
  description: RichTextBlock[];
  link: Link;
  textPosition: TextPosition;
}

const TextContent = ({
  eyebrowHeadline,
  title,
  description,
  link,
}: TextContentProps) => (
  <StyledCard background="light-1">
    <CardHeader pad="medium">
      <Box>
        <Heading level={"3"} margin="none" alignSelf={"stretch"} size="small">
          {RichText.asText(eyebrowHeadline) || "This is a hard coded hairline"}
        </Heading>
        <Heading level={"1"} margin="none" alignSelf={"stretch"} size="medium">
          {RichText.asText(title) || "This is a hard coded title"}
        </Heading>
      </Box>
    </CardHeader>
    {description && (
      <CardBody pad="medium">
        <Paragraph margin="none" fill>
          {RichText.asText(description)}
        </Paragraph>
      </CardBody>
    )}
    {link && (
      <CardFooter pad="medium">
        <Button primary size="large" type="button" label="label" />
      </CardFooter>
    )}
  </StyledCard>
);

const StyledCard = styled(Card)`
  z-index: 1;
`;

export default TextContent;
