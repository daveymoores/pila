import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Paragraph,
} from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import Button, { ButtonColors, ButtonSizes } from "../../atoms/button/Button";
import { colorPalette } from "../../theme/pila";

export interface TextContentProps {
  eyebrowHeadline: RichTextBlock[];
  title: RichTextBlock[];
  description: RichTextBlock[];
  link: Link;
  linkLabel: string;
}

const TextContent = ({
  eyebrowHeadline,
  title,
  description,
  link,
  linkLabel,
}: TextContentProps) => (
  <StyledCard background="light-1">
    <CardHeader
      pad={{
        top: "medium",
        bottom: "none",
        left: "medium",
        right: "medium",
      }}
    >
      <Box>
        <Heading
          level={"5"}
          color={"text-weak"}
          margin="none"
          alignSelf={"stretch"}
          responsive={false}
        >
          {RichText.asText(eyebrowHeadline)}
        </Heading>
        <Heading
          level={"1"}
          margin="none"
          alignSelf={"stretch"}
          size="small"
          responsive={false}
        >
          {RichText.asText(title)}
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
    {link && linkLabel && (
      <CardFooter
        pad={{
          top: "none",
          bottom: "medium",
          left: "medium",
          right: "medium",
        }}
      >
        <Button
          primary
          color={colorPalette.blue}
          size={ButtonSizes.large}
          type="button"
          label={linkLabel}
        />
      </CardFooter>
    )}
  </StyledCard>
);

const StyledCard = styled(Card)`
  z-index: 1;
`;

export default TextContent;
