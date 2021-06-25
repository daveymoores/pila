import { Box } from "grommet";
import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";

import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import Slice from "../../types/Slice";

type Primary = {
  body?: RichTextBlock[];
  sectionTitle?: string;
};

export type RichTextBlokProps = Slice<Primary, never>;

const RichTextBlok: FC<{ slice: RichTextBlokProps }> = ({ slice }) => {
  const { primary } = slice;
  const { sectionTitle, body } = primary;

  return (
    <Box
      data-id={sectionTitle && sectionTitle.replace(/ /g, "-").toLowerCase()}
      as={"section"}
      pad={{ top: "none", bottom: "large" }}
    >
      {body && <RichTextParser body={body} />}
    </Box>
  );
};

export default RichTextBlok;
