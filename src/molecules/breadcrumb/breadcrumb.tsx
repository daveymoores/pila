import { Box } from "grommet";
import { FormNext } from "grommet-icons";
import { Link } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import { RoutedTextLink } from "../../../prismic";
import Section from "../../layout/section/Section";
import { colorPalette } from "../../theme/pila";

interface BreadcrumbProps {
  links: {
    link: Link;
    label: string;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <Section>
      <Box
        justify={"start"}
        align={"center"}
        direction={"row"}
        pad={{ top: "small" }}
      >
        {Array.isArray(links) &&
          links.map(({ label, link }, index) => (
            <React.Fragment key={index}>
              <StyledLink
                label={label}
                link={link}
                weight={"normal"}
                size={"small"}
                color={colorPalette.dark_blue}
              />
              {index % 2 ? null : (
                <StyledFormNext
                  color={colorPalette.dark_blue}
                  width={"10px"}
                  height={"10px"}
                />
              )}
            </React.Fragment>
          ))}
      </Box>
    </Section>
  );
};

const StyledLink = styled(RoutedTextLink)`
  opacity: 0.5;
`;

const StyledFormNext = styled(FormNext)`
  opacity: 0.5;
  height: 20px;
  width: 20px;
  padding: 0 6px;
`;

export default Breadcrumb;
