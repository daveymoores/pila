import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  ResponsiveContext,
} from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../src/theme/pila";
import Slice from "../../types/Slice";

type Primary = {
  title: RichTextBlock[];
  body: RichTextBlock[];
  buttonOneLink: Link;
  buttonTwoLink: Link;
  buttonOneLabel: string;
  buttonTwoLabel: string;
};

export type HighlightBannerProps = Slice<Primary, never>;

const HighlightBanner: FC<{ slice: HighlightBannerProps }> = ({ slice }) => {
  const {
    primary: { title },
  } = slice;
  const size = React.useContext(ResponsiveContext);

  return (
    <Section justify={"center"} flex>
      <ResponsiveGrid columns="large" rows="1">
        <StyledCard
          elevation={"xlarge"}
          pad={"large"}
          background={colorPalette.green}
          align={"center"}
          justify={"center"}
          margin={{ top: "xlarge", bottom: "xlarge" }}
          style={{ position: "relative" }}
        >
          <HighlightPattern src={"/pattern/highlight-pattern.png"} />
          <CardHeader
            direction={"column"}
            style={{ position: "relative", zIndex: 1 }}
          >
            {title && (
              <Heading
                level={"1"}
                margin="none"
                size="small"
                color={"white"}
                textAlign={"center"}
              >
                {RichText.asText(title)}
              </Heading>
            )}
          </CardHeader>
          <CardBody
            margin={{ top: "medium" }}
            direction={size === "small" ? "column" : "row"}
            justify={"stretch"}
            align={"stretch"}
            flex={"shrink"}
            style={{ position: "relative", zIndex: 1 }}
          >
            <StyledIframe
              width="560"
              height="315"
              src={"https://www.youtube.com/embed/WrBnuh5paVo"}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              size={size}
              style={{ border: "none" }}
            />
          </CardBody>
        </StyledCard>
      </ResponsiveGrid>
    </Section>
  );
};

const StyledCard = styled(Card)`
  border-radius: 25px;
  min-height: 380px;
  position: relative;
  overflow: hidden;
`;

const HighlightPattern = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const StyledIframe = styled.iframe<{ size: string }>`
  margin-top: 0;
  border-radius: 10px;
  width: ${(props) => (props.size === "small" ? "100%" : "560px")};
  height: ${(props) => (props.size === "small" ? "auto" : "315px")};
`;

export default HighlightBanner;
