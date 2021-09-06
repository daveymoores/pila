import { Box } from "grommet";
import React, { FC } from "react";
import styled from "styled-components";

import Slice from "../../types/Slice";

type Primary = {
  embed?: {
    text: string;
  }[];
  rows?: number;
  sectionTitle?: string;
};

export type VideoBlockProps = Slice<Primary, never>;

const HTMLEmbed: FC<{ embed: Primary["embed"]; rows?: number }> = ({
  embed,
  rows,
}) => (
  <ResponsiveWrapper rows={rows}>
    <div
      style={{ width: "100%" }}
      dangerouslySetInnerHTML={{
        __html: embed && embed.length ? embed[0]?.text : "",
      }}
    />
  </ResponsiveWrapper>
);

const EmbedBlock: FC<{ slice: VideoBlockProps }> = ({ slice }) => {
  const { primary } = slice;
  const sectionTitle = slice.primary.sectionTitle;

  return (
    <Box
      data-id={sectionTitle && sectionTitle.replace(/ /g, "-").toLowerCase()}
      as={"section"}
      pad={{ top: "none", bottom: "large" }}
    >
      {primary.embed && <HTMLEmbed embed={primary.embed} rows={primary.rows} />}
    </Box>
  );
};

const ResponsiveWrapper = styled.div<{ rows?: number }>`
  position: relative;
  padding-top: ${({ rows }) => (rows ? `calc(${rows} * 25px)` : `56.25%`)};

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default EmbedBlock;
