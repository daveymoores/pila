import { Box, Heading, Image } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import ImageProps from "../../../types/ImageProps";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import {
  DesktopUp,
  MobileTabletOnly,
} from "../../atoms/responsive-helpers/ResponsiveHelpers";
import Section from "../../layout/section/Section";
import { colorPalette } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface HomepageHeroProps {
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

const HeroContents: React.FC<HeroContentsProps> = ({
  title,
  link,
  externalHeroLink,
  linklabel,
  image,
  isMobileDevice = false,
}) => {
  return (
    <StyledBox
      background={colorPalette.blue}
      justify={"center"}
      overflow={"hidden"}
      height={isMobileDevice ? "100vh" : "95vh"}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <StyledSection justify={isMobileDevice ? "start" : "center"}>
        <ResponsiveGrid rows={"2"} columns={columns}>
          <Box
            align={"start"}
            height={isMobileDevice ? "auto" : "45vh"}
            justify={"start"}
          >
            <Heading
              level={"1"}
              margin={{
                top: isMobileDevice ? "120px" : "none",
                bottom: "large",
              }}
              alignSelf={"stretch"}
              size={"small"}
              responsive={true}
            >
              {RichText.asText(title)}
            </Heading>
            {(externalHeroLink || link) && linklabel && (
              <Button
                primary
                color={colorPalette.yellow}
                size={ButtonSizes.large}
                type="button"
                label={linklabel}
                link={externalHeroLink || link}
              />
            )}
          </Box>
          <ImageContainer width={{ max: "600px" }}>
            <BluePattern src={"/pattern/blue-pattern.png"} />
            <ImageBox
              elevation={"xxxlarge"}
              background={`url(${image?.url})`}
              style={{ right: isMobileDevice ? "-24vw" : "0" }}
              margin={{ top: isMobileDevice ? "large" : "none" }}
            />
            <GreenPattern src={"/pattern/green-pattern.png"} />
          </ImageContainer>
        </ResponsiveGrid>
      </StyledSection>
    </StyledBox>
  );
};

const HomepageHero: React.FC<HomepageHeroProps> = (props) => {
  return (
    <React.Fragment>
      <DesktopUp>
        <HeroContents {...props} />
      </DesktopUp>
      <MobileTabletOnly>
        <HeroContents {...props} isMobileDevice />
      </MobileTabletOnly>
    </React.Fragment>
  );
};

const StyledSection = styled(Section)`
  position: relative;
`;

const StyledBox = styled(Box)`
  min-height: 700px;
  max-height: 1000px;
`;

const ImageBox = styled(Box)`
  padding-top: 100%;
  width: 100%;
  border-radius: 50%;
  position: absolute;
`;

const ImageContainer = styled(Box)`
  position: relative;
`;

const BluePattern = styled(Image)`
  position: absolute;
  height: 1014px;
  width: 749px;
  left: 0;

  @media (min-width: 901px) {
    bottom: -235px;
    left: 62px;
  }
`;

const GreenPattern = styled(Image)`
  display: none;
  position: absolute;
  right: -222px;
  bottom: -60px;
  height: 501px;
  width: 406px;
  z-index: 1;

  @media (min-width: 901px) {
    display: block;
  }
`;

export default HomepageHero;
