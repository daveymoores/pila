import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import { AssessmentApplicationProps } from "../../pages/learning-modules/[learning_module]/[assessment_application]";
import Section from "../../src/layout/section/Section";
import ProgrammeCard from "../../src/molecules/programme-card/ProgrammeCard";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
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

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const PoweredByResearchSection: FC<{
  slice: PoweredByResearchSectionProps;
}> = ({ slice }) => {
  const { primary, learningModules } = slice;

  return (
    <OuterWrapper>
      <StyledSection>
        <ContentWrapper>
          <TextContent {...primary} asCard={false} padding="medium" />
          <ResponsiveGridWrapper>
            <ResponsiveGrid
              columns={{
                small: ["auto"],
                medium: ["flex", "flex"],
                large: ["flex", "flex", "flex"],
              }}
              rows={rows}
              gap="medium"
              align={"stretch"}
            >
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
        </ContentWrapper>
      </StyledSection>
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
`;

const StyledSection = styled(Section)`
  background: transparent;
  padding: 20px 0;
  border-radius: 10px;
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const ResponsiveGridWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FixedProgrammeCard = styled(ProgrammeCard)`
  flex: 1 1 300px;
  max-width: 300px;
  min-width: 300px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease-in-out;
  background: #f8f8f8;
  margin: 20px;

  &:hover {
    transform: scale(1.05);
  }
`;

export default PoweredByResearchSection;
