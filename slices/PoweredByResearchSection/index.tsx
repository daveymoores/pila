import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import { AssessmentApplicationProps } from "../../pages/learning-modules/[learning_module]/[assessment_application]";
import ProgrammeCard from "../../src/molecules/programme-card/ProgrammeCard";
import TextContent from "../../src/organisms/text-content/TextContent";
import CustomType from "../../types/CustomType";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";

interface Primary {
  eyebrowHeadline: RichTextBlock[];
  title: RichTextBlock[];
  description: RichTextBlock[];
}

export interface LearningModule {
  title: RichTextBlock[];
  body: RichTextBlock[];
  bodyShort: RichTextBlock[];
  applications: CustomType<AssessmentApplicationProps>[];
  icon: ImageProps;
  link: { url: string };
}

export interface PoweredByResearchSectionProps
  extends Slice<
    Primary,
    { module: Pick<CustomType<AssessmentApplicationProps>, "id"> }
  > {
  learningModules: CustomType<LearningModule>[];
}

const PoweredByResearchSection: FC<{
  slice: PoweredByResearchSectionProps;
}> = ({ slice }) => {
  const { primary, learningModules } = slice;

  return (
    <OuterWrapper>
      <TextContent {...primary} asCard={false} padding="medium" />
      <ResponsiveGridWrapper>
        <ResponsiveGrid>
          {learningModules
            .filter((module, index) => index <= 2)
            .map((module) => (
              <FixedProgrammeCard
                key={module.id}
                title={module.data?.title}
                body={module.data?.bodyShort}
                icon={module.data?.icon}
                link={
                  module.data?.link
                    ? {
                        url: module.data.link.url ?? "",
                        uid: module.uid,
                        type: module.type,
                        id: module.id,
                      }
                    : undefined
                }
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
  grid-template-columns: repeat(3, 1fr); /* Always have 3 columns */
  gap: 40px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column for mobile */
  }
`;

const FixedProgrammeCard = styled(ProgrammeCard)`
  max-width: 300px;
  width: 100%; /* Ensure the cards take full width of their column */
  &:hover {
    transform: scale(1.05);
  }
`;

export default PoweredByResearchSection;
