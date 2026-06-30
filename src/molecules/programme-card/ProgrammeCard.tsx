import { asText } from "@prismicio/client";
import { Card, CardBody, Heading, Paragraph } from "grommet";
import React from "react";
import styled from "styled-components";

import type { RichTextBlock } from "../../../lib/prismic-types";
import ImageProps from "../../../types/ImageProps";
import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import { colorPalette } from "../../theme/pila";
import RichMediaElement from "../rich-media-element/RichMediaElement";

interface ProgrammeCardProps {
  link?: {
    url: string;
    uid?: string;
    type?: PageType;
    id?: string;
  };
  title?: RichTextBlock;
  body?: RichTextBlock;
  icon?: ImageProps;
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

  const cardTitle = title ? asText(title).toLowerCase().trim() : "";
  const staticUrl = staticUrls[cardTitle];
  const finalUrl = link?.url ?? staticUrl;

  return (
    <StyledCard
      background={"white"}
      elevation="xlarge"
      round={"medium"}
      direction={"column"}
    >
      {icon?.url && (
        <CardHero>
          <CardHeroImage {...icon} alt={icon.alt || ""} layout="fill" />
        </CardHero>
      )}
      <StyledCardBody pad="large">
        {title && (
          <Heading
            level={"4"}
            margin="none"
            alignSelf={"stretch"}
            responsive={false}
          >
            {asText(title)}
          </Heading>
        )}
        {body && (
          <StyledParagraph
            margin={{
              top: "medium",
            }}
          >
            {asText(body)}
          </StyledParagraph>
        )}
        {finalUrl && (
          <ButtonWrapper>
            <Button
              primary
              color={colorPalette.green}
              size={ButtonSizes.small}
              label="Learn More"
              link={{
                link_type: "Document",
                type: (link?.type as PageType) || PageType.THEME,
                url: finalUrl,
              }}
            />
          </ButtonWrapper>
        )}
      </StyledCardBody>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease-in-out;
  background: #f8f8f8;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 0;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardHero = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
`;

const CardHeroImage = styled(RichMediaElement)`
  border-radius: 0 !important;

  img {
    object-fit: cover !important;
    border-radius: 0 !important;
  }
`;

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;

const StyledParagraph = styled(Paragraph)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: calc(1.5em * 3);
  word-break: break-word;

  @media only screen and (max-width: 400px) {
    font-size: 16px;
    line-height: 24px;
    max-height: calc(24px * 3);
  }
`;

export default ProgrammeCard;
