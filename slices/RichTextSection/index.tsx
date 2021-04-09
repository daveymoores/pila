import { Box } from "grommet";
import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";

import Section from "../../src/layout/section/Section";
import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import Slice from "../../types/Slice";

type Primary = {
  body: RichTextBlock[];
};

export type RichTextSectionProps = Slice<Primary, never>;

const HighlightBanner: FC<{ slice: RichTextSectionProps }> = ({ slice }) => {
  const { primary } = slice;

  return (
    <Box pad={{ top: "xlarge", bottom: "xlarge" }}>
      <Section justify={"center"} flex>
        <ResponsiveGrid margin="medium" columns="large" rows="1">
          <RichTextParser {...primary} />
        </ResponsiveGrid>
      </Section>
    </Box>
  );
};

export default HighlightBanner;
