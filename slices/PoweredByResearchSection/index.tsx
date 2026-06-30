import React, { FC } from "react";
import styled from "styled-components";

import type { ProgrammeCardData } from "../../helpers/resolve-programme-cards";
import type { Link, RichTextBlock } from "../../lib/prismic-types";
import ProgrammeCard from "../../src/molecules/programme-card/ProgrammeCard";
import TextContent from "../../src/organisms/text-content/TextContent";
import Slice from "../../types/Slice";

interface Primary {
  eyebrowHeadline: RichTextBlock;
  title: RichTextBlock;
  description: RichTextBlock;
}

export interface PoweredByResearchSectionProps extends Slice<
  Primary,
  { module: Link }
> {
  programmeCards?: ProgrammeCardData[];
}

const PoweredByResearchSection: FC<{
  slice: PoweredByResearchSectionProps;
}> = ({ slice }) => {
  const { primary, programmeCards = [] } = slice;

  return (
    <OuterWrapper>
      <TextContent {...primary} asCard={false} padding="medium" />
      <ResponsiveGridWrapper>
        <ResponsiveGrid>
          {programmeCards.map((card) => (
            <FixedProgrammeCard
              key={card.id}
              title={card.title}
              body={card.body}
              icon={card.icon}
              link={card.link}
            />
          ))}
        </ResponsiveGrid>
      </ResponsiveGridWrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  background: linear-gradient(
    180deg,
    rgb(46, 50, 219) 0%,
    rgb(58, 62, 223) 100%
  );
  padding: 0 20px;
  position: relative;
  overflow: hidden;
  margin: 0;
`;

const ResponsiveGridWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  margin: 0;
`;

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FixedProgrammeCard = styled(ProgrammeCard)`
  max-width: 300px;
  width: 100%;
`;

export default PoweredByResearchSection;
