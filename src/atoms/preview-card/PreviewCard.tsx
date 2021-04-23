import { Card, Heading, Paragraph } from "grommet";
import React from "react";
import styled from "styled-components";

import PageType from "../../../types/PageTypes";
import { colorPalette } from "../../theme/pila";
import TextLink from "../text-link/TextLink";

const PreviewCard: React.FC = () => {
  return (
    <StyledCard
      background={colorPalette.redCrayola}
      elevation={"medium"}
      pad={"small"}
    >
      <Heading level={5} size={"small"} responsive={false}>
        You are viewing in Preview Mode.
      </Heading>
      <Paragraph margin={{ top: "xsmall" }}>
        <StyledTextLink
          label={"Click here to exit"}
          link={{
            type: PageType.EXIT_PREVIEW,
          }}
        />
      </Paragraph>
    </StyledCard>
  );
};

const StyledTextLink = styled(TextLink)`
  font-weight: 500;
  color: white;
  font-size: 16px;
`;

const StyledCard = styled(Card)`
  z-index: 3;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 0;
  width: 100%;
  justify-content: center;
  padding: 4vw;
  text-align: right;

  @media (min-width: 600px) {
    border-radius: 16px;
    bottom: 20px;
    right: 20px;
    width: auto;
    padding: 20px;
  }
`;

export default PreviewCard;
