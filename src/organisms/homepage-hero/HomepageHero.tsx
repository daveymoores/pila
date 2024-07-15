import { Box, Heading, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import ImageProps from "../../../types/ImageProps";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import Section from "../../layout/section/Section";
import { colorPalette } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface HomepageHeroProps {
  subheading: RichTextBlock[];
  title: RichTextBlock[];
  link?: Link;
  externalHeroLink?: Link;
  linklabel?: string;
  image?: ImageProps;
}

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: ["flex", "flex"],
  xlarge: ["flex", "flex"],
};

interface HeroContentsProps extends HomepageHeroProps {
  isMobileDevice?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const scrollToNextSection = () => {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
};

const HeroContents: React.FC<HeroContentsProps> = ({
  subheading,
  title,
  link,
  externalHeroLink,
  linklabel,
  image,
  isMobileDevice = false,
}) => {
  const size = React.useContext(ResponsiveContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        window.removeEventListener("scroll", handleScroll);
        scrollToNextSection();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledBox>
      <StyledSection justify={isMobileDevice ? "start" : "center"}>
        <ResponsiveGrid rows={"auto"} columns={columns}>
          <ContentBox align={"start"} justify={"center"} pad="medium">
            <AnimatedHeading
              level={"1"}
              margin={{ top: "none", bottom: "small" }}
              color={colorPalette.white}
              size={"large"}
              responsive
            >
              {RichText.asText(subheading)}
            </AnimatedHeading>
            <AnimatedHeading
              level={"2"}
              color={colorPalette.periwinkleCrayola}
              margin={{ bottom: "medium" }}
              size={"medium"}
              responsive
            >
              {RichText.asText(title)}
            </AnimatedHeading>
            {(externalHeroLink || link) && linklabel && (
              <StyledButton
                primary
                color={colorPalette.yellow}
                size={ButtonSizes.large}
                type="button"
                label={linklabel}
                link={externalHeroLink || link}
              />
            )}
          </ContentBox>
          <ImageContainer align="center" justify="center">
            <StyledImageBox background={`url(${image?.url})`} size={size} />
          </ImageContainer>
        </ResponsiveGrid>
      </StyledSection>
    </StyledBox>
  );
};

const HomepageHero: React.FC<HomepageHeroProps> = (props) => {
  return (
    <>
      <HeroContents {...props} isMobileDevice={false} />
    </>
  );
};

const StyledBox = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background: linear-gradient(180deg, #2b2ed3 0%, #3d3acb 50%, #4a47a3 100%);
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const StyledSection = styled(Section)`
  position: relative;
  width: 100%;
`;

const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px;
  animation: ${slideIn} 1s ease-out;
  margin-top: 100px;

  @media (min-width: 768px) {
    padding: 48px;
    text-align: left;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    margin-top: 0;
  }
`;

const AnimatedHeading = styled(Heading)`
  font-weight: 600;
  line-height: 1.2;
  animation: ${bounce} 2s infinite;
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  text-align: center;
  animation: ${fadeIn} 2s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const StyledImageBox = styled(Box)<{ size: string }>`
  background-size: cover;
  background-position: center;
  width: ${(props) => (props.size === "small" ? "80vw" : "50vw")};
  height: ${(props) => (props.size === "small" ? "50vh" : "80vh")};
  animation: ${fadeIn} 1.5s ease-in-out, ${bounce} 3s infinite;

  @media (max-width: 768px) {
    width: 100%;
    height: 50vh;
    background-size: contain;
    animation: ${fadeIn} 1.5s ease-in-out;
  }
`;

const ImageContainer = styled(Box)`
  position: relative;
  z-index: 0;
`;

export default HomepageHero;
