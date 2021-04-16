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

const rows = {
  small: ["auto"],
  medium: ["auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const gridAreas = {
  small: [{ name: "text", start: [0, 0], end: [1, 0] }],
  medium: [{ name: "text", start: [0, 0], end: [1, 0] }],
  large: [{ name: "text", start: [1, 0], end: [10, 0] }],
  xlarge: [{ name: "text", start: [1, 0], end: [10, 0] }],
};

const RichTextSection: FC<{ slice: RichTextSectionProps }> = ({ slice }) => {
  const { primary } = slice;

  return (
    <Box pad={{ top: "xlarge", bottom: "xlarge" }}>
      <Section justify={"center"} flex>
        <ResponsiveGrid areas={gridAreas} columns={columns} rows={rows}>
          <Box gridArea={"text"}>
            <RichTextParser {...primary} />
          </Box>
        </ResponsiveGrid>
      </Section>
    </Box>
  );
};

export default RichTextSection;
