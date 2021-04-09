import { Box, Heading, Image } from "grommet";
import SliceZone from "next-slicezone";
import { RichText } from "prismic-reactjs";
import React from "react";

import {
  DetailPageProps,
  DetailPageSlices,
} from "../../../pages/legal/[legal]";
import resolver from "../../../sm-resolver";
import Section from "../../layout/section/Section";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface HeroDetailProps
  extends Pick<
    DetailPageProps,
    "title" | "heroImage" | "category" | "associatedContent"
  > {
  slices: DetailPageSlices[];
}

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const heroGridAreas = {
  small: [
    { name: "text", start: [0, 0], end: [1, 0] },
    { name: "image", start: [0, 0], end: [1, 0] },
  ],
  medium: [
    { name: "text", start: [0, 0], end: [1, 0] },
    { name: "image", start: [0, 0], end: [1, 0] },
  ],
  large: [
    { name: "text", start: [2, 0], end: [9, 0] },
    { name: "image", start: [0, 0], end: [11, 0] },
  ],
  xlarge: [
    { name: "text", start: [2, 0], end: [9, 0] },
    { name: "image", start: [0, 0], end: [11, 0] },
  ],
};

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

const HeroDetail: React.FC<HeroDetailProps> = ({
  title,
  heroImage,
  slices,
}) => (
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
          areas={heroGridAreas}
          gap={"small"}
        >
          <React.Fragment>
            {heroImage ? (
              <Box gridArea={"image"} overflow={"hidden"} round={"medium"}>
                {heroImage?.url && <Image src={heroImage.url} />}
              </Box>
            ) : (
              title && (
                <Heading
                  gridArea="text"
                  level={"1"}
                  margin={{
                    top: "small",
                  }}
                  alignSelf={"stretch"}
                  size="small"
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
        gap={"small"}
      >
        <Box gridArea={"contents"}>This is for contents</Box>
        <Box gridArea={"main"}>
          {heroImage && (
            <Heading
              gridArea="text"
              level={"1"}
              margin={{
                top: "none",
              }}
              alignSelf={"stretch"}
              size="small"
            >
              {title && RichText.asText(title)}
            </Heading>
          )}
          {/*<SliceZone {...slices} resolver={resolver} />*/}
        </Box>
        <Box gridArea={"associated-content"}>
          This is for associated content
        </Box>
      </ResponsiveGrid>
    </Section>
  </React.Fragment>
);

export default HeroDetail;
