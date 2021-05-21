import { Heading, Paragraph } from "grommet";
import { RichText } from "prismic-reactjs";
import React from "react";

import { DetailPageData } from "../../../types/Detail";
import { colorPalette, fontWeights } from "../../theme/pila";

interface GuideTitle extends Pick<DetailPageData, "title" | "heroImage"> {
  guideCategory?: string;
}

const GuideTitle: React.FC<GuideTitle> = ({
  heroImage,
  guideCategory,
  title,
}) => (
  <React.Fragment>
    {heroImage?.dimensions && guideCategory && (
      <Paragraph
        size={"small"}
        color={colorPalette.grey}
        style={{ fontWeight: fontWeights.bold }}
        margin={{ bottom: "small" }}
      >
        {guideCategory}
      </Paragraph>
    )}
    {heroImage?.dimensions && (
      <Heading
        gridArea="text"
        level={"1"}
        margin={{
          top: "none",
          bottom: "large",
        }}
        alignSelf={"stretch"}
        size="small"
      >
        {title && RichText.asText(title)}
      </Heading>
    )}
  </React.Fragment>
);

export default GuideTitle;
