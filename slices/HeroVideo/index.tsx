import { PrismicRichText } from "@prismicio/react";
import { Box } from "grommet";
import React, { type FC } from "react";

import type { Link, RichTextBlock } from "../../lib/prismic-types";
import RichMediaElement from "../../src/molecules/rich-media-element/RichMediaElement";
import Slice from "../../types/Slice";

type Primary = {
  title?: RichTextBlock;
  video?: Link;
};

export type HeroVideoSliceProps = Slice<Primary, never>;

const HeroVideo: FC<{ slice: HeroVideoSliceProps }> = ({ slice }) => {
  const { title, video } = slice.primary;

  return (
    <Box as="section" align="center" pad="large" gap="medium">
      {title && <PrismicRichText field={title} />}
      {video && <RichMediaElement video={video} layout="responsive" url="" />}
    </Box>
  );
};

export default HeroVideo;
