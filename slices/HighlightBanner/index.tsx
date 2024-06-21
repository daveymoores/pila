import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
} from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../src/atoms/button/Button";
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
    primary: {
      title,
      body,
      buttonOneLink,
      buttonOneLabel,
      buttonTwoLink,
      buttonTwoLabel,
    },
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
            <iframe
              width="560"
              height="315"
              src={"https://www.youtube.com/embed/WrBnuh5paVo"}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ marginTop: "2em", borderRadius: "10px"}}
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
`;

const HighlightPattern = styled(Image)`
  width: auto;
  height: 100%;
  position: absolute;

  @media (min-width: 1250px) {
    height: auto;
    width: 100%;
  }
`;

export default HighlightBanner;
