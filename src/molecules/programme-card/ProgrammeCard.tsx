import { Card, CardBody, Heading, Paragraph } from "grommet";
import NextLink from "next/link";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import LearningModuleIcon from "../../atoms/learning-module-icon/LearningModuleIcon";
import { colorPalette } from "../../theme/pila";

interface ProgrammeCardProps {
  link?: {
    url: string;
    uid?: string;
    type?: PageType;
    id?: string;
  };
  title?: RichTextBlock[];
  body?: RichTextBlock[];
  icon?: Pick<RichTextBlock, "url" | "alt" | "dimensions" | "copyright">;
}

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({
  title,
  body,
  icon,
  link,
}) => {
  const staticUrls: { [key: string]: string } = {
    "competency-based": "/competency-based-learning-and-assessment",
    "reporting tools": "/reporting-tools",
    "customiser tools": "/customiser-tools",
  };

  const cardTitle = title ? RichText.asText(title).toLowerCase().trim() : "";
  const staticUrl = staticUrls[cardTitle];
  const finalUrl = link?.url || staticUrl;

  return (
    <StyledCard
      background={"white"}
      elevation="xlarge"
      pad="large"
      round={"medium"}
      direction={"column"}
    >
      <LearningModuleIcon icon={icon} />
      <CardBody
        margin={{ top: "medium" }}
        pad={{
          top: "medium",
        }}
        align={"start"}
      >
        {title && (
          <Heading
            level={"4"}
            margin="none"
            alignSelf={"stretch"}
            responsive={false}
          >
            {RichText.asText(title)}
          </Heading>
        )}
        {body && (
          <StyledParagraph
            margin={{
              top: "medium",
            }}
            fill
          >
            {RichText.asText(body)}
          </StyledParagraph>
        )}
        {finalUrl && (
          <NextLink href={finalUrl} passHref>
            <Button
              margin={{ top: "medium" }}
              primary
              color={colorPalette.green}
              size={ButtonSizes.small}
              type="button"
              label="Learn More"
            />
          </NextLink>
        )}
      </CardBody>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledParagraph = styled(Paragraph)`
  @media only screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export default ProgrammeCard;
