import { Box } from "grommet";
import { Link, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import RichMediaElement from "../../src/molecules/rich-media-element/RichMediaElement";
import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import { colorPalette } from "../../src/theme/pila";
import Slice from "../../types/Slice";

type Primary = {
  video?: Link;
  caption?: RichTextBlock[];
  sectionTitle?: string;
};

export type VideoBlockProps = Slice<Primary, never>;

const VideoBlock: FC<{ slice: VideoBlockProps }> = ({ slice }) => {
  const { primary } = slice;
  const sectionTitle = slice.primary.sectionTitle;

  return (
    <Box
      data-id={sectionTitle && sectionTitle.replace(/ /g, "-").toLowerCase()}
      as={"section"}
      pad={{ top: "none", bottom: "large" }}
    >
      <Box gridArea={"image"} overflow={"hidden"} round={"medium"}>
        {primary.video?.url && (
          <RichMediaElement video={primary.video} layout={"responsive"} />
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

export default VideoBlock;
