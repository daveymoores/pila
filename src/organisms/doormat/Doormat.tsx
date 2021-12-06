import { Anchor, Box, Footer, Paragraph } from "grommet";
import Image, { ImageProps } from "next/image";
import React from "react";
import styled from "styled-components";

import RepeatableLink from "../../../types/RepeatableLink";
import TextLink from "../../atoms/text-link/TextLink";
import Section from "../../layout/section/Section";
import RichMediaElement from "../../molecules/rich-media-element/RichMediaElement";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface DoormatProps {
  list_one_label: string;
  list_one_links: RepeatableLink[];
  list_two_label: string;
  list_two_links: RepeatableLink[];
  list_three_label: string;
  list_three_links: RepeatableLink[];
  mascotImage: ImageProps;
}

interface DoormatListProps {
  label: string;
  links: RepeatableLink[];
}

const DoormatList: React.FC<DoormatListProps> = ({ label, links }) => {
  return (
    <React.Fragment>
      {label && Array.isArray(links) && (
        <Box gap="medium" margin={{ bottom: "large" }}>
          <Paragraph style={{ fontWeight: 500 }} size="medium">
            {label}
          </Paragraph>
          <Box>
            {links.map(({ label, link }, index) => (
              <TextLink
                key={index}
                label={label}
                link={link}
                margin={{ bottom: "xsmall" }}
                size="small"
                color="white"
                weight="normal"
              />
            ))}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

const Doormat: React.FC<DoormatProps> = ({
  list_one_label,
  list_one_links,
  list_three_label,
  list_three_links,
  list_two_label,
  list_two_links,
  mascotImage,
}) => (
  <StyledFooter
    background="brand"
    pad={{ top: "xlarge", bottom: "xlarge" }}
    flex
    align={"start"}
  >
    <Section>
      <StyledResponsiveGrid
        rows={{
          small: ["auto", "auto", "auto"],
          medium: ["auto", "auto", "auto"],
          large: ["auto", "auto"],
          xlarge: ["auto", "auto"],
        }}
        columns={{
          small: ["auto"],
          medium: ["flex", "flex", "flex"],
          large: ["flex", "flex", "flex", "1/4", "1/4"],
          xlarge: ["flex", "flex", "flex", "1/4", "1/4"],
        }}
      >
        <DoormatList label={list_one_label} links={list_one_links} />
        <DoormatList label={list_two_label} links={list_two_links} />
        <DoormatList label={list_three_label} links={list_three_links} />

        <RichMediaElement layout="responsive" {...mascotImage} />
        <Anchor
          href={"https://vercel.com/?utm_source=pila-app&utm_campaign=oss"}
        >
          <Image src={"/powered-by-vercel.svg"} width={"212"} height={"44"} />
        </Anchor>
      </StyledResponsiveGrid>
    </Section>
  </StyledFooter>
);

const StyledFooter = styled(Footer)`
  min-height: 600px;
`;

const StyledResponsiveGrid = styled(ResponsiveGrid)`
  flex-grow: 1;
`;

export default Doormat;
