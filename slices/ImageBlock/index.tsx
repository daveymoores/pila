import { Box } from "grommet";
import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import RichMediaElement from "../../src/molecules/rich-media-element/RichMediaElement";
import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import { colorPalette } from "../../src/theme/pila";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";

type Primary = {
  image?: ImageProps;
  caption?: RichTextBlock[];
  sectionTitle?: string;
};

export type ImageBlockProps = Slice<Primary, never>;

const ImageBlock: FC<{ slice: ImageBlockProps }> = ({ slice }) => {
  const { primary } = slice;
  const sectionTitle = slice.primary.sectionTitle;

  return (
    <Box
      data-id={sectionTitle && sectionTitle.replace(/ /g, "-").toLowerCase()}
      as={"section"}
      pad={{ top: "none", bottom: "large" }}
    >
      <Box gridArea={"image"}>
        {primary.image?.url && (
          <RichMediaElement
            {...primary.image}
            alt={primary.image?.alt || ""}
            layout={"responsive"}
          />
        )}
      </Box>
      {primary.caption && <StyledRichText body={primary.caption} />}
    </Box>
  );
};

const StyledRichText = styled(RichTextParser)`
  padding-top: 1em;

  > * {
    color: ${colorPalette.grey};
    font-size: 16px;
  }
`;

export default ImageBlock;
