import { Anchor, Box, Heading, Paragraph } from "grommet";
import SliceZone from "next-slicezone";
import { RichText } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import resolver from "../../../sm-resolver";
import CustomType from "../../../types/CustomType";
import { DetailPageSlices, LinkedDetailPageProps } from "../../../types/Detail";
import { GuidePageData } from "../../../types/Guide";
import PageType from "../../../types/PageTypes";
import {
  MobileOnly,
  TabletUp,
} from "../../atoms/responsive-helpers/ResponsiveHelpers";
import TextLink from "../../atoms/text-link/TextLink";
import DictionaryContext from "../../context/DictionaryContext";
import Section from "../../layout/section/Section";
import Breadcrumb, {
  BreadcrumbItem,
} from "../../molecules/breadcrumb/breadcrumb";
import GuideTitle from "../../molecules/guide-title/GuideTitle";
import RichMediaElement from "../../molecules/rich-media-element/RichMediaElement";
import { colorPalette, fontWeights } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface HeroDetailProps
  extends Pick<
    LinkedDetailPageProps,
    "title" | "heroImage" | "category" | "associatedContent"
  > {
  slices: DetailPageSlices[];
  breadcrumbLinks: BreadcrumbItem[];
  guide_category?: GuidePageData["guide_category"];
  associatedContentLabel: string;
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
  associatedContent,
  slices,
  breadcrumbLinks,
  guide_category,
  associatedContentLabel,
}) => {
  const { getDictionaryValue } = React.useContext(DictionaryContext);
  const guideCategory = guide_category?.data?.title;

  const contents =
    slices &&
    slices.reduce((acc: Contents[], slice: DetailPageSlices) => {
      const sectionTitle: string = slice.primary.sectionTitle;
      return [
        ...acc,
        {
          slug: (sectionTitle || "").replace(/ /g, "-").toLowerCase(),
          title: sectionTitle,
        },
      ];
    }, []);

  const scrollToSection = (section: Element | null = null) => {
    if (!section) return;
    const { top } = section.getBoundingClientRect();
    window.scrollTo({ top: window.pageYOffset + top, behavior: "smooth" });
  };

  const findSection = (slug: string) => {
    const sections = document.querySelectorAll(`[data-id="${slug}"]`);
    const visibleSection = Array.from(sections).find(
      (item) => item.getBoundingClientRect().top
    );
    if (!visibleSection) return;
    return visibleSection;
  };

  React.useEffect(() => {
    if (!window) return;
    // check hash on first load
    scrollToSection(findSection(window.location.href.split("#")[1]));

    const listenToHashChange = (event: HashChangeEvent) => {
      if (!event) return;
      const { hash } = new URL(event.newURL);
      scrollToSection(findSection(hash.split("#")[1]));
    };

    window.addEventListener("hashchange", listenToHashChange);
    return () => {
      window.removeEventListener("hashchange", listenToHashChange);
    };
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
        {breadcrumbLinks && <Breadcrumb links={breadcrumbLinks} />}
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
            <Box gridArea={"hero"}>
              {heroImage?.dimensions ? (
                <Box
                  overflow={"hidden"}
                  round={"medium"}
                  margin={{ bottom: "-4em" }}
                >
                  <RichMediaElement
                    {...heroImage}
                    alt={heroImage?.alt || ""}
                    layout={"responsive"}
                    priority
                  />
                </Box>
              ) : (
                title && (
                  <ResponsiveGrid
                    gridArea={"hero"}
                    margin={{
                      top: "large",
                      bottom: "medium",
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
                    <Box gridArea={"contents"} />
                    <Box gridArea={"main"}>
                      {guideCategory && (
                        <Paragraph
                          size={"small"}
                          color={colorPalette.grey}
                          style={{ fontWeight: fontWeights.bold }}
                        >
                          {guide_category?.data?.title}
                        </Paragraph>
                      )}
                      <Heading
                        gridArea="hero"
                        level={"1"}
                        margin={{
                          top: "small",
                        }}
                        alignSelf={"stretch"}
                        size="small"
                      >
                        {RichText.asText(title)}
                      </Heading>
                    </Box>
                    <Box gridArea={"associated-content"} />
                  </ResponsiveGrid>
                )
              )}
            </Box>
          </ResponsiveGrid>
        </Section>
      </Box>
      <Section>
        <ResponsiveGrid
          pad={{ top: heroImage?.url ? "5em" : "large" }}
          margin={{
            top: "large",
            bottom: "xlarge",
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
            <MobileOnly>
              <GuideTitle
                title={title}
                heroImage={heroImage}
                guideCategory={guideCategory}
              />
            </MobileOnly>
            <StyledLinkBox>
              {contents && contents.some((link) => link.title) && (
                <Heading size={"small"} level={4} margin={{ bottom: "medium" }}>
                  {getDictionaryValue("Contents")}
                </Heading>
              )}
              {contents &&
                contents.map(
                  (link: Contents, index: number) =>
                    link.slug && (
                      <StyledAnchor key={index} href={`#${link.slug}`}>
                        {link.title}
                      </StyledAnchor>
                    )
                )}
            </StyledLinkBox>
          </Box>
          <Box gridArea={"main"}>
            <TabletUp>
              <GuideTitle
                title={title}
                heroImage={heroImage}
                guideCategory={guideCategory}
              />
            </TabletUp>
            <SliceZone slices={slices} resolver={resolver} />
          </Box>
          <Box gridArea={"associated-content"} style={{ position: "relative" }}>
            <StyledLinkBox>
              {associatedContent &&
                associatedContent.some(({ data }) => data?.title) && (
                  <Heading
                    size={"small"}
                    level={4}
                    margin={{ bottom: "medium" }}
                  >
                    {associatedContentLabel ||
                      getDictionaryValue("Associated Content")}
                  </Heading>
                )}
              {associatedContent &&
                associatedContent.map((content: CustomType, index: number) => (
                  <React.Fragment key={index}>
                    {content.type === PageType.GUIDE && (
                      <Paragraph
                        size={"xsmall"}
                        color={colorPalette.dark_blue}
                        style={{ fontWeight: fontWeights.bold }}
                      >
                        {getDictionaryValue("Guide")}
                      </Paragraph>
                    )}
                    <StyledTextLink
                      key={index}
                      link={content}
                      label={
                        content.data?.title
                          ? RichText.asText(content.data?.title)
                          : ""
                      }
                    />
                  </React.Fragment>
                ))}
            </StyledLinkBox>
          </Box>
        </ResponsiveGrid>
      </Section>
    </React.Fragment>
  );
};

const textButtonStyles = `
  font-weight: 500;
  font-size: 16px;
  color: ${colorPalette.grey};
  text-decoration: none;
  padding-bottom: 1em;
`;

const StyledTextLink = styled(TextLink)`
  ${textButtonStyles}
`;

const StyledAnchor = styled(Anchor)`
  ${textButtonStyles}
`;

const StyledLinkBox = styled(Box)`
  padding: 20px;
  border-radius: 15px;
  background-color: ${colorPalette.periwinkleCrayola};

  @media only screen and (min-width: 601px) {
    padding: 0;
    border-radius: 0;
    background-color: transparent;
  }
`;

export default HeroDetail;
