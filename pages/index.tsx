import { Box, Heading, Image } from "grommet";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import { Client } from "../prismic";
import resolver from "../sm-resolver.js";
import Button, { ButtonSizes } from "../src/atoms/button/Button";
import Section from "../src/layout/section/Section";
import ResponsiveGrid from "../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../src/theme/pila";
import ImageProps from "../types/ImageProps";
import Slice from "../types/Slice";

interface PageProps extends JSX.IntrinsicAttributes {
  data: {
    title: RichTextBlock[];
    link: Link;
    linklabel: string;
    image: ImageProps;
  };
  slices: Slice<any, any>[];
}

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: ["flex", "flex"],
  xlarge: ["flex", "flex"],
};

const Page: React.FC<PageProps> = ({
  data: { title, linklabel, link, image },
  slices,
}: PageProps) => {
  console.log(image);
  return (
    <React.Fragment>
      <StyledBox background={colorPalette.blue} justify={"center"}>
        <Section>
          <ResponsiveGrid rows={"2"} columns={columns}>
            <Box align={"start"}>
              <Heading
                level={"1"}
                margin={{ bottom: "large" }}
                alignSelf={"stretch"}
                size="small"
                responsive={false}
              >
                {RichText.asText(title)}
              </Heading>
              <Button
                primary
                href={link.slug}
                color={colorPalette.yellow}
                size={ButtonSizes.large}
                type="button"
                label={linklabel}
              />
            </Box>
            {/*<Box>{image?.url && <Image src={image.url} />}</Box>*/}
          </ResponsiveGrid>
        </Section>
      </StyledBox>

      <SliceZone slices={slices} resolver={resolver} />
    </React.Fragment>
  );
};

const StyledBox = styled(Box)`
  height: 95vh;
  min-height: 700px;
  max-height: 1000px;
`;

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: "single",
  type: "home",
});

export default Page;
