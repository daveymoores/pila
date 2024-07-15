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
    <BackgroundWrapper>
      <StyledSection>
        <TextContent {...primary} asCard={false} padding="medium" />
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
        </ResponsiveGrid>
      </StyledSection>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  background: linear-gradient(180deg, #4a47a3 0%, #5a61b1 50%, #6a75c0 100%);
  padding: 20px 0; /* Üst ve alt boşluk */
`;

const StyledSection = styled(Section)`
  background: transparent; /* BackgroundWrapper arka planı kapsar */
  padding: 20px;
  border-radius: 10px;
  max-width: 1200px; /* Maksimum genişlik */
  margin: 0 auto; /* Ortalamak için */
`;

export default PoweredByResearchSection;
