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
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0% {
    text-shadow: 0 0 10px #4A47A3;
  }
  50% {
    text-shadow: 0 0 20px #4A47A3;
  }
  100% {
    text-shadow: 0 0 10px #4A47A3;
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
              size={"medium"}
              responsive
              isTitle
            >
              {RichText.asText(subheading)}
            </AnimatedHeading>
            <AnimatedHeading
              level={"2"}
              color={colorPalette.white}
              margin={{ bottom: "medium" }}
              size={"small"}
              responsive
              isSubheading
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
  return <HeroContents {...props} isMobileDevice={false} />;
};

const StyledBox = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px 0 20px; /* Added top padding to avoid navbar overlap */
  background: rgb(46, 50, 219);
  animation: ${fadeIn} 1.5s ease-in-out;

  @media (max-width: 768px) {
    min-height: 120vh;
    padding-top: 100px; /* Increased top padding for mobile */
  }
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
  animation: ${fadeIn} 2s ease-out;

  @media (min-width: 768px) {
    padding: 48px;
    text-align: left;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    padding-top: 120px; /* Increased padding to push content down */
  }
`;

const AnimatedHeading = styled(Heading)<{
  isTitle?: boolean;
  isSubheading?: boolean;
}>`
  font-weight: 600;
  line-height: 1.2;
  color: #fff;
  animation: ${glow} 3s infinite;

  ${(props) =>
    props.isTitle &&
    `
    font-size: 2.5rem;
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  `}

  ${(props) =>
    props.isSubheading &&
    `
    font-size: 1.5rem;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  `}

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 20px; /* Margin to push the text down */
  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  text-align: center;
  animation: ${fadeIn} 2s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin-top: 30px; /* Increased margin to push button down */
  }
`;

const StyledImageBox = styled(Box)<{ size: string }>`
  background-size: cover;
  background-position: center;
  width: ${(props) => (props.size === "small" ? "80vw" : "50vw")};
  height: ${(props) => (props.size === "small" ? "50vh" : "80vh")};
  animation: ${fadeIn} 1.5s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    height: 50vh;
    background-size: contain;
    animation: ${fadeIn} 1.5s ease-in-out;
    margin-top: 20px; /* Margin to push image down */
  }
`;

const ImageContainer = styled(Box)`
  position: relative;
  z-index: 0;
`;

export default HomepageHero;
