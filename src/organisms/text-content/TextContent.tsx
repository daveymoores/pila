import { Box, Card, CardBody, CardFooter, CardHeader, Heading } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../atoms/button/Button";
import RichTextParser from "../../molecules/rich-text-parser/RichTextParser";
import { colorPalette } from "../../theme/pila";

export interface TextContentProps {
  eyebrowHeadline?: RichTextBlock[];
  title?: RichTextBlock[];
  description?: RichTextBlock[];
  link?: Link;
  linkLabel?: string;
  padding?: "small" | "medium" | "large" | "none";
  background?: string;
  asCard?: boolean;
  className?: string;
}

const TextContent: React.FC<TextContentProps> = ({
  eyebrowHeadline,
  title,
  description,
  link,
  linkLabel,
  asCard = false,
  padding = "none",
  background,
  className,
}) => (
  <StyledCard
    className={className}
    elevation={asCard ? "xlarge" : "none"}
    background={background}
    pad={asCard ? padding : "none"}
    round={asCard ? "medium" : "none"}
  >
    {title && (
      <CardHeader
        pad={{
          top: asCard ? padding : "none",
          bottom: "none",
          left: asCard ? padding : "none",
          right: asCard ? padding : "none",
        }}
      >
        <Box>
          {eyebrowHeadline && (
            <Heading
              level={"5"}
              color={"text-weak"}
              margin="none"
              alignSelf={"stretch"}
              responsive={false}
            >
              {RichText.asText(eyebrowHeadline)}
            </Heading>
          )}
          <Heading
            level={"1"}
            alignSelf={"stretch"}
            size={"small"}
            margin={{ top: "small", bottom: "medium" }}
          >
            {RichText.asText(title)}
          </Heading>
        </Box>
      </CardHeader>
    )}
    {description && (
      <CardBody
        pad={
          asCard
            ? padding
            : {
                top: padding,
                bottom: padding,
                left: "none",
                right: "none",
              }
        }
      >
        <RichTextParser body={description} />
      </CardBody>
    )}
    {link && linkLabel && (
      <CardFooter
        pad={{
          top: "none",
          bottom: asCard ? padding : "none",
          left: asCard ? padding : "none",
          right: asCard ? padding : "none",
        }}
      >
        <Button
          primary
          color={colorPalette.blue}
          size={ButtonSizes.large}
          type="button"
          label={linkLabel}
          link={link}
          margin={{ top: "medium" }}
        />
      </CardFooter>
    )}
  </StyledCard>
);

const StyledCard = styled(Card)`
  z-index: 1;
`;

export default TextContent;
