import { Box, Heading } from "grommet";
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

const HeroContents: React.FC<HeroContentsProps> = ({
  subheading,
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
      height={"100vh"}
      style={{ position: "relative" }}
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
                top: isMobileDevice ? "150px" : "none",
                bottom: "small",
              }}
              color={colorPalette.white}
              alignSelf={"stretch"}
              size={"small"}
              responsive
            >
              {RichText.asText(subheading)}
            </Heading>
            <Heading
              level={"2"}
              color={colorPalette.periwinkleCrayola}
              margin={{
                bottom: "large",
              }}
              alignSelf={"stretch"}
              size={"small"}
              responsive
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
            <ImageBox
              elevation={"xxxlarge"}
              background={`url(${image?.url})`}
              style={{ right: isMobileDevice ? "0" : "0" }}
            />
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
  min-height: 100vh;
`;

const ImageBox = styled(Box)`
  padding-top: 110%;
  width: 100%;
  position: absolute;

  @media only screen and (min-width: 601px) {
    padding-top: 115%;
    margin-top: -10%;
  }
`;

const ImageContainer = styled(Box)`
  position: relative;
`;

export default HomepageHero;
