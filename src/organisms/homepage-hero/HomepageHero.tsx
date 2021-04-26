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
  title: RichTextBlock[];
  link?: Link;
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
  linklabel,
  image,
  isMobileDevice = false,
}) => (
  <StyledBox
    background={colorPalette.blue}
    justify={"center"}
    overflow={"hidden"}
    height={isMobileDevice ? "100vh" : "95vh"}
  >
    <Section justify={isMobileDevice ? "start" : "center"}>
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
          {link && linklabel && (
            <Button
              primary
              color={colorPalette.yellow}
              size={ButtonSizes.large}
              type="button"
              label={linklabel}
              link={link}
            />
          )}
        </Box>
        <ImageContainer width={{ max: "600px" }}>
          <ImageBox
            elevation={"xxxlarge"}
            background={`url(${image?.url})`}
            style={{ right: isMobileDevice ? "-24vw" : "0" }}
            margin={{ top: isMobileDevice ? "large" : "none" }}
          />
        </ImageContainer>
      </ResponsiveGrid>
    </Section>
  </StyledBox>
);

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

export default HomepageHero;
