import { RichTextBlock } from "prismic-reactjs";
import React, { FC, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PoweredByResearchSection: FC<{
  slice: PoweredByResearchSectionProps;
}> = ({ slice }) => {
  const { primary, learningModules } = slice;
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowIcons(true);
      } else {
        setShowIcons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          </ResponsiveGridWrapper>
        </ContentWrapper>
      </StyledSection>
      {showIcons && <Icon src="icon.png" alt="Icon Right" position="right" />}
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  background: linear-gradient(180deg, #4a47a3 0%, #5458d0 100%);
  padding: 0 20px;
`;

const StyledSection = styled(Section)`
  background: transparent;
  padding: 20px 0;
  border-radius: 10px;
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1; /* Ensure content is above the icons */
`;

const ResponsiveGridWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FixedProgrammeCard = styled(ProgrammeCard)`
  flex: 1 1 300px; /* Adjust this value to set a fixed width for the cards */
  max-width: 300px;
  min-width: 300px;
  margin: 10px;
`;

const Icon = styled.img<{ position: "left" | "right" }>`
  width: 90%;
  max-width: 200px;
  height: auto;
  margin: 0 10px;
  position: absolute;
  z-index: 2;
  ${(props) => (props.position === "left" ? "left: 0;" : "right: 0;")}
  animation: ${fadeIn} 1s ease-in-out forwards;

  @media (max-width: 850px) {
    width: 30%;
    max-width: 70px;
    margin-right: 0;
  }
`;

export default PoweredByResearchSection;
