import { Box, Heading } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
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
}) => (
  <StyledBox background={colorPalette.blue} justify={"center"}>
    <Section>
      <ResponsiveGrid rows={"2"} columns={columns}>
        <Box align={"start"} height={"45vh"}>
          <Heading
            level={"1"}
            margin={{ bottom: "large" }}
            alignSelf={"stretch"}
            size="small"
            responsive={false}
          >
            {RichText.asText(title)}
          </Heading>
          <Button
            primary
            href={link?.slug}
            color={colorPalette.yellow}
            size={ButtonSizes.large}
            type="button"
            label={linklabel}
          />
        </Box>
        <ImageContainer>
          <ImageBox elevation={"xxxlarge"} background={`url(${image?.url})`} />
        </ImageContainer>
      </ResponsiveGrid>
    </Section>
  </StyledBox>
);

const StyledBox = styled(Box)`
  height: 95vh;
  min-height: 700px;
  max-height: 1000px;
`;

const ImageBox = styled(Box)`
  padding-top: 100%;
  width: 100%;
  border-radius: 50%;
  position: absolute;
  right: 0;
`;

const ImageContainer = styled(Box)`
  position: relative;
`;

export default HomepageHero;
