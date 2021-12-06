import { Card, CardBody, Heading, Paragraph } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import ImageProps from "../../../types/ImageProps";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import LearningModuleIcon from "../../atoms/learning-module-icon/LearningModuleIcon";
import DictionaryContext from "../../context/DictionaryContext";
import { colorPalette } from "../../theme/pila";

interface ProgrammeCardProps {
  link?: Link;
  title?: RichTextBlock[];
  body?: RichTextBlock[];
  icon?: ImageProps;
}

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({
  link,
  title,
  body,
  icon,
}) => {
  const { getDictionaryValue } = React.useContext(DictionaryContext);

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
        {link && (
          <Button
            margin={{ top: "medium" }}
            primary
            color={colorPalette.green}
            size={ButtonSizes.small}
            type="button"
            label={getDictionaryValue("View module")}
            link={link}
          />
        )}
      </CardBody>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
`;

const StyledParagraph = styled(Paragraph)`
  @media only screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export default ProgrammeCard;
