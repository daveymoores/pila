import { Box, Image } from "grommet";
import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import { colorPalette } from "../../src/theme/pila";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";

type Primary = {
  image: ImageProps;
  caption: RichTextBlock[];
  sectionTitle: string;
};

export type ImageBlockProps = Slice<Primary, never>;

const ImageBlock: FC<{ slice: ImageBlockProps }> = ({ slice }) => {
  const { primary } = slice;
  const sectionTitle = slice.primary.sectionTitle;

  return (
    <Box
      id={sectionTitle && sectionTitle.replace(/ /g, "-").toLowerCase()}
      as={"section"}
      pad={{ top: "none", bottom: "large" }}
    >
      <Box gridArea={"image"} overflow={"hidden"} round={"medium"}>
        {primary.image?.url && <Image src={primary.image.url} />}
      </Box>
      <StyledRichText body={primary.caption} />
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
