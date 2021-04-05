import { Card, Heading, Paragraph } from "grommet";
import React from "react";
import styled from "styled-components";

import { RoutedTextLink } from "../../../prismic";
import PageType from "../../../types/PageTypes";
import { colorPalette } from "../../theme/pila";

const PreviewCard: React.FC = () => {
  return (
    <StyledCard
      background={colorPalette.redCrayola}
      elevation={"large"}
      pad={"medium"}
    >
      <Heading level={4} size={"small"}>
        You are viewing in Preview Mode.
      </Heading>
      <Paragraph margin={{ top: "xsmall" }}>
        <StyledRoutedTextLink
          label={"Click here to exit"}
          link={{
            type: PageType.EXIT_PREVIEW,
          }}
        />
      </Paragraph>
    </StyledCard>
  );
};

const StyledRoutedTextLink = styled(RoutedTextLink)`
  font-weight: 500;
  color: white;
  font-size: 16px;
`;

const StyledCard = styled(Card)`
  z-index: 3;
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 0;
  width: 100%;
  min-height: 100px;
  justify-content: center;
  padding-left: 4vw;
  padding-right: 4vw;

  @media (min-width: 600px) {
    border-radius: 24px;
    bottom: 60px;
    left: 60px;
    width: auto;
    padding: 24px;
  }
`;

export default PreviewCard;
