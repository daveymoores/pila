import { PrismicRichText } from "@prismicio/react";
import { Box } from "grommet";
import React, { type FC } from "react";

import type { RichTextBlock } from "../../lib/prismic-types";
import RichMediaElement from "../../src/molecules/rich-media-element/RichMediaElement";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";

type Primary = {
  title?: RichTextBlock;
  image?: ImageProps;
};

export type HeroImageSliceProps = Slice<Primary, never>;

const HeroImage: FC<{ slice: HeroImageSliceProps }> = ({ slice }) => {
  const { title, image } = slice.primary;

  return (
    <Box as="section" align="center" pad="large" gap="medium">
      {title && <PrismicRichText field={title} />}
      {image?.url && (
        <RichMediaElement
          {...image}
          alt={image.alt || ""}
          layout="responsive"
        />
      )}
    </Box>
  );
};

export default HeroImage;
