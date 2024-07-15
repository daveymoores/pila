import { RichTextBlock } from "prismic-reactjs";
import React, { FC, useEffect } from "react";
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

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <FullWidthSection>
      <StyledSection>
        <TextContent {...primary} asCard={false} padding="medium" />
        <StyledResponsiveGrid
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
              <ProgrammeCard
                key={module.id}
                title={module.data?.title}
                body={module.data?.bodyShort}
                icon={module.data?.icon}
                link={
                  module.data?.link
                    ? {
                        url: module.data.link.url || "",
                        uid: module.uid,
                        type: module.type,
                        id: module.id,
                      }
                    : undefined
                }
              />
            ))}
        </StyledResponsiveGrid>
      </StyledSection>
    </FullWidthSection>
  );
};

const FullWidthSection = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #4a47a3 0%, #5a53b6 50%, #6b61c7 100%);
`;

const StyledSection = styled(Section)`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledResponsiveGrid = styled(ResponsiveGrid)`
  margin: 0 -20px;
`;

export default PoweredByResearchSection;
