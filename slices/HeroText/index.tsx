import { PrismicRichText } from "@prismicio/react";
import { Box } from "grommet";
import React, { type FC } from "react";

import type { RichTextBlock } from "../../lib/prismic-types";
import Slice from "../../types/Slice";

type Primary = {
  title?: RichTextBlock;
  description?: RichTextBlock;
};

export type HeroTextSliceProps = Slice<Primary, never>;

const HeroText: FC<{ slice: HeroTextSliceProps }> = ({ slice }) => {
  const { title, description } = slice.primary;

  return (
    <Box
      as="section"
      align="center"
      pad="large"
      gap="small"
      width={{ max: "600px" }}
      margin={{ horizontal: "auto" }}
    >
      {title && <PrismicRichText field={title} />}
      {description && <PrismicRichText field={description} />}
    </Box>
  );
};

export default HeroText;
