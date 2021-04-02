import { Box, Heading, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { useContext } from "react";
import styled from "styled-components";

import ImageProps from "../../../types/ImageProps";
import Button, { ButtonSizes } from "../../atoms/button/Button";
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

const HomepageHero: React.FC<HomepageHeroProps> = ({
  title,
  link,
  linklabel,
  image,
}) => {
  const size = useContext(ResponsiveContext);
  const isMobileDevice = size !== "large";
  console.log(size);
  return (
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
              margin={{ top: size === "small" ? "large" : "none" }}
            />
          </ImageContainer>
        </ResponsiveGrid>
      </Section>
    </StyledBox>
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
