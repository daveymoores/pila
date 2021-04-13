import { Accordion, AccordionPanel, Box } from "grommet";
import { RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import Slice from "../../types/Slice";

type Item = {
  title: string;
  body: RichTextBlock[];
};

type Primary = {
  sectionTitle: string;
  items: Item[];
};

export type AccordionBlockProps = Slice<Primary, never>;

const ImageBlock: FC<{ slice: AccordionBlockProps }> = ({ slice }) => {
  const { primary, items } = slice;
  const sectionTitle = primary.sectionTitle;

  return (
    <Box
      id={sectionTitle && sectionTitle.replace(/ /g, "-").toLowerCase()}
      as={"section"}
      pad={{ top: "none", bottom: "xlarge" }}
    >
      <Accordion>
        {items &&
          items.map((item: Item, index: number) => (
            <StyledAccordionPanel key={index} label={item.title}>
              <Box pad={"medium"}>
                <RichTextParser body={item.body} />
              </Box>
            </StyledAccordionPanel>
          ))}
      </Accordion>
    </Box>
  );
};

const StyledAccordionPanel = styled(AccordionPanel)`
  padding: 1.5em 0;
`;

export default ImageBlock;
