import { Box, Heading, Image } from "grommet";
import SliceZone from "next-slicezone";
import { RichText } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import { GuidePageSlices } from "../../../pages/guides/[guide]";
import { DetailPageProps } from "../../../pages/legal/[legal]";
import resolver from "../../../sm-resolver";
import { SliceType } from "../../../types/Slice";
import Section from "../../layout/section/Section";
import { colorPalette } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface HeroDetailProps
  extends Pick<
    DetailPageProps,
    "title" | "heroImage" | "category" | "associatedContent"
  > {
  slices: GuidePageSlices[];
}

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const heroGridAreas = (hasImage: boolean) => ({
  small: [{ name: "hero", start: [0, 0], end: [1, 0] }],
  medium: [{ name: "hero", start: [0, 0], end: [1, 0] }],
  large: [
    { name: "hero", start: [hasImage ? 0 : 2, 0], end: [hasImage ? 11 : 9, 0] },
  ],
  xlarge: [
    { name: "hero", start: [hasImage ? 0 : 2, 0], end: [hasImage ? 11 : 9, 0] },
  ],
});

const contentGridAreas = {
  small: [
    { name: "contents", start: [0, 0], end: [1, 0] },
    { name: "main", start: [0, 1], end: [1, 1] },
    { name: "associated-content", start: [0, 2], end: [1, 2] },
  ],
  medium: [
    { name: "contents", start: [0, 0], end: [2, 0] },
    { name: "main", start: [2, 0], end: [9, 0] },
    { name: "associated-content", start: [9, 0], end: [11, 0] },
  ],
  large: [
    { name: "contents", start: [0, 0], end: [2, 0] },
    { name: "main", start: [2, 0], end: [10, 0] },
    { name: "associated-content", start: [10, 0], end: [11, 0] },
  ],
  xlarge: [
    { name: "contents", start: [0, 0], end: [2, 0] },
    { name: "main", start: [2, 0], end: [10, 0] },
    { name: "associated-content", start: [10, 0], end: [11, 0] },
  ],
};

interface Contents {
  slug: string;
  title: string;
}

const HeroDetail: React.FC<HeroDetailProps> = ({
  title,
  heroImage,
  slices,
}) => {
  const contents = slices.reduce((acc: Contents[], slice: GuidePageSlices) => {
    const sectionTitle: string = slice.primary.sectionTitle;
    return [
      ...acc,
      {
        slug: (sectionTitle || "").replace(/ /g, "-").toLowerCase(),
        title: sectionTitle,
      },
    ];
  }, []);

  return (
    <React.Fragment>
      <Box
        width={"100%"}
        background={"light-1"}
        pad={{
          top: "xlarge",
        }}
      >
        <Section>
          <ResponsiveGrid
            margin={{
              top: "xlarge",
            }}
            columns={columns}
            rows={{
              small: ["auto"],
              medium: ["auto"],
              large: ["auto"],
              xlarge: ["auto"],
            }}
            areas={heroGridAreas(!!heroImage)}
          >
            <React.Fragment>
              {heroImage ? (
                <Box gridArea={"hero"} overflow={"hidden"} round={"medium"}>
                  {heroImage?.url && <Image src={heroImage.url} />}
                </Box>
              ) : (
                title && (
                  <Heading
                    gridArea="hero"
                    level={"1"}
                    margin={{
                      top: "small",
                    }}
                    alignSelf={"stretch"}
                    size="medium"
                  >
                    {RichText.asText(title)}
                  </Heading>
                )
              )}
            </React.Fragment>
          </ResponsiveGrid>
        </Section>
      </Box>
      <Section>
        <ResponsiveGrid
          margin={{
            top: "large",
          }}
          columns={columns}
          rows={{
            small: ["auto", "auto", "auto"],
            medium: ["auto"],
            large: ["auto"],
            xlarge: ["auto"],
          }}
          areas={contentGridAreas}
        >
          <Box gridArea={"contents"}>
            <Box height={"100%"}>
              <Box style={{ top: 0, position: "sticky" }}>
                <Heading size={"small"} level={4} margin={{ bottom: "medium" }}>
                  Contents
                </Heading>
                {contents &&
                  contents.map((link: Contents, index: number) => (
                    <StyledAnchor key={index} href={`#${link.slug}`}>
                      {link.title}
                    </StyledAnchor>
                  ))}
              </Box>
            </Box>
          </Box>
          <Box gridArea={"main"}>
            {heroImage && (
              <Heading
                gridArea="text"
                level={"1"}
                margin={{
                  top: "none",
                  bottom: "large",
                }}
                alignSelf={"stretch"}
                size="medium"
              >
                {title && RichText.asText(title)}
              </Heading>
            )}
            <SliceZone slices={slices} resolver={resolver} />
          </Box>
          <Box gridArea={"associated-content"} style={{ position: "relative" }}>
            <Box style={{ top: 0, position: "sticky" }}>
              <Heading size={"small"} level={4}>
                Associated content
              </Heading>
            </Box>
          </Box>
        </ResponsiveGrid>
      </Section>
    </React.Fragment>
  );
};

const StyledAnchor = styled.a`
  color: ${colorPalette.dark_blue};
  text-decoration: none;
  font-weight: 400;
  padding-bottom: 1em;
`;

export default HeroDetail;
